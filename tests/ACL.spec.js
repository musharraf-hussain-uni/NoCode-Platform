// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login'); // Assuming LoginPage handles login logic

test.describe('NoCode Login and ACL Management', () => {
  let page;
  let browserContext; // Store the browser context

  test.beforeAll(async ({ browser }) => {
    browserContext = await browser.newContext(); // Create a new context
    page = await browserContext.newPage(); // Create a new page within the context
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage(); // Use LoginPage's specific logic for login URL
    await loginPage.login('admin@stratesfy.com', 'stratesfy'); // Use LoginPage for login actions
    await page.waitForTimeout(1000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/acl');

  });

  

  test('ACL Page Headers', async () => {
    await page.goto('http://nocode-dev.stratesfy.com/settings/acl');

    const headers = ['Username', 'Email', 'Country', 'Actions'];
    for (const header of headers) {
      const locator = page.locator(`//th[normalize-space()="${header}"]`);
      await expect(locator).toBeVisible();
    }
  });

  test('Add a New User', async () => {
    await page.click("//button[normalize-space()='Add User']");

    await page.fill("input[name='username']", "playwright-test");
    await page.fill("input[name='email']", "playwright@gmail.com");
    await page.fill("input[type='password']", "playwright");
    await page.fill("input[name='firstName']", "playwright");
    await page.fill("input[name='lastName']", "Test");

    // Handle salutation selection (example assuming dropdown)
    await page.click("//button[@role='combobox']//*[name()='svg']");
    await page.click("//span[normalize-space()='Mr.']");

    // Fill remaining user details (assuming all fields are present)
    await page.fill("input[name='phone']", "03322620654");
    await page.fill("input[name='address']", "Gulsitan-e-Juhar, block1, Karachi");
    await page.fill("input[name='street']", "juhar block 1");
    await page.fill("input[name='city']", "Karachi");
    await page.fill("input[name='state']", "Sindh");
    await page.fill("input[name='country']", "Pakistan");

    // Handle role and active status selection (replace with your implementation)
    await page.click("//div[@class='dropdown-heading']//*[name()='svg']");
    await page.click("div[class='dropdown-heading-value'] span"); // Assuming this triggers role selection
    await page.check("button[role='checkbox']"); // Assuming this sets active status

    // Submit
    await page.click("button[type='submit']");
  });

  test('Add User with Invalid Email Format', async () => {
    await page.click("//button[normalize-space()='Add User']");

    await page.fill("input[name='username']", "invalid-test-user");
    await page.fill("input[name='email']", "invalid-email-format");
    await page.fill("input[name='password']", "invalid-password-format");

    await page.click("button[type='submit']");

    const emailError = await page.locator("//p[contains(text(), 'Invalid email address.')]");
    await expect(emailError).toBeVisible();

    await page.waitForSelector("//button[normalize-space()='Cancel']", { state: 'visible' });
    await page.click("//button[normalize-space()='Cancel']");
  });

  test('Add User without Required Fields', async () => {
    await page.goto('http://nocode-dev.stratesfy.com/settings/acl'); 


    await page.waitForSelector("//button[normalize-space()='Add User']", { state: 'visible' });
    await page.click("//button[normalize-space()='Add User']");

    await page.click("button[type='submit']");

    const usernameError = await page.locator("//p[contains(text(),'Username must be at least 2 characters.')]");
    const emailError = await page.locator("//p[contains(text(),'Invalid email address.')]");
    const passwordError = await page.locator("//p[contains(text(), 'Password may not be blank')]");

    await expect(usernameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });
});