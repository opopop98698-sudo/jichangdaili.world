import fs from 'node:fs';

const brands = JSON.parse(fs.readFileSync('data/brands.json', 'utf8'));

console.log('Total brands in database:', brands.length);

let missingDataStatus = 0;
let missingSpeedtestDate = 0;
let hasSpeedtestImage = 0;

for (const b of brands) {
  if (!b.dataStatus) missingDataStatus++;
  if (!b.speedtestTestedAt) missingSpeedtestDate++;
  if (b.hasSpeedtestImage) hasSpeedtestImage++;
}

console.log('Brands with dataStatus attribute:', brands.length - missingDataStatus, '/', brands.length);
console.log('Brands with speedtestTestedAt timestamp:', brands.length - missingSpeedtestDate, '/', brands.length);
console.log('Brands with speedtestImage screenshot proof:', hasSpeedtestImage, '/', brands.length);
console.log('Sample brand dataStatus:', brands[0].dataStatus || 'UNDEFINED');
