const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/images/shawls');
console.log('Reading from directory:', dir);

async function convertAll() {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.jpg')) {
      const fullPath = path.join(dir, f);
      const tempPath = path.join(dir, f + '.temp.jpg');
      try {
        const inputBuffer = fs.readFileSync(fullPath);
        await sharp(inputBuffer)
          .jpeg({ quality: 90, mozjpeg: true })
          .toFile(tempPath);

        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        console.log(`[SUCCESS] Converted ${f} to genuine standard JPEG!`);
      } catch (err) {
        console.error(`[ERROR] Failed converting ${f}:`, err.message);
      }
    }
  }
}

convertAll().then(() => {
  console.log('\n--- VERIFICATION REPORT ---');
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    if (f.endsWith('.jpg')) {
      const buf = fs.readFileSync(path.join(dir, f));
      const isJpeg = buf[0] === 0xFF && buf[1] === 0xD8;
      console.log(f, '-> Size:', buf.length, 'bytes | Genuine JPEG:', isJpeg ? '✅ YES (0xFFD8)' : '❌ NO');
    }
  });
});
