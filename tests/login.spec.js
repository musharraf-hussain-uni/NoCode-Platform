// tests/login.spec.js
const { test } = require('@playwright/test');
const LoginPage = require('..//pages/login');  // Import the LoginPage class

test.describe('To test The NoCode Login Form', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test('Successful Login', async () => {
    await loginPage.login('admin@stratesfy.com', 'stratesfy');
    await loginPage.validateLoginSuccess();
  });

  test('Login with Invalid Email', async () => {
    await loginPage.login('@stratesfy.com', 'stratesfy');
  });

  test('Login with Incorrect Password', async () => {
    await loginPage.login('admin@stratesfy.com', 'stra123');
    await loginPage.validateIncorrectPasswordError();
  });

  test('Login with Invalid Email Format', async () => {
    await loginPage.login('invalidemail.com', 'correct-password');
    // Validate email error if needed
  });

  test('Password Reset Link', async () => {
    await loginPage.passwordReset();
  });
});
