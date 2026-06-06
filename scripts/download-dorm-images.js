// One-shot download script: pulls handoff CDN images into assets/img/dorm-supplies/
const fs = require('fs');
const path = require('path');
const https = require('https');

const SRC = 'E:/unidock_resources/dorm-supplies-handoff/dorm-supplies-handoff/data/dorm-products.json';
const OUT_ROOT = path.join(__dirname, '..', 'assets', 'img', 'dorm-supplies');
const CONCURRENCY = 12;

const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const tasks = [];
data.forEach(p => {
  p.images.forEach((img, i) => {
    const num = String(i + 1).padStart(2, '0');
    const outDir = path.join(OUT_ROOT, p.sectionKey, p.productKey);
    const outFile = path.join(outDir, num + '.jpg');
    tasks.push({ url: img.sourceUrl, outDir, outFile });
  });
});

console.log('Total images to download:', tasks.length);

function download(task) {
  return new Promise((resolve) => {
    fs.mkdirSync(task.outDir, { recursive: true });
    if (fs.existsSync(task.outFile) && fs.statSync(task.outFile).size > 0) {
      return resolve({ ok: true, skip: true });
    }
    const file = fs.createWriteStream(task.outFile);
    const req = https.get(task.url, { timeout: 30000 }, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(task.outFile, () => {});
        return resolve({ ok: false, err: 'status ' + res.statusCode, url: task.url });
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve({ ok: true })));
    });
    req.on('error', err => {
      file.close();
      fs.unlink(task.outFile, () => {});
      resolve({ ok: false, err: err.message, url: task.url });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, err: 'timeout', url: task.url });
    });
  });
}

async function run() {
  let done = 0, ok = 0, skip = 0, fail = 0;
  const failures = [];
  const queue = tasks.slice();
  async function worker() {
    while (queue.length) {
      const t = queue.shift();
      const r = await download(t);
      done++;
      if (r.skip) skip++;
      else if (r.ok) ok++;
      else { fail++; failures.push({ url: t.url, err: r.err }); }
      if (done % 50 === 0) console.log(`  progress: ${done}/${tasks.length} (ok=${ok} skip=${skip} fail=${fail})`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`Done. ok=${ok} skip=${skip} fail=${fail}`);
  if (failures.length) {
    fs.writeFileSync(path.join(__dirname, 'download-failures.json'), JSON.stringify(failures, null, 2));
    console.log('Failures written to scripts/download-failures.json');
  }
}
run();
