const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/Jeremias Lanza/.gemini/antigravity/brain/ee8ec433-a1a0-48b8-b27b-4435b87ef484/.user_uploaded/media_1790812824412.jpg';

// Helper to create a 100% standard Windows BMP-encoded ICO file (universally recognized by all browsers and Windows)
async function createStandardBmpIco(sizes, pngBuffer) {
  const count = sizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const images = [];
  for (const s of sizes) {
    const raw = await sharp(pngBuffer).resize(s, s).ensureAlpha().raw().toBuffer();
    const maskRowStride = Math.ceil(s / 32) * 4;
    const andMaskSize = maskRowStride * s;
    const xorSize = s * s * 4;
    const bihSize = 40;
    const totalImgSize = bihSize + xorSize + andMaskSize;

    const bih = Buffer.alloc(bihSize);
    bih.writeUInt32LE(bihSize, 0);
    bih.writeInt32LE(s, 4);
    bih.writeInt32LE(s * 2, 8); // height * 2 as per ICO spec
    bih.writeUInt16LE(1, 12); // planes = 1
    bih.writeUInt16LE(32, 14); // 32 bpp
    bih.writeUInt32LE(0, 16); // BI_RGB
    bih.writeUInt32LE(xorSize + andMaskSize, 20); // biSizeImage

    const xorData = Buffer.alloc(xorSize);
    const andMask = Buffer.alloc(andMaskSize, 0);

    for (let y = 0; y < s; y++) {
      const srcY = s - 1 - y; // bottom-up bitmap order
      for (let x = 0; x < s; x++) {
        const srcIdx = (srcY * s + x) * 4;
        const dstIdx = (y * s + x) * 4;
        const r = raw[srcIdx];
        const g = raw[srcIdx + 1];
        const b = raw[srcIdx + 2];
        const a = raw[srcIdx + 3];
        // BGRA format
        xorData[dstIdx] = b;
        xorData[dstIdx + 1] = g;
        xorData[dstIdx + 2] = r;
        xorData[dstIdx + 3] = a;
        if (a < 128) {
          const byteIdx = y * maskRowStride + Math.floor(x / 8);
          const bitIdx = 7 - (x % 8);
          andMask[byteIdx] |= (1 << bitIdx);
        }
      }
    }

    const imgBuffer = Buffer.concat([bih, xorData, andMask]);
    images.push({ width: s, height: s, size: totalImgSize, buffer: imgBuffer, offset });
    offset += totalImgSize;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // 32 bpp
    entry.writeUInt32LE(img.size, 8); // size of image data
    entry.writeUInt32LE(img.offset, 12); // offset
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
}

async function main() {
  console.log('Generating official Londress favicons and logo assets...');

  if (!fs.existsSync(inputPath)) {
    throw new Error('Input image not found: ' + inputPath);
  }

  // 1. High-Res Circular Transparent PNG (512x512)
  const size512 = 512;
  const circleMask512 = Buffer.from(`
    <svg width="${size512}" height="${size512}">
      <circle cx="${size512 / 2}" cy="${size512 / 2}" r="${size512 / 2 - 1}" fill="#fff" />
    </svg>
  `);

  const resized512 = await sharp(inputPath)
    .resize(size512, size512, { fit: 'cover' })
    .toBuffer();

  const logoTransparent512 = await sharp(resized512)
    .composite([{ input: circleMask512, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. High-Res Clean JPG (512x512)
  const logoJpg512 = await sharp(inputPath)
    .resize(size512, size512, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toBuffer();

  // Write base logo files
  fs.writeFileSync(path.join('public', 'images', 'logo.jpg'), logoJpg512);
  fs.writeFileSync(path.join('public', 'images', 'logo-transparent.png'), logoTransparent512);
  console.log('Wrote public/images/logo.jpg and public/images/logo-transparent.png');

  // 3. Apple Touch Icon (180x180 PNG)
  const appleIcon180 = await sharp(logoTransparent512)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join('src', 'app', 'apple-icon.png'), appleIcon180);
  fs.writeFileSync(path.join('public', 'apple-icon.png'), appleIcon180);
  console.log('Wrote apple-icon.png (180x180)');

  // 4. PNG Favicons: 96x96, 32x32, 16x16
  const icon96 = await sharp(logoTransparent512)
    .resize(96, 96)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join('src', 'app', 'icon.png'), icon96);
  fs.writeFileSync(path.join('public', 'icon.png'), icon96);

  const icon32 = await sharp(logoTransparent512)
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join('public', 'favicon-32x32.png'), icon32);

  const icon16 = await sharp(logoTransparent512)
    .resize(16, 16)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join('public', 'favicon-16x16.png'), icon16);
  console.log('Wrote PNG icons: 96x96, 32x32, 16x16');

  // 5. Standard BMP-encoded ICO (16x16, 32x32, 48x48)
  const validIcoBuffer = await createStandardBmpIco([16, 32, 48], logoTransparent512);
  fs.writeFileSync(path.join('public', 'favicon.ico'), validIcoBuffer);
  fs.writeFileSync(path.join('src', 'app', 'favicon.ico'), validIcoBuffer);
  console.log('Wrote valid standard BMP ICO: public/favicon.ico and src/app/favicon.ico (size:', validIcoBuffer.length, 'bytes)');

  // 6. Remove broken icon.svg files (which Chrome refuses to render as tab favicons)
  const appSvg = path.join('src', 'app', 'icon.svg');
  if (fs.existsSync(appSvg)) {
    fs.unlinkSync(appSvg);
    console.log('Removed src/app/icon.svg to prevent browser SVG raster blocking');
  }
  const publicSvg = path.join('public', 'icon.svg');
  if (fs.existsSync(publicSvg)) {
    fs.unlinkSync(publicSvg);
    console.log('Removed public/icon.svg to prevent browser SVG raster blocking');
  }

  console.log('All favicon and logo assets updated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
