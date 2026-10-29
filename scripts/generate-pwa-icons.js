import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  }
  table[i] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function generateIcon(size, isMaskable = false) {
  const width = size;
  const height = size;
  const rawData = Buffer.alloc(height * (1 + width * 4));

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // Filter none
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      
      const cornerRadius = isMaskable ? 0 : size * 0.22;
      let alpha = 255;
      
      if (!isMaskable) {
        let dx = 0;
        let dy = 0;
        if (x < cornerRadius) dx = cornerRadius - x;
        else if (x >= width - cornerRadius) dx = x - (width - cornerRadius);
        if (y < cornerRadius) dy = cornerRadius - y;
        else if (y >= height - cornerRadius) dy = y - (height - cornerRadius);

        if (dx > 0 && dy > 0) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > cornerRadius) {
            alpha = 0;
          } else if (dist > cornerRadius - 1.2) {
            alpha = Math.max(0, Math.min(255, Math.round((cornerRadius - dist) * 255)));
          }
        }
      }

      if (alpha === 0) {
        rawData[pixelOffset] = 0;
        rawData[pixelOffset + 1] = 0;
        rawData[pixelOffset + 2] = 0;
        rawData[pixelOffset + 3] = 0;
        continue;
      }

      // Base gradient: Deep TariAds Emerald (#064E2A at top to #0A7E46 at bottom)
      const tY = y / height;
      const tX = x / width;
      let r = Math.round(6 + (10 - 6) * tY + (x / width) * 2);
      let g = Math.round(78 + (126 - 78) * tY);
      let b = Math.round(42 + (70 - 42) * tY);

      // Subtle gold accent dot/flare at top right
      const goldX = width * 0.82;
      const goldY = height * 0.18;
      const distGold = Math.sqrt((x - goldX) ** 2 + (y - goldY) ** 2);
      const goldRadius = size * 0.08;
      if (distGold <= goldRadius) {
        const factor = 1 - (distGold / goldRadius);
        r = Math.min(255, Math.round(r + 217 * factor));
        g = Math.min(255, Math.round(g + 130 * factor));
        b = Math.min(255, Math.round(b + 0 * factor));
      }

      // Draw bold geometric white 'T' (centered)
      const scale = isMaskable ? 0.44 : 0.52;
      const tW = size * scale;
      const tH = size * scale;
      const tLeft = (size - tW) / 2;
      const tTop = (size - tH) / 2;
      const barH = tH * 0.28;
      const stemW = tW * 0.32;
      const stemLeft = tLeft + (tW - stemW) / 2;

      const inTopBar = (x >= tLeft && x <= tLeft + tW && y >= tTop && y <= tTop + barH);
      const inStem = (x >= stemLeft && x <= stemLeft + stemW && y >= tTop + barH && y <= tTop + tH);

      if (inTopBar || inStem) {
        // Crisp White with slight warm tint
        r = 255;
        g = 255;
        b = 255;
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = alpha;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = zlib.deflateSync(rawData, { level: 9 });
  return Buffer.concat([
    sig,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', idat),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

const outDir = process.cwd();
const publicDir = path.join(outDir, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// 1. icon-192.png
const p192 = generateIcon(192, false);
fs.writeFileSync(path.join(outDir, 'icon-192.png'), p192);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), p192);

// 2. icon-512.png
const p512 = generateIcon(512, false);
fs.writeFileSync(path.join(outDir, 'icon-512.png'), p512);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), p512);

// 3. icon-maskable-512.png
const pMaskable = generateIcon(512, true);
fs.writeFileSync(path.join(outDir, 'icon-maskable-512.png'), pMaskable);
fs.writeFileSync(path.join(publicDir, 'icon-maskable-512.png'), pMaskable);

// 4. apple-touch-icon.png (180x180)
const pApple = generateIcon(180, false);
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), pApple);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pApple);

// 5. favicon.svg
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="tariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#075E34" />
      <stop offset="100%" stop-color="#0A7E46" />
    </linearGradient>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.4)" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#tariGrad)" />
  <circle cx="420" cy="92" r="28" fill="#D98200" opacity="0.9" />
  <g filter="url(#glow)">
    <path d="M128 140h256v68h-96v184h-64V208h-96z" fill="#FFFFFF" />
  </g>
</svg>`;
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg);

console.log('All TariAds PWA icons successfully generated in root and public/.');
