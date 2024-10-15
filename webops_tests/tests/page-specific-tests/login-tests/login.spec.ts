import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login/LoginPage';

test.describe('Login Functionality', () => {
  test('should successfully log in with valid credentials', async ({ page }) => {
    const { baseURL, username, password } = test.info().project.use as any;
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseURL);
    await loginPage.login(username, password);
  });
});
