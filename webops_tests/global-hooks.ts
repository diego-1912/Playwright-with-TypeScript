import { test, chromium } from '@playwright/test';

// Define the base URL globally
let baseURL: string;

// Global hook that runs before all tests
test.beforeAll(async () => {
  const logger = console;

  // Access config values from Playwright configuration
  baseURL = test.info().project.use.baseURL as string;

  if (!baseURL) {
    throw new Error('baseURL is not defined in the Playwright configuration.');
  }

  logger.info('Setting up before all tests...');
  logger.info(`Navigating to: ${baseURL}/startLogin`);

  // Launch the browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto(`${baseURL}/startLogin`, { timeout: 60000, waitUntil: 'networkidle' });
  logger.info('Navigation successful');

  // Close the page and context
  await page.close();
  await context.close();
  await browser.close();
});
// Global hook that runs after all tests
test.afterAll(async ({ browser }) => {
  const logger = console;  // Replace with your actual logger

  logger.info('Cleaning up after all tests...');
  
  // Perform any global cleanup, like closing browser contexts or clearing session data if needed.
  const context = await browser.newContext();
  const page = await context.newPage();

  // Clearing localStorage as a part of global cleanup
  await page.evaluate(() => {
    localStorage.clear();
  });
  
  await page.close();
  await context.close();
  logger.info('Global cleanup completed');
});
