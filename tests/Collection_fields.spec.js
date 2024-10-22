const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login');

test.describe("NoCode Collection Manager Form Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('admin@stratesfy.com', 'stratesfy');
    await page.waitForTimeout(2000); // Increased timeout to ensure elements are loaded
    await page.goto('http://nocode-dev.stratesfy.com/settings/collection-manager');
  });

  // Helper function to configure fields
  async function configureField(page, fieldType, title, name, description) {
    await page.waitForSelector("button[id='radix-:R1mjsv9uduba:-trigger-35']", { state: 'visible' });
    await page.click("button[id='radix-:R1mjsv9uduba:-trigger-35']");
    await page.click("//tr[.//span[contains(text(), 'playwright_test')]]//button[contains(text(), 'Configure Fields')]");
    await page.click('button:has-text("Add field")');
    await page.click(`//span[normalize-space()='${fieldType}']`);
    await page.fill("//input[@id='title']", title); // Changed to page.fill for consistency
    await page.fill("//input[@id='name']", name);
    await page.fill("//textarea[@id='description']", description);
    await page.click("button[type='submit']");
  }

  // Test cases
  test('Create a Collection Field with Single Line Text', async ({ page }) => {
    await configureField(page, "Single Line Text", "login test", "login_test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });

  test('Create a Collection Field with Long Text', async ({ page }) => {
    await configureField(page, "Long Text", "Long text", "long_test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });

  test('Create a Collection Field with Checkbox', async ({ page }) => {
    await configureField(page, "Checkbox", "Select test", "select_test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });

  test('Create a Collection Field with DateTime', async ({ page }) => {
    await configureField(page, "Datetime", "date test", "date_test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    await page.click("//button[@id='option-three']");
    await page.click("button[type='submit']");
  });

  test('Create a Collection Field with URL', async ({ page }) => {
    await configureField(page, "URL", "URL", "url_", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });
});
