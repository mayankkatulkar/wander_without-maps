import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dir = 'public/images';
const files = (await readdir(dir)).filter((f) => f.endsWith('.png'));

for (const file of files) {
  const base = path.basename(file, '.png');
  const src = path.join(dir, file);
  const out = path.join(dir, `${base}.webp`);
  await sharp(src).resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  const before = (await stat(src)).size;
  const after = (await stat(out)).size;
  console.log(`${base}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}
