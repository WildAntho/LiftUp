import test, { expect } from "@playwright/test";
import { login } from "./helpers/authHelpers";

test("create training", async ({ page }) => {
  await login(page);
  await page.goto("/home?tab=calendar");

  const day = page.locator('[data-testid="day-training"]');
  await day.click();

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

  await expect(day).toContainText("Entraînement-test-e2e");
});
