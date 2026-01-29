const sharp = require("sharp");
const path = require("path");

sharp(path.join(__dirname, "public/brand/256x256.svg"))
  .png({ quality: 90 })
  .toFile(path.join(__dirname, "public/brand/256x256.png"))
  .then((info) => {
    console.log("✅ SVG convertido para PNG com sucesso!");
    console.log(`Arquivo: ${info.filename}`);
    console.log(`Tamanho: ${(info.size / 1024).toFixed(2)} KB`);
  })
  .catch((err) => {
    console.error("❌ Erro ao converter:", err);
    process.exit(1);
  });
