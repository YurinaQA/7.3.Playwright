const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password, incorrectPassword} = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("h2")).toContainText("Моё обучение");
});

test("UnSuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(incorrectPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
});