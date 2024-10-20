// src/login.js
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[name="email"]';  // Selector for the email field
    this.passwordInput = 'input[name="password"]';  // Selector for the password field
    this.submitButton = 'button[type="submit"]';  // Selector for the submit button
  }

  async gotoLoginPage() {
    await this.page.goto('http://nocode-dev.stratesfy.com/signin');
    await expect(this.page).toHaveTitle(/NoCodePlatform/);
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async validateLoginSuccess() {
    await expect(this.page).toHaveURL('http://nocode-dev.stratesfy.com/signin');
  }

//   async validateInvalidEmailError() {
//     await expect(this.page.locator('li')).toBeVisible();
//     }

  async validateIncorrectPasswordError() {
    await expect(this.page.locator('li')).toBeAttached();
  }

  async passwordReset() {
    await this.page.click('text=Forgot Password?');
    await expect(this.page).toHaveURL('http://nocode-dev.stratesfy.com/forgot-password');
    await this.page.click('text=Back to login');
    await expect(this.page).toHaveURL('http://nocode-dev.stratesfy.com/signin');
  }
}

module.exports = LoginPage;
