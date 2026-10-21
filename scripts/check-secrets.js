import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('[check-secrets] Scanning codebase for leaked credentials and sensitive patterns ...');

// Controlled whitelist of placeholder UUIDs or test strings
const WHITELIST_STRINGS = new Set([
  'YOUR_APP_ID',
  'YOUR_SEARCH_ONLY_API_KEY',
  'b831381d-6324-4d53-ad4f-8cda48b30811', // documented standard RFC 4122 dummy UUID
  '00000000-0000-0000-0000-000000000000'
]);

// Suspicious patterns
const SUSPICIOUS_PATTERNS = [
  { name: 'Private Key Block', regex: /-----BEGIN (?:RSA|OPENSSH|EC|PGP|PRIVATE) KEY-----/ },
  { name: 'GitHub Personal Access Token', regex: /ghp_[a-zA-Z0-9]{36}/ },
  { name: 'Live Subscription Key with Token', regex: /[?&]token=[a-zA-Z0-9]{16,64}/ },
  { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Generic Live Secret Assignment', regex: /(?:api[_-]?key|secret|password|passwd)\s*[:=]\s*["'][a-zA-Z0-9_\-]{24,}["']/i }
];

const SCAN_DIRS = ['content', 'data', 'scripts', 'site'];
let scannedFiles = 0;
let detectedSecrets = 0;

function scanFile(filePath, relPath) {
  scannedFiles++;
  const content = fs.readFileSync(filePath, 'utf8');

  for (const pattern of SUSPICIOUS_PATTERNS) {
    const match = content.match(pattern.regex);
    if (match) {
      const matchedText = match[0];
      // Check if whitelisted
      let isWhitelisted = false;
      for (const w of WHITELIST_STRINGS) {
        if (matchedText.includes(w)) {
          isWhitelisted = true;
          break;
        }
      }
      if (!isWhitelisted) {
        console.error(`[check-secrets] Potential leak detected in ${relPath}: Pattern "${pattern.name}" matched.`);
        detectedSecrets++;
      }
    }
  }
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'cache') {
        continue;
      }
      traverse(full);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.md') || entry.name.endsWith('.json') || entry.name.endsWith('.js') || entry.name.endsWith('.ts') || entry.name.endsWith('.vue')) {
        const rel = path.relative(rootDir, full);
        scanFile(full, rel);
      }
    }
  }
}

for (const d of SCAN_DIRS) {
  traverse(path.join(rootDir, d));
}

console.log(`[check-secrets] Scan complete.`);
console.log(`  - Files scanned: ${scannedFiles}`);
console.log(`  - Violations found: ${detectedSecrets}`);

if (detectedSecrets > 0) {
  console.error(`[check-secrets] FAILED! Found ${detectedSecrets} potential secret leaks.`);
  process.exit(1);
} else {
  console.log(`[check-secrets] PASSED! No credentials or sensitive data detected.`);
}
