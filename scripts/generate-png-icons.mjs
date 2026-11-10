import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcBuf = Buffer.alloc(4);
  const typeAndData = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([lenBuf, typeAndData, crcBuf]);
}

function generatePngBuffer(width, height, isMaskable = false) {
  // Generate RGBA pixel data
  // Color palette:
  // Primary Blue: #2563EB (37, 99, 235)
  // Darker Blue: #1D4ED8 (29, 78, 216)
  // White: #FFFFFF (255, 255, 255)
  // Amber: #F59E0B (245, 158, 11)
  // Emerald: #10B981 (16, 185, 129)

  const rawBytes = Buffer.alloc((width * 4 + 1) * height);
  let pos = 0;

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (isMaskable ? 0.38 : 0.44);

  for (let y = 0; y < height; y++) {
    rawBytes[pos++] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default background: Cobalt Blue gradient
      let r = 37 + Math.floor((dy / height) * 15);
      let g = 99 - Math.floor((dy / height) * 20);
      let b = 235 - Math.floor((dy / height) * 25);
      let a = 255;

      // Inner calendar card
      const cardW = width * (isMaskable ? 0.6 : 0.72);
      const cardH = height * (isMaskable ? 0.6 : 0.72);
      const left = cx - cardW / 2;
      const top = cy - cardH / 2;
      const right = cx + cardW / 2;
      const bottom = cy + cardH / 2;

      if (x >= left && x <= right && y >= top && y <= bottom) {
        // Inside calendar card
        const cardRelY = y - top;
        const headerH = cardH * 0.22;

        if (cardRelY < headerH) {
          // Calendar top header (Deep Blue)
          r = 29;
          g = 78;
          b = 216;
        } else {
          // Card body (White)
          r = 255;
          g = 255;
          b = 255;

          // Draw some schedule shift bars
          const slot1Top = top + headerH + cardH * 0.12;
          const slot1Bot = slot1Top + cardH * 0.14;
          const slot2Top = slot1Bot + cardH * 0.08;
          const slot2Bot = slot2Top + cardH * 0.14;
          const slot3Top = slot2Bot + cardH * 0.08;
          const slot3Bot = slot3Top + cardH * 0.14;

          if (y >= slot1Top && y <= slot1Bot && x >= left + cardW * 0.1 && x <= left + cardW * 0.85) {
            // Blue shift bar
            r = 59;
            g = 130;
            b = 246;
          } else if (y >= slot2Top && y <= slot2Bot && x >= left + cardW * 0.1 && x <= left + cardW * 0.65) {
            // Emerald shift bar
            r = 16;
            g = 185;
            b = 129;
          } else if (y >= slot3Top && y <= slot3Bot && x >= left + cardW * 0.1 && x <= left + cardW * 0.75) {
            // Amber shift bar
            r = 245;
            g = 158;
            b = 11;
          }
        }
      }

      rawBytes[pos++] = Math.max(0, Math.min(255, r));
      rawBytes[pos++] = Math.max(0, Math.min(255, g));
      rawBytes[pos++] = Math.max(0, Math.min(255, b));
      rawBytes[pos++] = a;
    }
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // Bit depth: 8
  ihdr.writeUInt8(6, 9); // Color type: RGBA (6)
  ihdr.writeUInt8(0, 10); // Compression
  ihdr.writeUInt8(0, 11); // Filter
  ihdr.writeUInt8(0, 12); // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT chunk
  const compressed = zlib.deflateSync(rawBytes, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write 192x192
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePngBuffer(192, 192, false));
console.log('Generated pwa-192x192.png');

// Write 512x512
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePngBuffer(512, 512, false));
console.log('Generated pwa-512x512.png');

// Write maskable 512x512
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePngBuffer(512, 512, true));
console.log('Generated pwa-maskable-512x512.png');

// Write apple-touch-icon 180x180
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePngBuffer(180, 180, false));
console.log('Generated apple-touch-icon.png');

// Write favicon.ico
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePngBuffer(64, 64, false));
console.log('Generated favicon.ico');
