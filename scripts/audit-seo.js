import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'site', '.vitepress', 'dist');
const contentDir = path.join(rootDir, 'content');
const registryFile = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

console.log('=== Deep Comprehensive SEO & Technical Health Audit ===');

// 1. Collect all HTML files
const htmlFiles = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(distDir);

// 2. Affiliate Links Audit
const nonCompliantAffiliate = [];
const compliantAffiliate = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const linkMatches = content.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>/gi);
  for (const match of linkMatches) {
    const fullTag = match[0];
    const href = match[1];
    const isExternal = (href.startsWith('http://') || href.startsWith('https://')) && !href.includes('jichangdaili.world');
    const isAffiliate = isExternal && (
      /[?&#](aff|affiliate|code|ref)=/i.test(href) ||
      /gsyvip|flycat|breezenet|feimaoyun|weifengcloud|wuyoulink|xingdaomeng|worryfree/i.test(href)
    );
    if (isAffiliate) {
      const relAttr = fullTag.match(/rel="([^"]+)"/i);
      const relVal = relAttr ? relAttr[1].toLowerCase() : '';
      const hasSponsored = relVal.includes('sponsored');
      const hasNofollow = relVal.includes('nofollow');
      const hasNoopener = relVal.includes('noopener');
      if (hasSponsored && hasNofollow && hasNoopener) {
        compliantAffiliate.push({ rel, href });
      } else {
        nonCompliantAffiliate.push({ page: rel, href, fullTag, issue: !relAttr ? 'Missing rel' : 'Missing sponsored/nofollow/noopener' });
      }
    }
  }
}

const nonCompliantPages = {};
for (const item of nonCompliantAffiliate) {
  nonCompliantPages[item.page] = (nonCompliantPages[item.page] || 0) + 1;
}

// 3. Internal Links & Click Depth Graph
const internalGraph = new Map(); // from -> Set of to
const allRoutes = new Set();
let emptyHrefCount = 0;
let hashOnlyHrefCount = 0;
let deadInternalLinks = [];
let anchorTexts = [];

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  let route = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
  if (route === '//') route = '/';
  allRoutes.add(route);
  internalGraph.set(route, new Set());
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  let currentRoute = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
  if (currentRoute === '//') currentRoute = '/';

  // Find all <a> tags with content
  const aMatches = content.matchAll(/<a\s+([^>]*)>([\s\S]*?)<\/a>/gi);
  for (const match of aMatches) {
    const attrs = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    const hrefMatch = attrs.match(/href="([^"]*)"/i);

    if (!hrefMatch) continue;
    const href = hrefMatch[1].trim();

    if (href === '') {
      emptyHrefCount++;
      continue;
    }
    if (href === '#') {
      hashOnlyHrefCount++;
      continue;
    }

    if (href.startsWith('/') && !href.startsWith('//')) {
      const targetClean = href.split('#')[0].split('?')[0];
      let targetRoute = targetClean;
      if (!targetRoute.endsWith('/')) targetRoute += '/';
      
      if (text.length > 0 && text.length < 50) {
        anchorTexts.push({ from: currentRoute, to: targetRoute, text });
      }

      if (allRoutes.has(targetRoute)) {
        internalGraph.get(currentRoute)?.add(targetRoute);
      } else {
        // Exclude assets
        if (!targetClean.startsWith('/evidence/') && !targetClean.startsWith('/logo') && !targetClean.startsWith('/favicon')) {
          deadInternalLinks.push({ from: currentRoute, to: href, text });
        }
      }
    }
  }
}

// Click Depth BFS from '/'
const depthMap = new Map();
depthMap.set('/', 0);
const queue = ['/'];

while (queue.length > 0) {
  const curr = queue.shift();
  const d = depthMap.get(curr);
  const neighbors = internalGraph.get(curr) || new Set();
  for (const next of neighbors) {
    if (!depthMap.has(next)) {
      depthMap.set(next, d + 1);
      queue.push(next);
    }
  }
}

let depthGt3 = [];
let depthGt4 = [];
let orphanPages = [];

for (const r of allRoutes) {
  if (r === '/404/') continue;
  if (!depthMap.has(r)) {
    orphanPages.push(r);
  } else {
    const d = depthMap.get(r);
    if (d >= 4) depthGt4.push({ route: r, depth: d });
    else if (d > 3) depthGt3.push({ route: r, depth: d });
  }
}

// 4. Schema & Structured Data Audit
let schemaTypes = new Map();
let jsonLdMissing = 0;
let jsonLdParseErrors = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const scripts = content.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  let found = false;
  for (const s of scripts) {
    found = true;
    try {
      const data = JSON.parse(s[1]);
      const type = data['@type'] || 'Unknown';
      schemaTypes.set(type, (schemaTypes.get(type) || 0) + 1);
    } catch (e) {
      jsonLdParseErrors++;
    }
  }
  if (!found && rel !== '404.html') {
    jsonLdMissing++;
  }
}

// 5. E-E-A-T & Trust Signals
const trustPages = {
  about: allRoutes.has('/about/'),
  methodology: allRoutes.has('/methodology/') || allRoutes.has('/reviews/methodology/'),
  privacy: allRoutes.has('/privacy/'),
  terms: allRoutes.has('/terms/'),
  disclosure: allRoutes.has('/disclosure/')
};

// 6. Anchor Text Analysis (Generic Anchors)
const genericAnchors = anchorTexts.filter(a => /^(点击这里|查看详情|更多|阅读更多|了解更多|click here|read more)$/i.test(a.text));

console.log('\n--- AUDIT RESULTS ---');
console.log('1. AFFILIATE COMPLIANCE:');
console.log(`   - Compliant links (rel="sponsored nofollow noopener"): ${compliantAffiliate.length}`);
console.log(`   - Non-compliant links count: ${nonCompliantAffiliate.length}`);
console.log(`   - Pages with non-compliant links:`, nonCompliantPages);

console.log('\n2. INTERNAL LINKS & ARCHITECTURE:');
console.log(`   - Empty href (""): ${emptyHrefCount}`);
console.log(`   - Hash-only href ("#"): ${hashOnlyHrefCount}`);
console.log(`   - Dead internal links: ${deadInternalLinks.length}`);
if (deadInternalLinks.length > 0) console.log('   - Sample dead links:', deadInternalLinks.slice(0, 3));
console.log(`   - Orphan pages (not reachable from /): ${orphanPages.length}`);
if (orphanPages.length > 0) console.log('   - Sample orphan pages:', orphanPages.slice(0, 5));
console.log(`   - Click depth > 3 (depth = 4): ${depthGt3.length}`);
console.log(`   - Click depth >= 5: ${depthGt4.length}`);
console.log(`   - Generic meaningless anchors (点击这里/查看更多): ${genericAnchors.length}`);

console.log('\n3. STRUCTURED DATA (SCHEMA):');
console.log(`   - JSON-LD Missing pages: ${jsonLdMissing}`);
console.log(`   - JSON-LD Parse Errors: ${jsonLdParseErrors}`);
console.log(`   - Schema Types distribution:`, Object.fromEntries(schemaTypes));

console.log('\n4. E-E-A-T TRUST PAGES:');
console.log(`   - /about/ exists: ${trustPages.about}`);
console.log(`   - /methodology/ exists: ${trustPages.methodology}`);
console.log(`   - /privacy/ exists: ${trustPages.privacy}`);
console.log(`   - /terms/ exists: ${trustPages.terms}`);
console.log(`   - /disclosure/ exists: ${trustPages.disclosure}`);
