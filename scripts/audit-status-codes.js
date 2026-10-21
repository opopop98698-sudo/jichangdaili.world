import fs from 'node:fs';
import http from 'node:http';

const sitemap = fs.readFileSync('site/.vitepress/dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

// Select 30 distributed sample URLs
const sampleUrls = [];
const step = Math.floor(urls.length / 30);
for (let i = 0; i < urls.length && sampleUrls.length < 30; i += step) {
  sampleUrls.push(urls[i].replace('https://jichangdaili.world', ''));
}

// Add a test 404 URL
sampleUrls.push('/this-route-definitely-does-not-exist-404/');

function checkUrl(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:4173' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const isSoft404 = res.statusCode === 200 && (data.length < 1000 || data.includes('页面不存在') || data.includes('Page Not Found'));
        resolve({ url: urlPath, status: res.statusCode, length: data.length, isSoft404 });
      });
    }).on('error', (err) => resolve({ url: urlPath, status: 'ERR: ' + err.message }));
  });
}

async function run() {
  console.log(`Auditing 30 sample URLs + 1 non-existent URL against preview server...`);
  const results = [];
  for (const u of sampleUrls) {
    const r = await checkUrl(u);
    results.push(r);
  }
  
  const status200 = results.filter(r => r.status === 200);
  const status404 = results.filter(r => r.status === 404);
  const soft404 = results.filter(r => r.isSoft404);
  const errors = results.filter(r => typeof r.status !== 'number' || (r.status >= 500));

  console.log(`Sample total checked: ${results.length}`);
  console.log(`HTTP 200 OK: ${status200.length}`);
  console.log(`HTTP 404 Not Found: ${status404.length}`);
  console.log(`Soft 404 detected: ${soft404.length}`);
  console.log(`Server Errors (5xx / Connection): ${errors.length}`);
  console.log('\nSample results (first 5):', results.slice(0, 5));
  console.log('Non-existent URL result:', results[results.length - 1]);
}
run();
