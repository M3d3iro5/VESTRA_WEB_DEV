const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

sharp(path.join(__dirname, "public/brand/256x256.svg"))
  .png({ quality: 90 })
  .toBuffer()
  .then((buffer) => {
    // Salva o PNG
    fs.writeFileSync(path.join(__dirname, "public/brand/256x256.png"), buffer);

    // Cria Data URI base64
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/png;base64,${base64}`;

    // Salva o Data URI em um arquivo JSON para importar
    fs.writeFileSync(
      path.join(__dirname, "public/brand/logo-data.json"),
      JSON.stringify({ src: dataUri }),
    );

    console.log("✅ SVG convertido para PNG com sucesso!");
    console.log(`Tamanho PNG: ${(buffer.length / 1024).toFixed(2)} KB`);
    console.log(`Tamanho Data URI: ${(dataUri.length / 1024).toFixed(2)} KB`);
    console.log("✅ Data URI inline criado para uso sem HTTP requests");
  })
  .catch((err) => {
    console.error("❌ Erro ao converter:", err);
    process.exit(1);
  });
