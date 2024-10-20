// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('..//pages/login');  // Import the LoginPage class

test.describe("NoCode Collection Manager Form Tests", () =>{
  let loginPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    // await page.goto('http://nocode-dev.stratesfy.com/signin');
    // await expect(page).toHaveTitle(/NoCodePlatform/);

    // await page.type('input[name="email"]', 'admin@stratesfy.com');
    // await page.type('input[name="password"]', 'stratesfy');
    // await page.click('button[type="submit"]');

    // await expect(page).toHaveURL('http://nocode-dev.stratesfy.com/signin');
    await page.waitForTimeout(1000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/collection-manager');

  });
  
  // Test case: Create a new collection
  test('To test the + Create Collection', async ({page}) => {
    
    await page.click("//button[normalize-space()='Create collection']");

    // Fill collection details
    await page.type("//input[@id='title']", "palywright automate");
    //Collection name 
    await page.click("//input[@id='name']");
    await page.press("//input[@id='name']", "Control+A");
    await page.press("//input[@id='name']", "Backspace");
    await page.type("//input[@id='name']", "play_test1");

    //Categries
    await page.type("input[type='text']", "musharraf");
    //description
    await page.type("//textarea[@id='description']", "Playwright automation of the collection manager with test script");

    // Enable options
    await page.check("//button[@id='softDelete']");
    await page.check("//button[@id='useVersionControl']");

    //submit
    await page.click("//button[normalize-space()='Submit']");

  });

  // Negative Test Case 1: Create a collection without a display name
  test('Should not allow creating a collection without a display name', async ({ page }) => {

    await page.click("//button[normalize-space()='Create collection']");
    await page.click("//input[@id='title']");
    await page.click("//button[normalize-space()='Submit']");
    
    // Verify error message for display name
    const displayNameError = await page.locator("//p[contains(text(), 'Please enter a collection display name.')]");
    await expect(displayNameError).toBeVisible();
    
  });

  // Negative Test Case 2: Create a collection without a collection name
  test('Should not allow creating a collection without a collection name', async ({ page }) => {

    await page.click("//button[normalize-space()='Create collection']");
    await page.type("//input[@id='title']", "Test Collection");

    // Leave the collection name field blank
    await page.click("//input[@id='name']");
    await page.press("//input[@id='name']", "Control+A");
    await page.press("//input[@id='name']", "Backspace");
   await page.click("//button[normalize-space()='Submit']");

    // Verify error message for collection name
    const collectionNameError = await page.locator("//p[contains(text(), 'Please enter a collection name.')]");
    await expect(collectionNameError).toBeVisible();

  });

  // Negative Test Case 3: Create a collection with an invalid name
  test('Should not allow creating a collection with invalid characters in the collection name', async ({ page }) => {

    await page.click("//button[normalize-space()='Create collection']");
    await page.type("//input[@id='title']", "Test Collection");
    await page.click("//input[@id='name']");
    await page.press("//input[@id='name']", "Control+A");
    await page.press("//input[@id='name']", "Backspace");
    await page.type("//input[@id='name']", "123@collection#");
    await page.click("//button[normalize-space()='Submit']");

    // Verify error message for invalid collection name
    const invalidCollectionNameError = await page.locator("//p[contains(text(), 'Collection name should start with a letter and only contain letters, numbers, or underscores.')]");
  });
});



