import { test as base, Page, expect, TestInfo } from '@playwright/test';
import ProjectLogger from '../../../../config/Logger';
import { DashboardPage } from '../../../../pages/DashboardPage';
import { NavigationMenu } from '../../../../pages/NavigationMenu';
import { CompanyListPage } from '../../../../pages/admin/company/CompanyListPage';
import { CompanyEditPopup } from '../../../../pages/admin/company/CompanyListPage';
import { DataFactory } from '../../../../helpers/DataFactory';

const logger = ProjectLogger.getLogger('CreateBranchTest');

let dashboardPage: DashboardPage;
let navigationMenu: NavigationMenu;
let companyListPage: CompanyListPage;
let companyEditPopup: CompanyEditPopup;

interface TestFixtures {
  page: Page;
}

const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    dashboardPage = new DashboardPage(page);
    navigationMenu = new NavigationMenu(page);
    companyListPage = new CompanyListPage(page);
    companyEditPopup = new CompanyEditPopup(page);
    await use(page);
  },
});

test.describe('Create and Edit a Company', () => {

  test.beforeEach(async () => {
    logger.info('Setting up test environment for Create and Edit Branch test');
  });
  test('User can create and edit a company', async ({ page }) => {
    const testInfo = test.info();
    const baseURL = testInfo.project.use.baseURL as string;
    const dashboardPage = new DashboardPage(page);
    const navigationMenu = new NavigationMenu(page);
    const companyListPage = new CompanyListPage(page);
    const companyEditPopup = new CompanyEditPopup(page);
    
    let companyName: string;
    let companyDescription: string;
  
    await test.step('User navigates to the homepage', async () => {
      logger.info(`Navigating to homepage: ${baseURL}/homePage`);
      await page.goto(`${baseURL}/homePage`);
      await expect(page).toHaveURL(`${baseURL}/homePage`);
      logger.info('Successfully navigated to the homepage');
    });
  
    await test.step('User selects a manufacturer from the dropdown', async () => {
      const index = 2;
      logger.info(`Selecting manufacturer at index ${index}`);
      await dashboardPage.selectManufacturerByIndex(index);
      logger.info(`Manufacturer at index ${index} selected`);
    });
    
    await test.step('User navigates to the Company management page', async () => {
      logger.info('Selecting Admin dropdown and choosing Company option');
      await navigationMenu.selectDropdownAndOption('Admin', 'Company');
      await expect(page).toHaveURL(/.*\/businessUnitList/);
      logger.info('Successfully navigated to the Company management page');
    });
  
    await test.step('User initiates company creation', async () => {
      logger.info('Clicking the "Add New Company" button');
      await companyListPage.clickAddButton();
      await page.waitForLoadState('load');
      logger.info('Successfully opened the Company Edit popup');
    });
  
    await test.step('User fills in company details', async () => {
      companyName = `Testing Company Name - ${DataFactory.generateRandomCode()}`;
      companyDescription = `Testing Description - ${DataFactory.generateRandomCode()}`;
  
      logger.info(`Filling in company details with the following data:
        Company Name: ${companyName}
        Company Description: ${companyDescription}
      `);
  
      await companyEditPopup.setCompanyDetails(companyName, companyDescription);
      await companyEditPopup.checkActiveCheckbox(false);
    });
  
    await test.step('User saves the new Company', async () => {
      logger.info('Clicking Save button to create the new company');
      await companyEditPopup.clickSaveButton();
      await expect(page).toHaveURL(/.*\/businessUnitList/);
      logger.info('New Company saved successfully and redirected to company list page');
      await page.waitForLoadState('load');
    });
  
    await test.step('User verifies the new Company is in the list', async () => {
      logger.info('Retrieving list of company names');
      const companyNames = await companyListPage.getCompanyNames();
      logger.info(`Retrieved company names`);
      expect(companyNames.length).toBeGreaterThan(0);
    
    
    })
    
  
    await test.step('User verifies the created Company has the same values', async () => {
      logger.info('Verifying entered Company details');
      logger.info('Company details verified successfully');
      await companyListPage.clickIfCompanyNameIsInList(companyName);
      logger.info(`Verifing the name an drescription`);
      await expect(companyEditPopup.nameInput).toHaveValue("f");
      await expect(companyEditPopup.descriptionInput).toHaveValue(companyDescription);
    });
   
  });
});