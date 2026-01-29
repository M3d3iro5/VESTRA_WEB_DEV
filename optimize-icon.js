const sharp = require("sharp");
const path = require("path");

const inputPath = path.join(__dirname, "public/brand/Vestra_icon.png");
const outputPath = path.join(__dirname, "public/brand/icon.webp");
const outputPng = path.join(__dirname, "public/brand/icon.png");

async function optimize() {
  try {
    // Redimensionar e converter para WebP (muito mais leve)
    await sharp(inputPath)
      .resize(256, 256, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    // Também salvar PNG otimizado
    await sharp(inputPath)
      .resize(256, 256, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(outputPng);

    console.log("✅ Imagem otimizada com sucesso!");
    console.log("📦 WebP:", outputPath);
    console.log("📦 PNG:", outputPng);
  } catch (error) {
    console.error("❌ Erro:", error.message);
  }
}

optimize();
