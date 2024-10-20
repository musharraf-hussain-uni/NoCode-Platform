// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('..//pages/login');  // Import the LoginPage class

test.describe("NoCode Login and ACL Management", () =>{
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

    await page.waitForTimeout(2000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/acl');
  });

  test('To test the ACL page', async ({ page }) => {

    await page.click("button[id='radix-:Rkvf9uduba:-trigger-users']");

    const headers = ['Username', 'Email', 'Country', 'Actions'];
    for (const header of headers) {
        const locator = page.locator(`//th[normalize-space()="${header}"]`);
        await expect(locator).toBeVisible();
    }

    await page.click("button[id='radix-:Rkvf9uduba:-trigger-roles']");
    await page.setDefaultTimeout(1000);
  });

  // Test to add a new user
  test('Add a new user', async ({page})=>{

    await page.click("//button[normalize-space()='Add User']");
    
    // Fill user information
    await page.type("input[name='username']", "playwright-test");
    await page.type("input[name='email']", "playwright@gmail.com");
    await page.type("input[type='password']", "playwright");
    await page.type("input[name='firstName']", "playwright");
    await page.type("input[name='lastName']", "Test");

    //saluation
    await page.click("//button[@role='combobox']//*[name()='svg']");
    await page.click("//span[normalize-space()='Mr.']");

    // Fill remaining user details
    await page.type("input[name='phone']", "03322620654");
    await page.type("input[name='address']", "Gulsitan-e-Juhar, block1, Karachi");
    await page.type("input[name='street']", "juhar block 1");
    await page.type("input[name='city']", "Karachi");
    await page.type("input[name='state']", "Sindh");
    await page.type("input[name='country']", "Pakistan");


    // Set role and active status
    await page.click("//div[@class='dropdown-heading']//*[name()='svg']");
    await page.click("div[class='dropdown-heading-value'] span");
    await page.check("button[role='checkbox']");

    //submit
    await page.click("button[type='submit']");
    await page.setDefaultTimeout(2000);
  })

   // Negative Test Case 1: Add User with Invalid Email Format
   test('Add User with Invalid Email Format', async ({ page }) => {

    await page.click("//button[normalize-space()='Add User']");
    
    // Input invalid email format
    await page.type("input[name='username']", "invalid-test-user");
    await page.type("input[name='email']", "invalid-email-format");

    // Submit form
    await page.click("button[type='submit']");

    // Verify error message
    const emailError = await page.locator("//p[contains(text(), 'Invalid email address.')]");
    await expect(emailError).toBeVisible();
  });


   // Negative Test Case 2: Add User without Required Fields
   test('Add User without Required Fields', async ({ page }) => {

    await page.click("//button[normalize-space()='Add User']");

    // Leave the required fields (username, email) blank
    await page.click("button[type='submit']");

    // Expect error messages for required fields
    const usernameError = await page.locator("//p[contains(text(),'Username must be at least 2 characters.')]");
    const emailError = await page.locator("//p[contains(text(),'Invalid email address.')]");
    await expect(usernameError).toBeVisible();
    await expect(emailError).toBeVisible();

  });

});
