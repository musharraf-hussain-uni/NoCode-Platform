// @ts-check
const {
  test,
  expect
} = require('@playwright/test');
const LoginPage = require('../pages/login');

test.describe('NoCode Login and ACL Management', () => {
  let page;
  let browserContext;

  test.beforeAll(async ({
    browser
  }) => {
    browserContext = await browser.newContext();
    page = await browserContext.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('admin@stratesfy.com', 'stratesfy');
    await page.waitForTimeout(1000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/acl');
  });

  test('ACL Page Headers', async () => {
    const headers = ['Username', 'Email', 'Country', 'Actions'];
    for (const header of headers) {
      await expect(page.locator(`//th[normalize-space()="${header}"]`)).toBeVisible();
    }
  });

  test('Add a New User', async () => {
    await addUser({
      username: 'playwright-test',
      email: 'playwright@gmail.com',
      password: 'playwright',
      firstName: 'playwright',
      lastName: 'Test',
      phone: '03322620654',
      address: 'Gulsitan-e-Juhar, block1, Karachi',
      street: 'juhar block 1',
      city: 'Karachi',
      state: 'Sindh',
      country: 'Pakistan',
      salutation: 'Mr.',
    });
  });

  test('Add User with Invalid Email Format', async () => {
    await addUser({
      username: 'invalid-test-user',
      email: 'invalid-email-format',
      password: 'invalid-password-format',
    });

    await expect(page.locator("//p[contains(text(), 'Invalid email address.')]")).toBeVisible();
    await page.click("//button[normalize-space()='Cancel']");
  });

  test('Add User without Required Fields', async () => {
    await page.goto('http://nocode-dev.stratesfy.com/settings/acl');
    await page.click("//button[normalize-space()='Add User']");
    await page.click("button[type='submit']");

    await expect(page.locator("//p[contains(text(),'Username must be at least 2 characters.')]")).toBeVisible();
    await expect(page.locator("//p[contains(text(),'Invalid email address.')]")).toBeVisible();
    await expect(page.locator("//p[contains(text(), 'Password may not be blank')]")).toBeVisible();
  });

  // Helper function to add a user
  async function addUser({
    username = '',
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    phone = '',
    address = '',
    street = '',
    city = '',
    state = '',
    country = '',
    salutation = ''
  }) {
    await page.click("//button[normalize-space()='Add User']");

    if (username) await page.fill("input[name='username']", username);
    if (email)
      await page.fill("input[name='email']", email);
    if (password) await page.fill("input[type='password']", password);
    if (firstName) await page.fill("input[name='firstName']", firstName);
    if (lastName) await page.fill("input[name='lastName']", lastName);

    if (salutation) {
      await page.click("//button[@role='combobox']//*[name()='svg']");
      await page.click(`//span[normalize-space()='${salutation}']`);
    }

    if (phone) await page.fill("input[name='phone']", phone);
    if (address) await page.fill("input[name='address']", address);
    if (street) await page.fill("input[name='street']", street);
    if (city) await page.fill("input[name='city']", city);
    if (state) await page.fill("input[name='state']", state);
    if (country) await page.fill("input[name='country']", country);

    await page.click("//div[@class='dropdown-heading']//*[name()='svg']");
    await page.click("div[class='dropdown-heading-value'] span"); // Assuming this triggers role selection
    await page.check("button[role='checkbox']"); // Assuming this sets active status

    await page.click("button[type='submit']");
  }
});