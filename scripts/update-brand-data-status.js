import fs from 'node:fs';

const brandsFile = 'data/brands.json';
const brands = JSON.parse(fs.readFileSync(brandsFile, 'utf8'));

let verifiedCount = 0;
let archivedCount = 0;

for (const b of brands) {
  if (b.hasSpeedtestImage) {
    b.dataStatus = 'speedtest-verified';
    verifiedCount++;
  } else {
    b.dataStatus = 'official-catalog-archived';
    archivedCount++;
  }
}

fs.writeFileSync(brandsFile, JSON.stringify(brands, null, 2), 'utf8');
console.log(`[update-brand-data-status] Completed! verified: ${verifiedCount}, archived: ${archivedCount}`);
