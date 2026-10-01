const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/Jeremias Lanza/.gemini/antigravity/brain/ee8ec433-a1a0-48b8-b27b-4435b87ef484/.user_uploaded/media_1790812824412.jpg';

// Helper to create a valid Windows .ico file containing PNG data
function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

  const dirEntries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(img => img.buffer)]);
}

async function run() {
  console.log('Generating official Londress logos and favicons from uploaded image...');
  
  if (!fs.existsSync(inputPath)) {
    throw new Error('Input image not found at ' + inputPath);
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

  // Save to public/images/
  fs.writeFileSync(path.join('public', 'images', 'logo.jpg'), logoJpg512);
  fs.writeFileSync(path.join('public', 'images', 'logo-transparent.png'), logoTransparent512);
  console.log('Wrote public/images/logo.jpg and public/images/logo-transparent.png');

  // 3. Apple Touch Icon (180x180 PNG)
  const appleIcon180 = await sharp(logoTransparent512)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join('src', 'app', 'apple-icon.png'), appleIcon180);
  console.log('Wrote src/app/apple-icon.png');

  // 4. Standard App Icons
  const icon96 = await sharp(logoTransparent512)
    .resize(96, 96)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join('src', 'app', 'icon.png'), icon96);

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
  console.log('Wrote favicon-16x16, favicon-32x32, icon.png');

  // 5. Multi-size ICO
  const icon48 = await sharp(logoTransparent512)
    .resize(48, 48)
    .png()
    .toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: icon16 },
    { width: 32, height: 32, buffer: icon32 },
    { width: 48, height: 48, buffer: icon48 },
  ]);

  fs.writeFileSync(path.join('public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join('src', 'app', 'favicon.ico'), icoBuffer);
  console.log('Wrote public/favicon.ico and src/app/favicon.ico');

  // 6. SVG wrapper icon for modern browsers that request /icon.svg
  const base64Png = logoTransparent512.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="512" height="512"/>
</svg>`;
  fs.writeFileSync(path.join('public', 'icon.svg'), svgContent, 'utf8');
  fs.writeFileSync(path.join('src', 'app', 'icon.svg'), svgContent, 'utf8');
  console.log('Wrote public/icon.svg and src/app/icon.svg');

  console.log('All logo and favicon assets successfully generated and replaced!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
