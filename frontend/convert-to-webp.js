// convert-to-webp.js
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputDir = "./public/exercices/men"; // adapte si besoin

fs.readdirSync(inputDir).forEach((file) => {
  if (path.extname(file) === ".png") {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(
      inputDir,
      `${path.basename(file, ".png")}.webp`
    );

    sharp(inputPath)
      .webp({ quality: 80 }) // ajuste la qualité si tu veux
      .toFile(outputPath)
      .then(() => console.log(`✅ ${file} → ${outputPath}`))
      .catch((err) => console.error(`❌ Erreur avec ${file}:`, err));
  }
});
