
import { test as baseTest } from '@playwright/test';
import { ManufacturerEditPage } from '../pages/admin/manufacturer/ManufactuerEditPage';
import { ManufacturerPage } from '../pages/admin/manufacturer/ManufacturerPage';
import { DataFactory } from '../helpers/DataFactory';
import { Dashboard } from '../pages/DashboardPage';

type ManufacturerDetails = {
  name: string; // Manufacturer name
  caseId: string; // Manufacturer case ID
  erpCode: string; // Manufacturer ERP code
};

// Custom fixtures for testing
// manufacturerDetails: Provides manufacturer details to be used in the test
// createManufacturer: Function to create a manufacturer using the provided details
type MyFixtures = {
  manufacturerDetails: ManufacturerDetails;
  createManufacturer: (manufacturerDetails: ManufacturerDetails) => Promise<void>;
};

export const test = baseTest.extend<MyFixtures>({
  // Fixture to generate manufacturer details dynamically
  manufacturerDetails: async ({}, use) => {
    await use({
      name: `Testing Manufacturer Name - ${DataFactory.generateRandomCode()}`, // Generate a random manufacturer name
      caseId: `Testing Manufacturer Case ID - ${DataFactory.generateRandomCode()}`, // Generate a random manufacturer case ID
      erpCode: `Testing ERP Code - ${DataFactory.generateRandomCode()}` // Generate a random ERP code
    });
  },

  // Fixture to create a manufacturer using the provided details
  createManufacturer: async ({ page }, use) => {
    await use(async (manufacturerDetails) => {
      const dashboardPage = new Dashboard(page); // Initialize dashboard page object
      const manufacturerPage = new ManufacturerPage(page); // Initialize manufacturer page object
      const manufacturerEditPage = new ManufacturerEditPage(page); // Initialize manufacturer edit page object

      // Step to navigate to the Manufacturer page and create a new entry
      await test.step('Navigate to Manufacturer page and create new entry', async () => {
        await dashboardPage.selectManufacturerFromAdminMenu(); // Select manufacturer from the admin dropdown
        await manufacturerPage.clickAddButton(); // Click the add button to create a new manufacturer
        await page.waitForLoadState('networkidle'); // Wait for the page to load completely
      });

      // Step to fill in the Manufacturer details
      await test.step('Fill in Manufacturer details', async () => {
        await manufacturerEditPage.fillManufacturerName(manufacturerDetails.name); // Fill in the manufacturer name
        await manufacturerEditPage.fillManufacturerCaseId(manufacturerDetails.caseId); // Fill in the manufacturer case ID
        await manufacturerEditPage.fillManufacturerErpCode(manufacturerDetails.erpCode); // Fill in the manufacturer ERP code
        await manufacturerEditPage.clickSave(); // Click save to create the manufacturer
      });
    });
  },
});