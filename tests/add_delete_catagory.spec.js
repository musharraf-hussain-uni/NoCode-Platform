// @ts-check
const {
  test,
  chromium
} = require('@playwright/test');
const LoginPage = require('../pages/login'); // Import the LoginPage class

test.describe("Add new Category and delete", () => {

  let loginPage;

  // Set up a reusable page for all tests
  test.beforeEach(async ({
    page
  }) => {
    // Launch the browser and create a new context and page

    loginPage = new LoginPage(page); // Initialize the login page object
    await loginPage.gotoLoginPage(); // Navigate to the login page
    await loginPage.login('admin@stratesfy.com', 'stratesfy'); // Perform login

    // Wait for login and navigation
    await page.waitForTimeout(1000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/collection-manager');
  });

  // Add new Category
  test("Add new Category", async ({
    page
  }) => {
    // Wait for the '+' button to be visible
    await page.waitForSelector("//button[normalize-space()='+']");
    await page.click("//button[normalize-space()='+']");

    // Type into the 'name' input
    await page.waitForSelector("//input[@id='name']");
    await page.type("//input[@id='name']", "Musharraf 2.0");

    // Select color and click 'Add'
    await page.waitForSelector("//button[@id='color']");
    await page.click("//button[@id='color']");

    // Ensure the Add button is present and click it
    await page.waitForSelector("//button[normalize-space()='Add']");
    await page.click("//button[normalize-space()='Add']");

    await page.waitForSelector(`text=Musharraf 2.0`);

    // Verify the category was added (Optional: add a verification step)
    await page.waitForTimeout(1000); // Small wait to ensure the action is processed
  });

  test.only("Delete Category", async ({
    page
  }) => {
    // Wait for the delete button to be visible
    const category = page.locator("button#radix-\\:R1mjsv9uduba\\:-trigger-49");

    // Wait for the button to be visible
    await category.waitFor({
      state: 'visible',
      timeout: 3000
    });
    await category.click();

    await page.waitForTimeout(1000);
    // Wait for the dropdown (three dots) to be visible before interacting
    const dropdownIcon = page.locator("button#radix-\\:R1mjsv9uduba\\:-trigger-49 svg");
    await dropdownIcon.waitFor({
      state: 'visible',
      timeout: 3000
    });

    // Hover over the dropdown icon
    await dropdownIcon.hover();

    // Wait for 'Delete Category' option and click it
    await page.waitForSelector("text=Delete Category");
    await page.click("text=Delete Category");

    // Optional: confirm the deletion if needed
    await page.waitForTimeout(1000); // Small wait to ensure action is processed
  });


});