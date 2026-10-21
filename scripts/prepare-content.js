import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const generatedDir = path.join(rootDir, 'site', 'generated');
const publicAssetsDir = path.join(rootDir, 'public-assets');

console.log('[prepare-content] Synchronizing published content to site/generated ...');

// 1. Safe clean of generatedDir
if (fs.existsSync(generatedDir)) {
  fs.rmSync(generatedDir, { recursive: true, force: true });
}
fs.mkdirSync(generatedDir, { recursive: true });

// 2. Helper to parse frontmatter status
function getFrontmatterStatus(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const yaml = match[1];
  const statusMatch = yaml.match(/^status:\s*["']?([a-zA-Z0-9_-]+)["']?/m);
  return statusMatch ? statusMatch[1].trim() : null;
}

// 3. Recursive scanner for contentDir
let publishedCount = 0;
let skippedDraftCount = 0;

function syncDir(currentSrc, currentDest) {
  if (!fs.existsSync(currentSrc)) return;
  const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(currentSrc, entry.name);
    const destPath = path.join(currentDest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      syncDir(srcPath, destPath);
      // Clean up empty directories in generated
      if (fs.readdirSync(destPath).length === 0) {
        fs.rmdirSync(destPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const fileContent = fs.readFileSync(srcPath, 'utf8');
      const status = getFrontmatterStatus(fileContent);

      // Only published content passes the whitelist
      if (status === 'published') {
        fs.writeFileSync(destPath, fileContent, 'utf8');
        publishedCount++;
      } else {
        skippedDraftCount++;
      }
    } else if (entry.isFile()) {
      // Copy other assets if any
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

syncDir(contentDir, generatedDir);

// 4. Copy public assets if any
if (fs.existsSync(publicAssetsDir)) {
  const publicDestGenerated = path.join(generatedDir, 'public');
  const publicDestSite = path.join(rootDir, 'site', 'public');
  fs.mkdirSync(publicDestGenerated, { recursive: true });
  fs.mkdirSync(publicDestSite, { recursive: true });
  fs.cpSync(publicAssetsDir, publicDestGenerated, { recursive: true });
  fs.cpSync(publicAssetsDir, publicDestSite, { recursive: true });
}

console.log(`[prepare-content] Whitelist sync complete!`);
console.log(`  - Published pages copied: ${publishedCount}`);
console.log(`  - Draft / research pages excluded: ${skippedDraftCount}`);
console.log(`  - Output directory: ${generatedDir}`);
