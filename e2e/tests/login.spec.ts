import { test, expect } from "@playwright/test";
import { login } from "./helpers/authHelpers";

test("login successfully", async ({ page }) => {
  await login(page);
});

test("login wrong password or email", async ({ page }) => {
  // Allez sur la page principale
  await page.goto("/login");

  // Remplir les champs pour se connecter
  const email = page.locator('[data-testid="email-input"]');
  const password = page.locator('[data-testid="password-input"]');
  const connectedButton = page.locator('[data-testid="connection-button"]');
  await email.fill("wrong-mail");
  await password.fill("wrong-password");
  await connectedButton.click();

  await expect(
    page.getByText("Adresse e-mail ou mot de passe incorrect.").nth(0)
  ).toBeVisible();
});
