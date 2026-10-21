import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const generatedDir = path.join(rootDir, 'site', 'generated');

console.log('[check-links] Verifying internal links among published pages ...');

if (!fs.existsSync(generatedDir)) {
  console.error('Error: site/generated does not exist. Run "npm run content:prepare" first.');
  process.exit(1);
}

// Build existing valid routes set
const validRoutes = new Set();
validRoutes.add('/');

function collectRoutes(current) {
  const entries = fs.readdirSync(current, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      collectRoutes(full);
    } else if (entry.isFile() && entry.name === 'index.md') {
      const relDir = path.relative(generatedDir, current).replace(/\\/g, '/');
      const route = relDir ? `/${relDir}/` : '/';
      validRoutes.add(route);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const rel = path.relative(generatedDir, full).replace(/\\/g, '/');
      const route = `/${rel.replace(/\.md$/, '')}/`;
      validRoutes.add(route);
    }
  }
}

collectRoutes(generatedDir);

let linkErrors = 0;
let totalCheckedLinks = 0;

function checkLinksInFile(filePath, relPath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match standard markdown links [text](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const href = match[2].trim();

    // Skip external links, anchors, mailto, etc.
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:')) {
      continue;
    }

    totalCheckedLinks++;
    const cleanHref = href.split('#')[0].split('?')[0];

    // Static asset check (images, docs, files)
    if (/\.(png|jpe?g|webp|gif|svg|ico|pdf|zip|txt|xml|json)$/i.test(cleanHref)) {
      const assetPathInAssets = path.join(rootDir, 'public-assets', cleanHref);
      const assetPathInGenerated = path.join(generatedDir, 'public', cleanHref);
      const assetPathInSite = path.join(rootDir, 'site', 'public', cleanHref);
      if (!fs.existsSync(assetPathInAssets) && !fs.existsSync(assetPathInGenerated) && !fs.existsSync(assetPathInSite)) {
        console.error(`[check-links] Dead asset in ${relPath}: "${href}" -> file does not exist in public assets.`);
        linkErrors++;
      }
      continue;
    }

    const normalizedHref = cleanHref.endsWith('/') ? cleanHref : `${cleanHref}/`;

    if (!validRoutes.has(normalizedHref)) {
      console.error(`[check-links] Dead link in ${relPath}: "${href}" -> target route "${normalizedHref}" does not exist in published content.`);
      linkErrors++;
    }
  }
}

function traverseAndCheck(current) {
  const entries = fs.readdirSync(current, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      traverseAndCheck(full);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const rel = path.relative(generatedDir, full);
      checkLinksInFile(full, rel);
    }
  }
}

traverseAndCheck(generatedDir);

console.log(`[check-links] Link verification completed.`);
console.log(`  - Total valid published routes: ${validRoutes.size}`);
console.log(`  - Internal links checked: ${totalCheckedLinks}`);
console.log(`  - Broken links found: ${linkErrors}`);

if (linkErrors > 0) {
  console.error(`[check-links] FAILED with ${linkErrors} broken links.`);
  process.exit(1);
} else {
  console.log(`[check-links] PASSED! All internal links resolve to valid published destinations.`);
}
