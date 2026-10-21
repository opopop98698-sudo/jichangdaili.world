import fs from 'node:fs';

const sitemap = fs.readFileSync('site/.vitepress/dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

let uppercaseCount = 0;
let missingTrailingSlash = 0;
let paramUrls = 0;
let chineseUrls = 0;

for (const u of urls) {
  const pathPart = u.replace('https://jichangdaili.world', '');
  if (pathPart !== pathPart.toLowerCase()) {
    uppercaseCount++;
  }
  if (!pathPart.endsWith('/') && !pathPart.includes('.')) {
    missingTrailingSlash++;
  }
  if (pathPart.includes('?') || pathPart.includes('&')) {
    paramUrls++;
  }
  if (/[\u4e00-\u9fa5]/.test(pathPart)) {
    chineseUrls++;
  }
}

console.log('--- URL Specifications Audit ---');
console.log('Total URLs audited:', urls.length);
console.log('Uppercase URLs count:', uppercaseCount);
console.log('Missing trailing slash count:', missingTrailingSlash);
console.log('Parameter URLs count:', paramUrls);
console.log('Chinese URLs count:', chineseUrls);
