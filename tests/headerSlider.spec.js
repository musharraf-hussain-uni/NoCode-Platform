const { test, expect } = require('@playwright/test');
const LoginPage = require('..//pages/login');  // Import the LoginPage class

test.describe("NoCode Login and ACL Management", () =>{
    let loginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    //   await page.goto('http://nocode-dev.stratesfy.com/signin');
    //   await expect(page).toHaveTitle(/NoCodePlatform/);
  
    //   await page.type('input[name="email"]', 'admin@stratesfy.com');
    //   await page.type('input[name="password"]', 'stratesfy');
    //   await page.click('button[type="submit"]');
    //   await expect(page).toHaveURL('http://nocode-dev.stratesfy.com/signin');
  
      await page.waitForTimeout(2000);
    });

   

  // Positive Test Case - Successful Navigation and Page Access
  test.only('Positive: Successful navigation through Header Slider and Office Group', async ({ page }) => {
    
    // Click on the header slider with text "Musharraf"
    await page.click("//a[normalize-space()='Musharraf']");
    
    // Click on the group with text "Office Group"
    await page.click("(//button[normalize-space()='Office Group'])[1]");
    
    // Click on the dropdown in Office Group
    await page.click("//button[@id='radix-:r8:']//*[name()='svg']");

    // Click through all the pages in the dropdown
    const pages = ['Employee', 'Department', 'Project', 'Salary', 'Attendance', 'Leave', 'Training', 'Evaluation', 'Position'];
    
    for (const pageName of pages) {
      await page.click(`//span[normalize-space()='${pageName}']`);
      await expect(page).toHaveURL(new RegExp(`${pageName.toLowerCase()}`)); // Assuming each page URL matches its name
      await page.goBack();  // Go back after each page click to return to the dropdown
    }
  });

  // Negative Test Case 1 - Incorrect header text
  test('Negative: Clicking on non-existent header slider text', async ({ page }) => {
    
    // Try to click a non-existent header slider text (Expect it to fail)
    const incorrectSelector = "//a[normalize-space()='NonExistentHeaderText']";
    const isElementVisible = await page.isVisible(incorrectSelector);
    expect(isElementVisible).toBeFalsy();  // Expect the element not to be visible
    
    try {
      await page.click(incorrectSelector);
    } catch (error) {
      console.log("Error caught as expected: Element not found.");
    }
  });

  // Negative Test Case 2 - Dropdown not expanding
  test('Negative: Dropdown does not expand in Office Group', async ({ page }) => {
    
    // Click on the header slider with text "Musharraf"
    await page.click("//a[normalize-space()='Musharraf']");
    
    // Click on the group with text "Office Group"
    await page.click("(//button[normalize-space()='Office Group'])[1]");

    // Try to click the dropdown (incorrect selector for testing negative case)
    const incorrectDropdown = "//button[@id='radix-:r8:']//*[name()='nonexistent-svg']";
    try {
      await page.click(incorrectDropdown);
    } catch (error) {
      console.log("Dropdown expansion failed as expected.");
    }
  });

  // Negative Test Case 3 - Page navigation failure
  test('Negative: Failing to navigate to the pages in dropdown', async ({ page }) => {
    
    // Click on the header slider with text "Musharraf"
    await page.click("//a[normalize-space()='Musharraf']");
    
    // Click on the group with text "Office Group"
    await page.click("(//button[normalize-space()='Office Group'])[1]");
    
    // Click on the dropdown in Office Group
    await page.click("//button[@id='radix-:r8:']//*[name()='svg']");

    // Try to click non-existent pages in the dropdown (Expect these to fail)
    const nonexistentPages = ['NonexistentPage1', 'NonexistentPage2'];
    
    for (const pageName of nonexistentPages) {
      try {
        await page.click(`//span[normalize-space()='${pageName}']`);
      } catch (error) {
        console.log(`Error caught as expected: Failed to navigate to ${pageName}.`);
      }
    }
  });

});