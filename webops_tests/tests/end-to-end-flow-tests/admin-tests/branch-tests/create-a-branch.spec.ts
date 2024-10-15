import { test as base, Page, expect, TestInfo } from '@playwright/test';
import ProjectLogger from '../../../../config/Logger';
import { DashboardPage } from '../../../../pages/DashboardPage';
import { NavigationMenu } from '../../../../pages/NavigationMenu';
import { BranchListPage } from '../../../../pages/admin/branch/BranchListPage';
import { BranchEditPage } from '../../../../pages/admin/branch/BranchEditPage';
import { DataFactory } from '../../../../helpers/DataFactory';

const logger = ProjectLogger.getLogger('CreateBranchTest');

let dashboardPage: DashboardPage;
let navigationMenu: NavigationMenu;
let branchListPage: BranchListPage;
let branchEditPage: BranchEditPage;

interface TestFixtures {
  page: Page;
}

const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    dashboardPage = new DashboardPage(page);
    navigationMenu = new NavigationMenu(page);
    branchListPage = new BranchListPage(page);
    branchEditPage = new BranchEditPage(page);
    await use(page);
  },
});

test.describe('Create and Edit a Branch', () => {
  let branchName: string;

  test.beforeEach(async () => {
    logger.info('Setting up test environment for Create and Edit Branch test');
  });

  test('User can create and edit a branch', async ({ page }) => {
    const testInfo = test.info() as TestInfo;
    const baseURL = testInfo.project.use.baseURL as string;

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
    
    await test.step('User navigates to the Branch management page', async () => {
      logger.info('Selecting Admin dropdown and choosing Branch option');
      await navigationMenu.selectDropdownAndOption('Admin','Branch');
      await expect(page).toHaveURL(/.*\/branch/);
      logger.info('Successfully navigated to the Branch management page');
    });

    await test.step('User initiates branch creation', async () => {
      logger.info('Clicking the "Add New Branch" button');
      await branchListPage.clickAddButton();
      await page.waitForLoadState('load');
      await expect(page).toHaveURL(/.*\/branchEdit/);
      logger.info('Successfully navigated to the Branch Edit page');
    });

    await test.step('User fills in branch details', async () => {
      branchName = `Testing Branch Name - ${DataFactory.generateRandomCode()}`;
      const randomDistributorERPCode = `Testing Distributor - ${DataFactory.generateRandomCode()}`;
      const randomAddressERPCode = `Testing Address - ${DataFactory.generateRandomCode()}`;
      const randomInventoryLocationERPCode = `Testing Inventory - ${DataFactory.generateRandomCode()}`;
      const randomNumberOfDays = DataFactory.generateTwoDigitNumber().toString();
    
      logger.info(`Filling in branch details with the following data:
        Branch Name: ${branchName}
        Distributor ERP Code: ${randomDistributorERPCode}
        Address ERP Code: ${randomAddressERPCode}
        Inventory Location ERP Code: ${randomInventoryLocationERPCode}
        Days Before/After Surgery: ${randomNumberOfDays}`);

        await branchEditPage.setName(branchName);
        await branchEditPage.setDistributorERP(randomDistributorERPCode);
        await branchEditPage.setAddressERPCode(randomAddressERPCode);
        await branchEditPage.setInventoryLocationERPCode(randomInventoryLocationERPCode);
        await branchEditPage.expandAllaccordionHeaders();
        await branchEditPage.selectAllowSalesUsersTransferTo('System Wide Inventory Locations');
        await branchEditPage.selectCaseOutgoingShipmentStatus('Pending');
        await branchEditPage.setDaysAfterSurgery(randomNumberOfDays);
        await branchEditPage.setDaysBeforeSurgery(randomNumberOfDays);
        await branchEditPage.checkAddUsageAtKitCheckIn(true);
        
        logger.info('Verifying entered branch details');
        await expect(branchEditPage.nameInput).toHaveValue(branchName);
        await expect(branchEditPage.distributorERPCodeInput).toHaveValue(randomDistributorERPCode);
        await expect(branchEditPage.addressERPCodeInput).toHaveValue(randomAddressERPCode);
        await expect(branchEditPage.inventoryLocationERPCodeInput).toHaveValue(randomInventoryLocationERPCode);
        logger.info('All branch details verified successfully');
        });
        
        await test.step('User saves the new branch', async () => {
          logger.info('Clicking Save button to create the new branch');
          await branchEditPage.clickSaveButton();
          await expect(page).toHaveURL(/.*\/branch/);
          logger.info('New branch saved successfully and redirected to branch list page');
        });
        
        await test.step('User verifies the new branch is in the list', async () => {
          logger.info('Retrieving list of branch names');
          const branchNames = await branchListPage.getBranchNames();
          logger.info(`Retrieved branch names`);
          expect(branchNames.length).toBeGreaterThan(0);
          
          logger.info(`Checking if newly created branch "${branchName}" is in the list`);
          const isBranchInList = await branchListPage.isBranchNameInList(branchName);
          expect(isBranchInList).toBe(true);
        });
        
        await test.step('User edits the newly created branch', async () => {
          logger.info(`Clicking on the newly created branch: ${branchName}`);
          await branchListPage.clickIfBranchNameIsInList(branchName);
          await branchEditPage.expandAllaccordionHeaders();
        
          logger.info('Setting Time Zone, Language, and Base Currency');
          await branchEditPage.selectTimeZoneLanguageBaseCurrency({
            timeZone: 'America/New_York',
            language: 'en',
            baseCurrency: 'USD'
          });
          
          const street1 = `Street - ${DataFactory.generateRandomCode()}`;
          const street2 = `Street - ${DataFactory.generateRandomCode()}`;
          const phone = DataFactory.generateTenDigitNumber().toString();
          const fax = DataFactory.generateTenDigitNumber().toString();
          const zip = DataFactory.generateFiveDigitNumber().toString();
        
          logger.info(`Setting Contact Info:
            Country: US
            State: US-AK
            Street 1: ${street1}
            Street 2: ${street2}
            City: New York
            Phone: ${phone}
            Fax: ${fax}
            Zip: ${zip}`);
        
          await branchEditPage.setContactInfo({
            country: 'US',
            state: 'US-AK',
            street1: street1,
            street2: street2,
            city: 'New York',
            phone: phone,
            fax: fax,
            zip: zip,
          });
        
          logger.info('Verifying edited branch details');
          await expect(branchEditPage.countryDropdown).toHaveValue('US');
          await expect(branchEditPage.stateDropdown).toHaveValue('US-AK');
          await expect(branchEditPage.cityInput).toHaveValue('New York');
          await expect(branchEditPage.timeZoneDropdown).toHaveValue('America/New_York');
          await expect(branchEditPage.languageDropdown).toHaveValue('en');
          await expect(branchEditPage.baseCurrencyDropdown).toHaveValue('USD');
          logger.info('All edited branch details verified successfully');
        });
        
        await test.step('User saves the edited branch', async () => {
          logger.info('Clicking Save button to update the edited branch');
          await branchEditPage.clickSaveButton();
          logger.info('Edited branch saved successfully');
        });
        });
        })