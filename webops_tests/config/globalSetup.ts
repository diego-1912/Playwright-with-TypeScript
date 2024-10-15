import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import ProjectLogger from '../config/Logger';

const logger = ProjectLogger.getLogger('GlobalSetup');

async function globalSetup(config: FullConfig) {
  const { baseURL, username, password } = config.projects[0].use as any;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  try {
    logger.info(`Navigating to ${baseURL}/startLogin`);
    await loginPage.navigateTo(`${baseURL}/startLogin`);

    logger.info(`Attempting to login with username: ${username}`);
    await loginPage.login(username, password);
    await page.waitForLoadState('load');
    logger.info('Logged in successfully');
    await loginPage.navigateTo(`${baseURL}/homePage`);

    // Store the authentication state
    await context.storageState({ path: 'auth-state.json' });
  } catch (error) {
    logger.error('Failed to perform global setup:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;