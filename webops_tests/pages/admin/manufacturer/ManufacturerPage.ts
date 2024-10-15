import { Page } from '@playwright/test';
import { BasePage } from '../../../pages/BasePage';

export class ManufacturerPage extends BasePage {
  // UI Selectors
  private readonly pageTitle = "//div[text()='Manufacturer List']";
  private readonly addButton = '//span[contains(@class, "glyphicon-plus")]';
  private readonly itemsFoundText = "//div[@class='pagebanner']";
  private readonly manufacturerNamesColumn = "//table[@id='row']//tbody//tr//td[@class='col-xs-5 col-sm-4']//a";
  private readonly nextPageButton = "//a[@title='Next']";
  private readonly previousPageButton = "//a[@title='Previous']";

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the Manufacturer List page
   * @param url - The URL of the Manufacturer List page
   */
  async navigateToManufacturerList(url: string): Promise<void> {
    await this.navigateTo(url);
    await this.waitForPageLoad();
  }

  /**
   * Waits for the page to load by checking for the presence of key elements
   */
  private async waitForPageLoad(): Promise<void> {
    await this.handleAction(
      async () => {
        await Promise.all([
          this.page.waitForSelector(this.pageTitle),
          this.page.waitForSelector(this.manufacturerNamesColumn),
        ]);
      },
      'Manufacturer List page loaded successfully',
      'Failed to load Manufacturer List page'
    );
  }

  /**
   * Clicks the Add button to create a new manufacturer
   */
  async clickAddButton(): Promise<void> {
    await this.clickElement(this.addButton);
  }

  /**
   * Retrieves the number of items found
   * @returns The number of items found as a number
   */
  async getItemsFoundCount(): Promise<number> {
    return this.handleAction(
      async () => {
        const text = await this.page.textContent(this.itemsFoundText);
        return text ? parseInt(text.split(' ')[0], 10) : 0;
      },
      'Retrieved items found count',
      'Failed to retrieve items found count'
    );
  }

  /**
   * Navigates to the next page if available
   * @returns A boolean indicating whether the navigation was successful
   */
  async goToNextPage(): Promise<boolean> {
    return this.handleAction(
      async () => {
        const nextButton = await this.page.$(this.nextPageButton);
        if (nextButton && await nextButton.isEnabled()) {
          await nextButton.click();
          await this.waitForPageLoad();
          return true;
        }
        return false;
      },
      'Navigated to the next page',
      'Failed to navigate to the next page'
    );
  }

  /**
   * Navigates to the previous page if available
   * @returns A boolean indicating whether the navigation was successful
   */
  async goToPreviousPage(): Promise<boolean> {
    return this.handleAction(
      async () => {
        const previousButton = await this.page.$(this.previousPageButton);
        if (previousButton && await previousButton.isEnabled()) {
          await previousButton.click();
          await this.waitForPageLoad();
          return true;
        }
        return false;
      },
      'Navigated to the previous page',
      'Failed to navigate to the previous page'
    );
  }

  /**
   * Retrieves the list of manufacturer names from the current page
   * @returns An array of manufacturer names
   */
  async getManufacturerNames(): Promise<string[]> {
    return this.handleAction(
      async () => {
        await this.page.waitForSelector(this.manufacturerNamesColumn, { state: 'visible' });
        const elements = this.page.locator(this.manufacturerNamesColumn);
  
        const count = await elements.count();
        console.log('Number of elements found:', count);
  
        const names: string[] = [];
        for (let i = 0; i < count; i++) {
          const name = await elements.nth(i).innerText(); // Using innerText()
          console.log('Retrieved name:', name); // Debugging step
          if (name) {
            names.push(name.trim());
          }
        }
  
        return names.filter(name => name.length > 0);
      },
      'Retrieved manufacturer names',
      'Failed to retrieve manufacturer names'
    );
  }

  /**
   * Retrieves all manufacturer names from all pages
   * @returns A promise that resolves to an array of all manufacturer names
   */
  async getAllManufacturerNames(): Promise<string[]> {
    return this.handleAction(
      async () => {
        let allNames: string[] = [];
        let hasNextPage = true;

        while (hasNextPage) {
          allNames = allNames.concat(await this.getManufacturerNames());
          hasNextPage = await this.goToNextPage();
        }

        // Reset to the first page after collecting all names
        while (await this.goToPreviousPage()) {}

        return allNames;
      },
      'Retrieved all manufacturer names from all pages',
      'Failed to retrieve all manufacturer names from all pages'
    );
  }

  /**
   * Checks if a specific manufacturer exists in the list
   * @param manufacturerName - The name of the manufacturer to search for
   * @returns A boolean indicating whether the manufacturer was found
   */
  async isManufacturerInList(manufacturerName: string): Promise<boolean> {
    return this.handleAction(
      async () => {
        let hasNextPage = true;

        while (hasNextPage) {
          if ((await this.getManufacturerNames()).includes(manufacturerName)) {
            return true;
          }
          hasNextPage = await this.goToNextPage();
        }

        // Reset to the first page if manufacturer wasn't found
        while (await this.goToPreviousPage()) {}

        return false;
      },
      `Checked if manufacturer "${manufacturerName}" is in the list`,
      `Failed to check if manufacturer "${manufacturerName}" is in the list`
    );
    
  }
  async clickIfManufacturerInList(manufacturerName: string): Promise<boolean> {
    return this.handleAction(
      async () => {
        let hasNextPage = true;
  
        while (hasNextPage) {
          const manufacturerNames = await this.getManufacturerNames();
  
          if (manufacturerNames.includes(manufacturerName)) {
            
            // Click on the manufacturer name
            const manufacturerLocator = this.page.locator(`text=${manufacturerName}`);
            await manufacturerLocator.click();
  
            // Optionally wait for the next page or action to load
            await this.page.waitForLoadState('load');
            return true;  // Manufacturer found and clicked
          }
  
          // Go to the next page if the manufacturer wasn't found on the current page
          hasNextPage = await this.goToNextPage();
        }
  
        // Reset to the first page if the manufacturer wasn't found
        while (await this.goToPreviousPage()) {}
  
       
        return false;  // Manufacturer not found
      },
      `Clicked on manufacturer "${manufacturerName}" if found in the list`,
      `Failed to click on manufacturer "${manufacturerName}" if found in the list`
    );
  }
  
  
}