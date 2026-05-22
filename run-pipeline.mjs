import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const PIPELINE_PATH = 'data/pipeline.md';
const INPUT_FILE = 'batch/batch-input.tsv';

console.log('🚀 Starting Career-Ops Full Automation Pipeline...');

// 1. Run the zero-token portal scanner with Playwright verification
console.log('\n🔍 Scanning portals for new job postings...');
try {
  execSync('node scan.mjs --verify', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️ Scan completed with some warnings/errors.');
}

// 2. Parse data/pipeline.md for pending entries
if (!existsSync(PIPELINE_PATH)) {
  console.log('❌ No pipeline.md found. Run portals scan first.');
  process.exit(1);
}

console.log('\nParsing pending offers from pipeline.md...');
const pipelineContent = readFileSync(PIPELINE_PATH, 'utf-8');
const pendingMatches = [...pipelineContent.matchAll(/- \[ \] (https?:\/\/\S+)(?:\s*\|\s*([^|]+)\s*\|\s*([^|]+))?/g)];

if (pendingMatches.length === 0) {
  console.log('✅ No new pending offers to process.');
} else {
  console.log(`Found ${pendingMatches.length} pending offer(s) to process.`);

  // Load existing input or initialize
  let existingOffers = [];
  let maxId = 0;
  if (existsSync(INPUT_FILE)) {
    const lines = readFileSync(INPUT_FILE, 'utf-8').trim().split('\n');
    existingOffers = lines.slice(1).map(line => line.split('\t'));
    existingOffers.forEach(row => {
      const id = parseInt(row[0], 10);
      if (id > maxId) maxId = id;
    });
  }

  const newRows = [];
  const urlsInInput = new Set(existingOffers.map(row => row[1]));

  for (const match of pendingMatches) {
    const url = match[1];
    const company = match[2]?.trim() || 'Unknown';
    const role = match[3]?.trim() || 'Job';

    if (!urlsInInput.has(url)) {
      maxId++;
      // Format: id, url, source, notes
      newRows.push(`${maxId}\t${url}\t${company}\t${role}`);
    }
  }

  if (newRows.length > 0) {
    // Write batch-input.tsv
    mkdirSync('batch', { recursive: true });
    if (!existsSync(INPUT_FILE)) {
      writeFileSync(INPUT_FILE, 'id\turl\tsource\tnotes\n', 'utf-8');
    }
    const appendContent = newRows.join('\n') + '\n';
    writeFileSync(INPUT_FILE, readFileSync(INPUT_FILE, 'utf-8') + appendContent, 'utf-8');
    console.log(`Added ${newRows.length} new offers to batch processing queue.`);
  }

  // 3. Execute batch processing
  console.log('\n🤖 Launching parallel AI workers to evaluate offers...');
  try {
    execSync('./batch/batch-runner.sh --parallel 3', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Batch runner failed:', error.message);
  }
}

// 4. Open the Bubble Tea Dashboard
console.log('\n📊 Opening Career Dashboard...');
try {
  execSync('go version', { stdio: 'ignore' });
  execSync('cd dashboard && go build -o career-dashboard . && ./career-dashboard --path ..', { stdio: 'inherit' });
} catch (error) {
  console.log('\n⚠️  Go is not installed on your system. Launching lightweight CLI dashboard instead:');
  try {
    execSync('node view-tracker.mjs', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Could not boot Dashboard fallback:', err.message);
  }
}
