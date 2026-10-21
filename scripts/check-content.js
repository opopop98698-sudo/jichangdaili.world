import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const generatedDir = path.join(rootDir, 'site', 'generated');
const registryFile = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');

console.log('[check-content] Auditing generated content for metadata, uniqueness and quality ...');

if (!fs.existsSync(generatedDir)) {
  console.error('Error: site/generated does not exist. Run "npm run content:prepare" first.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const registryMap = new Map(registry.map(r => [r.url, r]));

const titlesFound = new Map();
let errorCount = 0;
let checkedCount = 0;

function auditMarkdown(filePath, relPath) {
  checkedCount++;
  const raw = fs.readFileSync(filePath, 'utf8');

  // Check frontmatter
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.error(`[check-content] Missing frontmatter in ${relPath}`);
    errorCount++;
    return;
  }

  const yaml = fmMatch[1];
  const titleMatch = yaml.match(/^title:\s*["']?([^"'\r\n]+)["']?/m);
  const descMatch = yaml.match(/^description:\s*["']?([^"'\r\n]+)["']?/m);
  const statusMatch = yaml.match(/^status:\s*["']?([^"'\r\n]+)["']?/m);

  if (!titleMatch) {
    console.error(`[check-content] Missing title in ${relPath}`);
    errorCount++;
  } else {
    const title = titleMatch[1].trim();
    if (titlesFound.has(title)) {
      console.error(`[check-content] Exact title duplication detected: "${title}" in ${relPath} and ${titlesFound.get(title)}`);
      errorCount++;
    } else {
      titlesFound.set(title, relPath);
    }
  }

  if (!descMatch) {
    console.error(`[check-content] Missing description in ${relPath}`);
    errorCount++;
  }

  if (!statusMatch || statusMatch[1].trim() !== 'published') {
    console.error(`[check-content] Non-published page leaked into generated: ${relPath} (status: ${statusMatch ? statusMatch[1] : 'none'})`);
    errorCount++;
  }

  // Check H1 existence in markdown body
  const body = raw.slice(fmMatch[0].length);
  const hasH1 = /^\s*#\s+[^\r\n]+/m.test(body);
  if (!hasH1) {
    console.warn(`[check-content] Notice: ${relPath} does not have an explicit Markdown # H1 in body`);
  }
}

function traverse(current) {
  const entries = fs.readdirSync(current, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      traverse(full);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const rel = path.relative(generatedDir, full);
      auditMarkdown(full, rel);
    }
  }
}

traverse(generatedDir);

console.log(`[check-content] Content audit completed.`);
console.log(`  - Checked files: ${checkedCount}`);
console.log(`  - Errors found: ${errorCount}`);

if (errorCount > 0) {
  console.error(`[check-content] FAILED with ${errorCount} errors.`);
  process.exit(1);
} else {
  console.log(`[check-content] PASSED! All published files meet metadata and uniqueness requirements.`);
}
