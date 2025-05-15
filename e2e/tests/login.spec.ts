import { test, expect } from "@playwright/test";
import { login } from "./helpers/authHelpers";

test("login successfully", async ({ page }) => {
  await login(page);
});
