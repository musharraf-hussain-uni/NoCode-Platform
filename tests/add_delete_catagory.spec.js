// @ts-check
const { test, chromium } = require('@playwright/test');
const LoginPage = require('../pages/login');  // Import the LoginPage class

test.describe("Add new Category and delete", () => {
  let browser;
  let context;
  let page;
  let loginPage;

  // Set up a reusable page for all tests
  test.beforeAll(async () => {
    // Launch the browser and create a new context and page
    browser = await chromium.launch({ headless: false }); // Set headless: true if you prefer headless mode
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page); // Initialize the login page object
    await loginPage.gotoLoginPage(); // Navigate to the login page
    await loginPage.login('admin@stratesfy.com', 'stratesfy'); // Perform login

    // Wait for login and navigation
    await page.waitForTimeout(2000);
    await page.goto('http://nocode-dev.stratesfy.com/settings/collection-manager');
  });

  // Add new Category
  test("Add new Category", async () => {
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

    // Verify the category was added (Optional: add a verification step)
    await page.waitForTimeout(1000); // Small wait to ensure the action is processed
  });

  test("Delete Category", async ({page})=>{
    await page.locator("//span[text()='Musharraf 2.0']/ancestor::tr");
    
    // Hover over the three dots icon using the CSS selector
    await page.hover('#radix-\\:R1mjsv9uduba\\:-trigger-37 > a > svg > path');



  })
  // Clean up after all tests
  test.afterAll(async () => {
    await context.close(); // Close the context
    await browser.close();  // Close the browser
  });
});
