import { Page } from '@playwright/test';
import ProjectLogger from '../config/Logger';
import winston from 'winston';

// Define a global test object that may or may not have a step method
declare const test: { step?: (name: string, fn: () => Promise<any>) => Promise<any> };

export abstract class BasePage {
  protected page: Page;
  protected logger: winston.Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = ProjectLogger.getLogger('BasePage');
  }

  /**
   * Handle Action Method - Encapsulates try-catch for consistent logging
   */
  protected async handleAction<T>(
    action: () => Promise<T>,
    successMessage: string,
    errorMessage: string
  ): Promise<T> {
    try {
      const result = await action();
      this.logger.info(successMessage);
      return result;
    } catch (error) {
      this.logger.error(`${errorMessage}, ${error}`);
      throw error;
    }
  }

  // ------------ Navigation Methods ------------

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.handleAction(
      () => this.page.goto(url),
      `Navigated to ${url}`,
      `Failed to navigate to ${url}`
    );
  }

  // ------------ Element Interaction Methods ------------

  /**
   * Click on an element
   */
  async clickElement(selector: string): Promise<void> {
    await this.handleAction(
      () => this.page.click(selector),
      `Clicked element with selector: ${selector}`,
      `Failed to click element with selector: ${selector}`
    );
  }

  /**
   * Fill an input field
   */
  async fillInput(selector: string, value: string): Promise<void> {
    await this.handleAction(
      async () => {
        await this.page.fill(selector, '');
        await this.page.fill(selector, value);
      },
      `Cleared and filled input ${selector} with value: ${value}`,
      `Failed to clear and fill input ${selector} with value: ${value}`
    );
  }

  /**
   * Hover over an element
   */
  async hoverOverElement(selector: string): Promise<void> {
    await this.handleAction(
      () => this.page.hover(selector),
      `Hovered over element with selector: ${selector}`,
      `Failed to hover over element with selector: ${selector}`
    );
  }

  /**
   * Check a checkbox
   */
  async checkCheckbox(selector: string): Promise<void> {
    await this.handleAction(
      async () => {
        if (!(await this.page.isChecked(selector))) {
          await this.page.check(selector);
        }
      },
      `Checked checkbox with selector: ${selector}`,
      `Failed to check checkbox with selector: ${selector}`
    );
  }

  /**
   * Uncheck a checkbox
   */
  async uncheckCheckbox(selector: string): Promise<void> {
    await this.handleAction(
      async () => {
        if (await this.page.isChecked(selector)) {
          await this.page.uncheck(selector);
        }
      },
      `Unchecked checkbox with selector: ${selector}`,
      `Failed to uncheck checkbox with selector: ${selector}`
    );
  }

  /**
   * Upload a file
   */
  async uploadFile(selector: string, filePath: string): Promise<void> {
    await this.handleAction(
      () => this.page.setInputFiles(selector, filePath),
      `Uploaded file to input with selector: ${selector}`,
      `Failed to upload file to input with selector: ${selector}`
    );
  }


  // ------------ Dropdown Methods ------------

  /**
   * Select an option from a dropdown
   */
  async selectOption(selector: string, option: string): Promise<void> {
    await this.handleAction(
      () => this.page.selectOption(selector, option),
      `Selected option '${option}' from selector: ${selector}`,
      `Failed to select option '${option}' from selector: ${selector}`
    );
  }

  /**
   * Open a dropdown and select an option
   */
  protected async selectDropdownOption(
    dropdownSelector: string,
    optionSelector: string,
    dropdownName: string,
    optionName: string
  ): Promise<void> {
    await this.handleAction(
      async () => {
        await this.clickElement(dropdownSelector);
        await this.clickElement(optionSelector);
      },
      `Selected ${dropdownName} option: ${optionName}`,
      `Failed to select ${dropdownName} option: ${optionName}`
    );
  }

  /**
   * Select a dropdown option by index
   */
  protected async selectDropdownOptionByIndex(
    dropdownSelector: string,
    index: number,
    dropdownName: string
  ): Promise<void> {
    await this.handleAction(
      async () => {
        const options = await this.page.locator(`${dropdownSelector} option`);
        const optionCount = await options.count();
        if (index < 0 || index >= optionCount) {
          throw new Error(`Invalid index: ${index}. The dropdown has ${optionCount} options.`);
        }
        await this.page.selectOption(dropdownSelector, { index: index });
      },
      `Selected ${dropdownName} option at index: ${index}`,
      `Failed to select ${dropdownName} option at index: ${index}`
    );
  }
}