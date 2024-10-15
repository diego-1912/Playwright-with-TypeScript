import { test, expect, Page, TestInfo } from '@playwright/test';
import ProjectLogger from '../../../config/Logger';
import DashboardPage from '../../../pages/DashboardPage';

const logger = ProjectLogger.getLogger('DashboardTest');

test.describe('Dashboard Test Suite', () => {
  let dashboardPage: DashboardPage;
  let baseURL: string;

  test.beforeEach(async ({ page }) => {
    const testInfo = test.info();
    baseURL = testInfo.project.use.baseURL as string;

    logger.info(`Initializing DashboardPage with base URL: ${baseURL}`);
    dashboardPage = new DashboardPage(page);
  });

  test('Verify WebOps logo and dashboard elements', async ({ page }) => {
    logger.info('Starting test: Verify WebOps logo and dashboard elements');
    
    await test.step('Navigate to home page', async () => {
      logger.info(`Navigating to ${baseURL}/homePage`);
      await page.goto(`${baseURL}/homePage`);
      expect(page.url()).toBe(`${baseURL}/homePage`);
      logger.info('Successfully navigated to home page');
    });

    await test.step('Check WebOps logo visibility', async () => {
      const isLogoVisible = await dashboardPage.isWebOpsLogoVisible();
      expect(isLogoVisible, 'WebOps logo is visible').toBeTruthy();
      logger.info('WebOps logo visibility check passed');
    });

  });
});
