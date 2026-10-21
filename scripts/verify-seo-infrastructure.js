import fs from 'node:fs';
import path from 'node:path';

const distDir = 'site/.vitepress/dist';
console.log('=== Pre-Launch SEO Infrastructure Acceptance Verification ===\n');

// 1. Check robots.txt
const robotsPath = path.join(distDir, 'robots.txt');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
const hasGooglebot = robotsContent.includes('Googlebot');
const hasBingbot = robotsContent.includes('bingbot') || robotsContent.includes('Bingbot');
const hasBaidu = robotsContent.includes('Baiduspider');
const hasShenma = robotsContent.includes('yisouspider') || robotsContent.includes('YisouSpider');
const hasSitemapInRobots = robotsContent.includes('Sitemap: https://jichangdaili.world/sitemap.xml');
const hasDisallowAll = robotsContent.includes('Disallow: /');

console.log('1. ROBOTS.TXT CHECK:');
console.log(`   - File exists: ${fs.existsSync(robotsPath)}`);
console.log(`   - Googlebot allowed: ${hasGooglebot}`);
console.log(`   - Bingbot allowed: ${hasBingbot}`);
console.log(`   - Baiduspider allowed: ${hasBaidu}`);
console.log(`   - YisouSpider (神马) allowed: ${hasShenma}`);
console.log(`   - Official Sitemap declared: ${hasSitemapInRobots}`);
console.log(`   - Dangerous "Disallow: /" present: ${hasDisallowAll}`);

// 2. Check sitemap.xml
const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const nonHttpsCount = urlMatches.filter(u => !u.startsWith('https://jichangdaili.world/')).length;
const has404InSitemap = urlMatches.some(u => u.includes('404'));

console.log('\n2. SITEMAP.XML CHECK:');
console.log(`   - File exists: ${fs.existsSync(sitemapPath)}`);
console.log(`   - Total URLs in sitemap: ${urlMatches.length}`);
console.log(`   - URLs with wrong domain / non-HTTPS: ${nonHttpsCount}`);
console.log(`   - 404 page in sitemap: ${has404InSitemap}`);

// 3. Check 404 page
const page404Path = path.join(distDir, '404.html');
const page404Content = fs.readFileSync(page404Path, 'utf8');
const is404Noindex = page404Content.includes('content="noindex, nofollow"');
console.log('\n3. 404 PAGE CHECK:');
console.log(`   - 404.html exists: ${fs.existsSync(page404Path)}`);
console.log(`   - 404 has noindex, nofollow: ${is404Noindex}`);

// 4. Sample page checks: Home, Category, Article
function inspectHtml(relPath) {
  const fullPath = path.join(distDir, relPath);
  if (!fs.existsSync(fullPath)) return { exists: false };
  const html = fs.readFileSync(fullPath, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const ogUrlMatch = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i);
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const twitterTitleMatch = html.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => {
    try { return JSON.parse(m[1]); } catch(e) { return null; }
  });

  const schemaTypes = jsonLdMatches.map(j => j ? j['@type'] : 'null');

  return {
    exists: true,
    title: titleMatch ? titleMatch[1] : null,
    desc: descMatch ? descMatch[1] : null,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    ogUrl: ogUrlMatch ? ogUrlMatch[1] : null,
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
    twitterTitle: twitterTitleMatch ? twitterTitleMatch[1] : null,
    h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null,
    schemaTypes
  };
}

console.log('\n4. SAMPLE PAGE INSPECTIONS:');
console.log('--- Home (/) ---');
console.log(inspectHtml('index.html'));

console.log('--- Category (/recommend/) ---');
console.log(inspectHtml('recommend/index.html'));

console.log('--- Pillar Article (/recommend/speedtest-measured-airports-2026-review/) ---');
console.log(inspectHtml('recommend/speedtest-measured-airports-2026-review/index.html'));

console.log('--- Brand Directory (/brands/) ---');
console.log(inspectHtml('brands/index.html'));

console.log('--- About Page (/about/) ---');
console.log(inspectHtml('about/index.html'));

// 5. Scan all HTML files for noindex leaks
let noindexLeaks = [];
function scanNoindex(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanNoindex(full);
    else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== '404.html') {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('content="noindex') || c.includes('name="robots" content="none"')) {
        noindexLeaks.push(path.relative(distDir, full));
      }
    }
  }
}
scanNoindex(distDir);
console.log('\n5. NOINDEX AUDIT ACROSS ALL PUBLISHED PAGES:');
console.log(`   - Accidental noindex on published pages: ${noindexLeaks.length}`);
if (noindexLeaks.length > 0) console.log('   - Leaks:', noindexLeaks);
