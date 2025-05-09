#!/usr/bin/env node

const readline = require("readline");
const { exec } = require("child_process");

const isAuto = process.argv.includes("--auto");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = isAuto
  ? "👉 Nom de la migration à générer automatiquement ? "
  : "👉 Nom de la migration vide à créer ? ";

rl.question(question, (migrationName) => {
  if (!migrationName) {
    console.log("❌ Aucun nom fourni. Annulé.");
    rl.close();
    return;
  }

  const command = isAuto
    ? `npm run migration:generate -- -d src/config/db.ts src/migrations/${migrationName}`
    : `npm run migration:create -- src/migrations/${migrationName}`;

  console.log(
    isAuto
      ? `🚧 Génération automatique de la migration "${migrationName}"...`
      : `🚧 Création de la migration vide "${migrationName}"...`
  );

  console.log(`Commande exécutée : ${command}`);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Erreur :\n${stderr || stdout}`);
    } else {
      console.log(`✅ Migration prête :\n${stdout}`);
    }
    rl.close();
  });
});
