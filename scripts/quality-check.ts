const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../dist');

const lintResult = fs.readFileSync(`${root}/test-reports/lint-result.txt`).toString().trim();
const lintSuccess = lintResult !== 'FAILURE';

const coverageSummaryData = JSON.parse(fs.readFileSync(
  `${root}/test-reports/coverage/coverage-summary.json`
  ).toString()
);

const coverageSuccess = coverageSummaryData.total.lines.pct > 80;

console.log('Quality Check');
console.log(`Lint Check Passed: ${lintSuccess}`);
console.log(`Coverage Check Passed: ${coverageSuccess}\n`);

if (!lintSuccess || !coverageSuccess) {
  console.log('Fail');
  process.exit(1);
}

console.log('Pass');
