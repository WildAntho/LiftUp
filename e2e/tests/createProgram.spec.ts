// import test, { expect } from "@playwright/test";
// import { login } from "./helpers/authHelpers";

// test("create program", async ({ page }) => {
//   await login(page);
//   await page.goto("/home?tab=program");

//   const createButton = page.locator('[data-testid="create-program-button"]');
//   await createButton.click();

//   const continueButton = page.locator('[data-testid="continue-button"]');
//   await continueButton.click();

//   const programTitle = page.locator('[data-testid="program-title"]');
//   await programTitle.fill("Programme E2E Test Titre");

//   const programDescription = page.locator(
//     '[data-testid="program-description"]'
//   );
//   await programDescription.fill("Programme E2E Test Description");

//   const programDuration = page.locator('[data-testid="program-duration"]');
//   await programDuration.fill("6");

//   await continueButton.click();

//   const programCreateTitle = page.locator(
//     '[data-testid="active-title-program"]'
//   );
//   const duration = page.locator('[data-testid="duration-test"]');
//   await expect(programCreateTitle).toContainText("Programme E2E Test Titre");
//   await expect(duration).toContainText("6");
// });
