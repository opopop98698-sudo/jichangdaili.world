import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('[test] Running automated test suite for jichangdaili.world ...');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failedTests++;
  }
}

// 1. Content Scale & Registry Test
const registryPath = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');
assert(fs.existsSync(registryPath), 'CONTENT_REGISTRY.json exists');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
assert(registry.length === 729, `Registry contains exactly 729 planning nodes (actual: ${registry.length})`);

const homeNodes = registry.filter(n => n.type === 'home');
const sectionNodes = registry.filter(n => n.type === 'section');
const topicNodes = registry.filter(n => n.type === 'topic');
const clusterNodes = registry.filter(n => n.type === 'cluster');
const articleNodes = registry.filter(n => n.type === 'article');

assert(homeNodes.length === 1, 'Exactly 1 Home node');
assert(sectionNodes.length === 8, 'Exactly 8 Section nodes');
assert(topicNodes.length === 80, 'Exactly 80 Topic nodes');
assert(clusterNodes.length === 160, 'Exactly 160 Cluster nodes');
assert(articleNodes.length === 480, 'Exactly 480 Article nodes');

// 2. Uniqueness of URLs and IDs
const idSet = new Set();
const urlSet = new Set();
let hasDuplicateId = false;
let hasDuplicateUrl = false;

for (const n of registry) {
  if (idSet.has(n.id)) hasDuplicateId = true;
  idSet.add(n.id);

  if (urlSet.has(n.url)) hasDuplicateUrl = true;
  urlSet.add(n.url);
}

assert(!hasDuplicateId, 'All 729 nodes have globally unique IDs');
assert(!hasDuplicateUrl, 'All 729 nodes have globally unique URLs');

// 3. Navigation Order Consistency
const expectedSections = ['recommend', 'free', 'clients', 'install', 'subscription', 'troubleshooting', 'reviews', 'learn'];
const actualSections = sectionNodes.map(s => s.sectionId);
assert(JSON.stringify(expectedSections) === JSON.stringify(actualSections), 'Section order matches fixed specification exactly');

// 4. Software and Compatibility Model Integrity
const softwarePath = path.join(rootDir, 'data', 'software.json');
assert(fs.existsSync(softwarePath), 'software.json exists');
const softwareList = JSON.parse(fs.readFileSync(softwarePath, 'utf8'));
assert(softwareList.length >= 6, 'Contains primary software identities (Clash Verge Rev, v2rayN, etc.)');

const compatPath = path.join(rootDir, 'data', 'compatibility.json');
assert(fs.existsSync(compatPath), 'compatibility.json exists');
const compatList = JSON.parse(fs.readFileSync(compatPath, 'utf8'));
assert(compatList.length >= 6, 'Contains full compatibility matrix entries');

// 5. Editorial Task Coverage
let editorialCount = 0;
function countTasks(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) countTasks(full);
    else if (e.isFile() && e.name.endsWith('.md')) editorialCount++;
  }
}
countTasks(path.join(rootDir, 'editorial'));
assert(editorialCount === 729, `729 editorial task files generated in editorial/ (actual: ${editorialCount})`);

console.log('\n[test] Test execution summary:');
console.log(`  - Passed: ${passedTests}`);
console.log(`  - Failed: ${failedTests}`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('All automated tests passed successfully!');
}
