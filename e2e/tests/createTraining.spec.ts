import test, { expect } from "@playwright/test";
import { login } from "./helpers/authHelpers";

test("create training", async ({ page }) => {
  // Connexion
  await login(page);

  // Aller sur le calendrier
  await page.goto("/home?tab=calendar", { waitUntil: "networkidle" });
  await expect(page.locator('[data-testid="day-training"]')).toBeVisible();

  // Attendre que le calendrier soit prêt
  const day = page.locator('[data-testid="day-training"]');
  await expect(day).toBeVisible({ timeout: 10000 });
  await day.click();

  // Remplir les informations d'entraînement
  const input = page.locator('[data-testid="input-training"]');
  await input.fill("Entraînement-test-e2e");

  const switchRecurrence = page.locator('[data-testid="recurrence-switch"]');
  await switchRecurrence.click();

  const numberRecurrence = page.locator('[data-testid="recurrence-number"]');
  await numberRecurrence.fill("1");

  const mondayCheckbox = page.locator('[data-testid="monday-select"]');
  await mondayCheckbox.click();

  const savingButton = page.locator('[data-testid="saving-button"]');
  await savingButton.click();

  // Vérification que l'entraînement a été créé
  const trainingItem = page.locator('[data-testid="day-training"]');
  await expect(trainingItem).toContainText("Entraînement-test-e2e", {
    timeout: 10000,
  });
});
