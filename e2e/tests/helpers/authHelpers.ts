import { expect, Page } from "@playwright/test";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

export async function login(page: Page) {
  console.log(process.env.USER_EMAIL);

  // Allez sur la page principale
  await page.goto("/login");

  // Remplir les champs pour se connecter
  const email = page.locator('[data-testid="email-input"]');
  const password = page.locator('[data-testid="password-input"]');
  const connectedButton = page.locator('[data-testid="connection-button"]');
  await email.fill(process.env.USER_EMAIL || "");
  await password.fill(process.env.USER_PASSWORD || "");
  await connectedButton.click();

  // Attendre que l'utilisateur soit bien connecté
  await expect(page.locator('[data-testid="Accueil"]')).toBeVisible({
    timeout: 5000,
  });
}
