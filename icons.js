const sharp = require("sharp");
const fs = require("fs");

async function generateIcons(inputPath, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const sizes = [
  /* ---------------- FAVICONS ---------------- */
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-64x64.png", size: 64 },
  { name: "favicon-96x96.png", size: 96 },

  /* ---------------- ANDROID ---------------- */
  { name: "android-chrome-128x128.png", size: 128 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-256x256.png", size: 256 },
  { name: "android-chrome-384x384.png", size: 384 },
  { name: "android-chrome-512x512.png", size: 512 },

  /* ---------------- IOS ---------------- */
  { name: "apple-touch-icon.png", size: 180 },
  { name: "apple-touch-icon-152x152.png", size: 152 },
  { name: "apple-touch-icon-167x167.png", size: 167 },
  { name: "apple-touch-icon-180x180.png", size: 180 },

  /* ---------------- PWA / MASKABLE ---------------- */
  { name: "maskable-192x192.png", size: 192 },
  { name: "maskable-512x512.png", size: 512 },

  /* ---------------- MANIFEST ---------------- */
  { name: "icon-72x72.png", size: 72 },
  { name: "icon-96x96.png", size: 96 },
  { name: "icon-128x128.png", size: 128 },
  { name: "icon-144x144.png", size: 144 },
  { name: "icon-192x192.png", size: 192 },
  { name: "icon-512x512.png", size: 512 },

  /* ---------------- FALLBACK / GENERAL ---------------- */
  { name: "site-icon-512.png", size: 512 }
];

  for (const icon of sizes) {
    await sharp(inputPath)
      .resize(icon.size, icon.size)
      .png()
      .toFile(`${outputDir}/${icon.name}`);
  }

  // favicon.ico (multi-size)
  await sharp(inputPath)
    .resize(32, 32)
    .toFile(`${outputDir}/favicon.ico`);
}

module.exports = { generateIcons };