import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import ProjectLogger from '../../config/Logger';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly logInButton: Locator;
  private readonly errorMessage: string;
  private readonly resetPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logger = ProjectLogger.getLogger('LoginPage');
    this.usernameInput = page.locator('input[name="loginName"]');
    this.passwordInput = page.locator('#txtpassword');
    this.logInButton = page.getByRole('button', { name: 'Login' });
    this.resetPasswordLink = page.getByRole('link', { name: 'Reset Password' });
    this.errorMessage = 'li:has-text("Unknown Username or Password")';
  }

  /**
   * Navigate to the login page
   * @param baseURL The base URL of the application
   */
  async navigateTo(baseURL: string): Promise<void> {
    await this.handleAction(
      () => this.page.goto(baseURL, { timeout: 900000 }),
      `Navigated to login page at ${baseURL}`,
      `Failed to navigate to login page at ${baseURL}`
    );
  }

  /**
   * Perform login action
   * @param username The username to log in with
   * @param password The password to log in with
   */
  async login(username: string, password: string): Promise<void> {
    await this.handleAction(
      async () => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.logInButton.click();
      },
      `Logged in with username: ${username}`,
      `Failed to log in with username: ${username}`
    );
  }

  /**
   * Check if the error message is visible
   * @returns A boolean indicating whether the error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return this.handleAction(
      async () => {
        const errorLocator = this.page.locator(this.errorMessage);
        return await errorLocator.isVisible();
      },
      'Checked for error message visibility',
      'Failed to check for error message visibility'
    );
  }

  /**
   * Get the error message locator
   * @returns The Locator for the error message
   */
  getErrorMessageLocator(): Locator {
    return this.page.locator(this.errorMessage);
  }

  /**
   * Click the reset password link
   */
  async clickResetPasswordLink(): Promise<void> {
    await this.handleAction(
      async () => {
        await this.resetPasswordLink.click();
      },
      'Clicked reset password link',
      'Failed to click reset password link'
    );
  }

  /**
   * Get the text of the error message
   * @returns The text content of the error message
   */
  async getErrorMessageText(): Promise<string> {
    return this.handleAction(
      async () => {
        const errorLocator = this.page.locator(this.errorMessage);
        return await errorLocator.textContent() || '';
      },
      'Retrieved error message text',
      'Failed to retrieve error message text'
    );
  }

  /**
   * Check if the login button is enabled
   * @returns A boolean indicating whether the login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return this.handleAction(
      async () => {
        return await this.logInButton.isEnabled();
      },
      'Checked if login button is enabled',
      'Failed to check if login button is enabled'
    );
  }

  /**
   * Clear both username and password fields
   */
  async clearLoginFields(): Promise<void> {
    await this.handleAction(
      async () => {
        await this.usernameInput.fill('');
        await this.passwordInput.fill('');
      },
      'Cleared login fields',
      'Failed to clear login fields'
    );
  }
}