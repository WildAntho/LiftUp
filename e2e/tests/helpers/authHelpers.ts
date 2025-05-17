import { expect, Page } from "@playwright/test";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

export async function login(page: Page) {
  const emailValue = process.env.USER_EMAIL || "";
  const passwordValue = process.env.USER_PASSWORD || "";

  // Vérifier que les variables d'environnement sont bien définies
  if (!emailValue || !passwordValue) {
    throw new Error(
      "USER_EMAIL et USER_PASSWORD doivent être définis dans le fichier .env"
    );
  }

  // Allez sur la page principale
  await page.goto("/login");

  // Attendre que les champs soient prêts
  const email = page.locator('[data-testid="email-input"]');
  const password = page.locator('[data-testid="password-input"]');
  const connectedButton = page.locator('[data-testid="connection-button"]');

  // Vérifier que les champs sont bien visibles
  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
  await expect(connectedButton).toBeVisible();

  // Remplir les champs
  await email.fill(emailValue);
  await password.fill(passwordValue);

  // Attendre que le bouton soit cliquable
  await expect(connectedButton).toBeEnabled();
  await connectedButton.click();

  //  Vérifie que l'utilisateur est bien connecté
  await expect(page.locator('[data-testid="Accueil"]')).toBeVisible({
    timeout: 15000,
  });
}
