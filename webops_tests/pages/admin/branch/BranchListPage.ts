import { Page,  Locator} from '@playwright/test';
import { BasePage } from '../../BasePage';

export class BranchListPage extends BasePage {
  // Locators
  readonly searchInput: Locator;
  readonly searchOptionsButton: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;
  readonly activeCheckbox: Locator;
  readonly branchNamesTable: string;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.getByLabel('Name');
    this.searchButton = page.getByRole('button', { name: ' Search' });
    this.searchOptionsButton = page.getByText('Search Options');
    this.addButton = page.locator('form[name="branchsearchForm"]').getByRole('link').first();
    this.activeCheckbox = page.getByRole('cell', { name: 'Active' });
    this.branchNamesTable = '//table[@id="row"]//tbody/tr/td[1]//a';
  }

  // Method to search for a branch by name
  async searchBranch(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  // Method to click the add button
  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }

  // Method to get all branch names from the table
  async getBranchNames(): Promise<string[]> {
    try {
      await this.page.waitForSelector(this.branchNamesTable, { state: 'visible' });
      const elements = this.page.locator(this.branchNamesTable);

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

  // Method to check if a branch name is in the list
  async isBranchNameInList(branchName: string): Promise<boolean> {
    return this.handleAction(
      async () => {
        const branchNames = await this.getBranchNames();
        return branchNames.includes(branchName);
      },
      `Checked if branch "${branchName}" is in the list`,
      `Failed to check if branch "${branchName}" is in the list`
    );
  }

  // Method to click on a branch name if it's in the list
  async clickIfBranchNameIsInList(branchName: string): Promise<boolean> {
    return this.handleAction(
      async () => {
        const branchNames = await this.getBranchNames();

        if (branchNames.includes(branchName)) {
          const branchLocator = this.page.locator(`//a[contains(text(), '${branchName}')]`);
          await branchLocator.click();
          return true; // Branch found and clicked
        }

        return false; // Branch not found
      },
      `Clicked on branch "${branchName}" if found in the list`,
      `Failed to click on branch "${branchName}" if found in the list`
    );
  }
}


