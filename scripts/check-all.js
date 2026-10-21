import { execSync } from 'node:child_process';

console.log('=== [check:all] Running Full Quality & Security Pipeline ===\n');

const steps = [
  { name: 'Content Preparation', cmd: 'node scripts/prepare-content.js' },
  { name: 'Unit & Registry Tests', cmd: 'node scripts/run-tests.js' },
  { name: 'Content Quality & Metadata Audit', cmd: 'node scripts/check-content.js' },
  { name: 'Link Integrity Check', cmd: 'node scripts/check-links.js' },
  { name: 'Secret & Credential Scan', cmd: 'node scripts/check-secrets.js' }
];

let failed = false;

for (const step of steps) {
  console.log(`\n>>> Running: ${step.name} (${step.cmd})`);
  try {
    execSync(step.cmd, { stdio: 'inherit' });
    console.log(`✓ ${step.name} PASSED.`);
  } catch (err) {
    console.error(`✗ ${step.name} FAILED.`);
    failed = true;
    break;
  }
}

if (failed) {
  console.error('\n=== Pipeline check failed. Please resolve above errors. ===');
  process.exit(1);
} else {
  console.log('\n=== All pipeline checks passed successfully! Ready for production build. ===');
}
