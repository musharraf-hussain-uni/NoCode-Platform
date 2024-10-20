const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login');
test.describe("NoCode Collection Manager Form Tests", () =>{
  let loginPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    // await page.goto('http://nocode-dev.stratesfy.com/signin');
    // await expect(page).toHaveTitle(/NoCodePlatform/);

    // await page.type('input[name="email"]', 'admin@stratesfy.com', );
    // await page.type('input[name="password"]', 'stratesfy', );
    // await page.click('button[type="submit"]');

    // await expect(page).toHaveURL('http://nocode-dev.stratesfy.com/signin');
    await page.waitForTimeout(1000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/collection-manager');
  });
  
  // Helper function to configure fields
  async function configureField(page, fieldType, title, name, description) {
    await page.click("button[id='radix-:R1mjsv9uduba:-trigger-35']");
    await page.click("//tr[.//span[contains(text(), 'playwright_test')]]//button[contains(text(), 'Configure Fields')]");
    await page.click('button:has-text("Add field")');
    await page.click(`//span[normalize-space()='${fieldType}']`);
    
    await page.type("//input[@id='title']", title);
    
    // Clear the collection name field
    await page.fill("//input[@id='name']", "");
    await page.type("//input[@id='name']", name);
    
    await page.type("//textarea[@id='description']", description);
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
    await page.click("//button[@id='option-three']"); // Select date option if necessary
    await page.click("button[type='submit']");  
  });

  test('Create a Collection Field with URL', async ({ page }) => {
    await configureField(page, "URL", "URL", "url_", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });
});
