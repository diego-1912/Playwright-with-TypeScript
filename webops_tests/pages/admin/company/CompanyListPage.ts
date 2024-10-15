import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class CompanyListPage extends BasePage {
  // Locators
  private readonly addButton: Locator;
  private readonly activeCheckboxTable: Locator;
  private readonly companyNameTable: string;

  constructor(page: Page) {
    super(page);

    this.addButton = page.getByRole('link', { name: '+' });
    this.activeCheckboxTable = page.getByRole('cell', { name: 'Active' });
    this.companyNameTable = "//table[@id='row']//td/a[contains(@onclick, 'editBusinessUnit')]";
  }

  /**
   * Clicks the add button
   */
  async clickAddButton(): Promise<void> {
    await this.handleAction(
      () => this.addButton.click(),
      'Clicked the add button',
      'Failed to click the add button'
    );
  }

  // Method to get all branch names from the table
  async getCompanyNames(): Promise<string[]> {
    try {
      await this.page.waitForSelector(this.companyNameTable, { state: 'visible' });
      const elements = this.page.locator(this.companyNameTable);

      const count = await elements.count();
      console.log('Number of elements found:', count);

      const names: string[] = [];
      for (let i = 0; i < count; i++) {
        const name = await elements.nth(i).innerText();
        console.log('Retrieved name:', name);
        if (name) {
          names.push(name.trim());
        }
      }

      return names.filter(name => name.length > 0);
    } catch (error) {
      console.error('Failed to retrieve branch names', error);
      return [];
    }
  }


   /**
   * Clicks on a company name if it's in the list
   * @param companyName The company name to click
   * @returns Promise<boolean> True if the company was found and clicked, false otherwise
   */
   async clickIfCompanyNameIsInList(companyName: string): Promise<boolean> {
    return this.handleAction(
      async () => {
        // Check if the company name is in the list
        const companyElement = this.page.locator(`//a[contains(text(), '${companyName}')]`);
        const isVisible = await companyElement.isVisible();
  
        if (isVisible) {
          // Click the company name if it's visible
          await companyElement.click();
          return true;
        }
  
        return false;
      },
      `Checked and clicked on company "${companyName}" if found in the list`,
      `Failed to check or click on company "${companyName}" in the list`
    );
  }



}




export class CompanyEditPopup extends BasePage {
   readonly nameInput: Locator;
   readonly descriptionInput: Locator;
    private readonly saveButton: Locator;
    private readonly cancelButton: Locator;
    private readonly closePopupButton: Locator;
    private readonly activeCheckbox: Locator;

    
  
    constructor(page: Page) {
      super(page);
      this.nameInput = page.locator('#businessUnitName');
      this.descriptionInput = page.locator('#businessUnitDescription');
      this.saveButton = page.getByRole('button', { name: ' Save' });
      this.cancelButton = page.getByText('Cancel');
      this.closePopupButton = page.locator('button').filter({ hasText: '×' });
      this.activeCheckbox = page.locator('#businessUnitActive')
    }
  
    async setCompanyDetails(name: string, description: string): Promise<void> {
      await this.handleAction(
        async () => {
          await this.nameInput.fill(name);
          await this.descriptionInput.fill(description);
        },
        `Filled company details: Name - ${name}, Description - ${description}`,
        'Failed to fill company details'
      );
    }
  
    async clickSaveButton(): Promise<void> {
      await this.handleAction(
        () => this.saveButton.click(),
        'Saved company details',
        'Failed to save company details'
      );
    }
  
    async clickCancelButton(): Promise<void> {
      await this.handleAction(
        () => this.cancelButton.click(),
        'Cancelled company details entry',
        'Failed to cancel company details entry'
      );
    }
  
    async clickClosePopupButton(): Promise<void> {
      await this.handleAction(
        () => this.closePopupButton.click(),
        'Closed the popup',
        'Failed to close the popup'
      );
    }
    async checkActiveCheckbox(check: boolean): Promise<void> {
        check ? await this.activeCheckbox.check() : await this.activeCheckbox.uncheck();
      }
  }