const sharp = require("sharp");
const fs = require("fs");

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

async function generateBrandAssets(inputLogo, outputDir, data = {}) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const name = data.firstname || "User";
  const title = data.position || data.company || "";
  const bg = data.themeColor || "#000000";
  const fg = data.textColor || "#ffffff";

  /* -------------------------
     ICON VARIANTS
  --------------------------*/

  const sizes = [
    { name: "icon-192-light.png", size: 192, theme: "light" },
    { name: "icon-512-light.png", size: 512, theme: "light" },
    { name: "icon-192-dark.png", size: 192, theme: "dark" },
    { name: "icon-512-dark.png", size: 512, theme: "dark" }
  ];

  for (const icon of sizes) {
    await sharp(inputLogo)
      .resize(icon.size, icon.size)
      .flatten({
        background: icon.theme === "dark" ? "#000000" : "#ffffff"
      })
      .png()
      .toFile(`${outputDir}/${icon.name}`);
  }

  /* -------------------------
     OG IMAGE (1200x630)
  --------------------------*/

  const rgb = hexToRgb(bg);

  const svg = `
  <svg width="1200" height="630">
    <rect width="1200" height="630" fill="rgb(${rgb.r},${rgb.g},${rgb.b})"/>

    <image href="${inputLogo}" x="80" y="140" width="350" height="350"/>

    <text x="480" y="260" font-size="64" fill="${fg}" font-family="Arial">
      ${name}
    </text>

    <text x="480" y="330" font-size="32" fill="${fg}" font-family="Arial">
      ${title}
    </text>

    <text x="480" y="420" font-size="24" fill="${fg}" opacity="0.8">
      SwipeDex Digital Card
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(`${outputDir}/og-image.png`);
}

module.exports = { generateBrandAssets };