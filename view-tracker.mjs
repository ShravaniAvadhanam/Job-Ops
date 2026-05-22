import { readFileSync, existsSync } from 'fs';

const APPLICATIONS_PATH = 'data/applications.md';

if (!existsSync(APPLICATIONS_PATH)) {
  console.error('❌ applications.md tracker file not found.');
  process.exit(1);
}

const content = readFileSync(APPLICATIONS_PATH, 'utf-8');
const lines = content.split('\n');

console.log('\n📊 === Career-Ops Applications Tracker ===\n');

for (const line of lines) {
  if (line.startsWith('|') && !line.includes('---')) {
    const parts = line.split('|').map(p => p.trim()).filter(Boolean);
    if (parts[0] === '#') {
      console.log(`\x1b[1m\x1b[36m${parts[0].padEnd(4)} ${parts[2].padEnd(18)} ${parts[3].padEnd(28)} ${parts[4].padEnd(8)} ${parts[5].padEnd(12)} ${parts[8]}\x1b[0m`);
      console.log('━'.repeat(95));
    } else {
      const scoreNum = parseFloat(parts[4]);
      const scoreColor = scoreNum >= 4.5 ? '\x1b[32m\x1b[1m' : (scoreNum >= 4.0 ? '\x1b[32m' : '\x1b[33m'); 
      const statusColor = parts[5] === 'Evaluated' ? '\x1b[34m' : '\x1b[35m';
      console.log(`${parts[0].padEnd(4)} ${parts[2].padEnd(18)} ${parts[3].padEnd(28)} ${scoreColor}${parts[4].padEnd(8)}\x1b[0m ${statusColor}${parts[5].padEnd(12)}\x1b[0m ${parts[8]}`);
    }
  }
}
console.log('\n\x1b[90m→ Open reports directly in: reports/ directory\x1b[0m');
console.log('\x1b[90m→ Update application statuses in: data/applications.md\x1b[0m\n');
