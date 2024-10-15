import { expect } from '@playwright/test';
import ProjectLogger from '../../../../config/Logger';

import { ManufacturerPage } from '../../../../pages/admin/manufacturer/ManufacturerPage';
import { ManufacturerEditPage } from '../../../../pages/admin/manufacturer/ManufactuerEditPage';
import { test } from '../../../../Fixtures/Create-Manufacturer-Fixture';

const logger = ProjectLogger.getLogger('CreateManufacturerTest');

test.describe('Create and Edit a Manufacturer', () => {

  let manufacturerPage: ManufacturerPage;
  let manufacturerEditPage: ManufacturerEditPage;

  test.beforeEach(async ({ page }) => {
    logger.info('Setting up test environment');

    // Extract environment variables for URL, username, and password
    const { baseURL } = test.info().project.use as any;

    // Instantiate page objects

    manufacturerPage = new ManufacturerPage(page);
    manufacturerEditPage = new ManufacturerEditPage(page);

    await test.step('User navigates to the login page and logs in', async () => {
      logger.info(`Navigating to ${baseURL}`);
      await page.goto(`${baseURL}/homePage`);
    });
  });

  test('User creates, validates, and edits a Manufacturer', async ({ page, createManufacturer, manufacturerDetails }) => {
    let generatedManufacturerName: string;
    let updatedManufacturerName: string;

    // Step 1: User creates a Manufacturer
    await test.step('User creates a Manufacturer', async () => {
      await createManufacturer(manufacturerDetails);
      generatedManufacturerName = manufacturerDetails.name;
      logger.info(`Manufacturer "${generatedManufacturerName}" created successfully`);
    });

    // Step 2: User validates the creation of the new Manufacturer
    await test.step('User validates the creation of the new Manufacturer', async () => {
      logger.info('Validating the creation of the new Manufacturer');

      logger.info('Retrieving all Manufacturer names');
      const allNames = await manufacturerPage.getAllManufacturerNames();
      logger.info('All Manufacturer Names:', allNames);

      expect(allNames.length).toBeGreaterThan(0); // Assert that there are manufacturer names found
      const isFound = await manufacturerPage.isManufacturerInList(generatedManufacturerName);
      expect(isFound).toBe(true);

      logger.info('Manufacturer creation and validation completed successfully');
    });

    // Step 3: User edits the created Manufacturer
    await test.step('User edits the created Manufacturer', async () => {
      logger.info('Editing the created Manufacturer');

      // Open the manufacturer for editing
      await manufacturerPage.clickIfManufacturerInList(generatedManufacturerName);

      // Update manufacturer details
      updatedManufacturerName = `${generatedManufacturerName}`;
      await manufacturerEditPage.fillManufacturerName(updatedManufacturerName);

      logger.info('Saving the updated Manufacturer');
      await manufacturerEditPage.clickSave();
      await page.waitForLoadState('load');
    });

    // Step 4: User validates the edited Manufacturer
    await test.step('User validates the edited Manufacturer', async () => {
      logger.info('Validating the updated Manufacturer');

      logger.info('Retrieving all Manufacturer names after edit');
      const allNames = await manufacturerPage.getAllManufacturerNames();
      logger.info('All Manufacturer Names:', allNames);

      // Assert that the updated Manufacturer is present
      expect(allNames.length).toBeGreaterThan(0); // Assert that there are manufacturer names found
      const isFound = await manufacturerPage.isManufacturerInList(updatedManufacturerName);
      expect(isFound).toBe(true);

      logger.info('Manufacturer edit and validation completed successfully');
    });
  });
});