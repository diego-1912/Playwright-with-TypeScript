import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class BranchEditPage extends BasePage {
  // Locators
  readonly nameInput: Locator;
  readonly distributorERPCodeInput: Locator;
  readonly addressERPCodeInput: Locator;
  readonly inventoryLocationERPCodeInput: Locator;
  readonly adminSettingsModulesAccordion: Locator;
  readonly daysBeforeSurgeryMinInput: Locator;
  readonly daysAfterSurgeryMinInput: Locator;
  readonly allowSalesUsersTransferToDropdown: Locator;
  readonly caseOutgoingShipmentStatusDropdown: Locator;
  readonly contactAccordion: Locator;
  readonly emailInput: Locator;
  readonly countryDropdown: Locator;
  readonly stateDropdown: Locator;
  readonly street1Input: Locator;
  readonly street2Input: Locator;
  readonly cityInput: Locator;
  readonly phoneInput: Locator;
  readonly faxInput: Locator;
  readonly zipInput: Locator;
  readonly inventoryLoanerBankAccordion: Locator;
  readonly loanerBankCheckbox: Locator;
  readonly localizationAccordion: Locator;
  readonly timeZoneDropdown: Locator;
  readonly languageDropdown: Locator;
  readonly baseCurrencyDropdown: Locator;
  readonly alertsAccordion: Locator;
  readonly advanceExpirationCutoffInput: Locator;
  readonly advanceExpirationWarningInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  readonly createReturnTransferUsageCheckbox: Locator;
  readonly addUsageAtKitCheckInCheckbox: Locator;
  readonly caseNotesOnShipmentPODCheckbox: Locator;
  readonly emailAlertsCheckbox: Locator;
  readonly expirationDateReceivingCheckbox: Locator;
  readonly orderIntegrationCheckbox: Locator;
  readonly shipmentScanCheckbox: Locator;
  readonly scanSoundsCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByLabel('Name');
    this.distributorERPCodeInput = page.getByLabel('Distributor ERP Code');
    this.addressERPCodeInput = page.getByLabel('Address ERP Code');
    this.inventoryLocationERPCodeInput = page.getByLabel('Inventory Location ERP Code');
    this.adminSettingsModulesAccordion = page.getByRole('link', { name: 'Admin Settings / Modules ' });
    this.daysBeforeSurgeryMinInput = page.getByLabel('Days before Surgery Minimum 0');
    this.daysAfterSurgeryMinInput = page.getByLabel('Days after Surgery Minimum 0');
    this.allowSalesUsersTransferToDropdown = page.getByLabel('Allow Sales Users Transfer To');
    this.caseOutgoingShipmentStatusDropdown = page.getByLabel('Case Outgoing Shipment Status');
    this.contactAccordion = page.getByRole('link', { name: 'Contact ' });
    this.emailInput = page.locator('input[name="valuep"]');
    this.countryDropdown = page.getByLabel('Country');
    this.stateDropdown = page.getByLabel('State');
    this.street1Input = page.getByLabel('Street 1')
    this.street2Input = page.getByLabel('Street 2');
    this.cityInput = page.getByLabel('City');
    this.phoneInput = page.getByLabel('Phone');
    this.faxInput = page.getByLabel('Fax');
    this.zipInput = page.getByLabel('Zip');
    this.inventoryLoanerBankAccordion = page.getByRole('link', { name: 'Inventory / Loaner Bank ' });
    this.loanerBankCheckbox = page.getByLabel('Loaner Bank', { exact: true });
    this.localizationAccordion = page.getByRole('link', { name: 'Localization ' });

    this.timeZoneDropdown = page.getByLabel('Time Zone');
    this.languageDropdown = page.getByLabel('Language');
    this.baseCurrencyDropdown = page.getByLabel('Base Currency');
    this.alertsAccordion =  page.getByRole('link', { name: 'Alerts ' });
    this.advanceExpirationCutoffInput = page.getByLabel('Advance Expiration Cutoff');
    this.advanceExpirationWarningInput =  page.getByLabel('Advance Expiration Warning');
    this.saveButton = page.getByRole('button', { name: ' Save' });
    this.cancelButton =  page.getByRole('button', { name: ' Cancel' });

    this.createReturnTransferUsageCheckbox = page.locator('.multibox > .form-control').first();
    this.addUsageAtKitCheckInCheckbox = page.locator('.col-xs-12 > div:nth-child(3) > .form-control');
    this.caseNotesOnShipmentPODCheckbox = page.locator('div:nth-child(4) > .form-control');
    this.emailAlertsCheckbox = page.locator('div:nth-child(5) > .form-control');
    this.expirationDateReceivingCheckbox = page.locator('div:nth-child(6) > .form-control');
    this.orderIntegrationCheckbox = page.locator('div:nth-child(7) > .form-control');
    this.shipmentScanCheckbox =page.locator('div:nth-child(8) > .form-control');
    this.scanSoundsCheckbox = page.locator('div:nth-child(9) > .form-control');
  }

  async expandAllaccordionHeaders(): Promise<void> {
    const links = [
      this.adminSettingsModulesAccordion,
      this.contactAccordion,
      this.inventoryLoanerBankAccordion,
      this.alertsAccordion,
      this.localizationAccordion
    ];
    for (const link of links) {
      await link.click();
    }
  }
  
  // Methods for interacting with elements
  async setName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }
  
  async setDistributorERP(code: string): Promise<void> {
    await this.distributorERPCodeInput.fill(code);
  }
  
  async setAddressERPCode(code: string): Promise<void> {
    await this.addressERPCodeInput.fill(code);
  }
  
  async setInventoryLocationERPCode(code: string): Promise<void> {
    await this.inventoryLocationERPCodeInput.fill(code);
  }
  
  async setDistributorAddressInventoryLocationERPCode(type: 'distributor' | 'address' | 'inventoryLocation', code: string): Promise<void> {
    const selectorMap = {
      distributor: this.distributorERPCodeInput,
      address: this.addressERPCodeInput,
      inventoryLocation: this.inventoryLocationERPCodeInput
    };
    await selectorMap[type].fill(code);
  }
  
  async setDaysBeforeSurgery(days: string): Promise<void> {
    await this.daysBeforeSurgeryMinInput.fill(days);
  }
  
  async setDaysAfterSurgery(days: string): Promise<void> {
    await this.daysAfterSurgeryMinInput.fill(days);
  }
  
  async selectAllowSalesUsersTransferTo(option: 'Linked Inventory Locations' | 'Local Branch Inventory Locations' | 'System Wide Inventory Locations'): Promise<void> {
    const optionMapping = {
      'Linked Inventory Locations': '1',
      'Local Branch Inventory Locations': '2',
      'System Wide Inventory Locations': '3'
    };
    await this.allowSalesUsersTransferToDropdown.selectOption(optionMapping[option]);
  }
  
  async selectCaseOutgoingShipmentStatus(option: 'Pending' | 'Shipped' | 'Delivered' | 'Returned' | 'Cancelled'): Promise<void> {
    const optionMapping = {
      'Pending': '1',
      'Shipped': '2',
      'Delivered': '3',
      'Returned': '5',
      'Cancelled': '6'
    };
    await this.caseOutgoingShipmentStatusDropdown.selectOption(optionMapping[option]);
  }
  
  async setContactInfo({ country, state, street1, street2, city, phone, fax, zip }: {
    country?: 'US' | 'FR',
    state?: 'US-AL'|'US-AK'|'US-AZ'|'US-AR'|'US-CA'|'US-CO'|'US-CT'|'US-DE'|'US-FL'|'US-GA'|'US-HI'|'US-ID'|'US-IL'|'US-IN'|'US-IA'|'US-KS'|'US-KY',
    street1?: string,
    street2?: string,
    city?: string,
    phone?: string,
    fax?: string,
    zip?: string
  }): Promise<void> {
    if (country) await this.countryDropdown.selectOption(country);
    if (state) await this.stateDropdown.selectOption(state);
    if (street1) await this.street1Input.fill(street1);
    if (street2) await this.street2Input.fill(street2);
    if (city) await this.cityInput.fill(city);
    if (phone) await this.phoneInput.fill(phone);
    if (fax) await this.faxInput.fill(fax);
    if (zip) await this.zipInput.fill(zip);
  }
  
  async checkLoanerBank(check: boolean): Promise<void> {
    check ? await this.loanerBankCheckbox.check() : await this.loanerBankCheckbox.uncheck();
  }
  
  async selectTimeZoneLanguageBaseCurrency({ timeZone, language, baseCurrency }: {
    timeZone?: 'America/New_York'| 'America/Chicago' |'America/Denver' | 'America/Phoenix'| 'America/Los_Angeles'| 'America/Anchorage'| 'Pacific/Honolulu'| 'America/Montreal'| 'America/Winnipeg'|'America/Edmonton' | 'America/Vancouver',
    language?: 'fr' | 'en',
    baseCurrency?: 'USD' | 'EUR'
  }): Promise<void> {
    if (timeZone) await this.timeZoneDropdown.selectOption(timeZone);
    if (language) await this.languageDropdown.selectOption(language);
    if (baseCurrency) await this.baseCurrencyDropdown.selectOption(baseCurrency);
  }
  
  async setAdvanceExpirationDays({ cutoffDays, warningDays }: { cutoffDays?: string, warningDays?: string }): Promise<void> {
    if (cutoffDays) await this.advanceExpirationCutoffInput.fill(cutoffDays);
    if (warningDays) await this.advanceExpirationWarningInput.fill(warningDays);
  }
  
  async clickSaveButton(): Promise<void> {
    await this.saveButton.click();
  }
  
  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }
  
  // Individual methods to toggle each checkbox
  async checkCreateReturnTransferUsage(check: boolean): Promise<void> {
    check ? await this.createReturnTransferUsageCheckbox.check() : await this.createReturnTransferUsageCheckbox.uncheck();
  }
  
  async checkAddUsageAtKitCheckIn(check: boolean): Promise<void> {
    check ? await this.addUsageAtKitCheckInCheckbox.check() : await this.addUsageAtKitCheckInCheckbox.uncheck();
  }
  
  async checkCaseNotesOnShipmentPOD(check: boolean): Promise<void> {
    check ? await this.caseNotesOnShipmentPODCheckbox.check() : await this.caseNotesOnShipmentPODCheckbox.uncheck();
  }
  
  async checkEmailAlerts(check: boolean): Promise<void> {
    check ? await this.emailAlertsCheckbox.check() : await this.emailAlertsCheckbox.uncheck();
  }
  
  async checkExpirationDateReceiving(check: boolean): Promise<void> {
    check ? await this.expirationDateReceivingCheckbox.check() : await this.expirationDateReceivingCheckbox.uncheck();
  }
  
  async checkOrderIntegration(check: boolean): Promise<void> {
    check ? await this.orderIntegrationCheckbox.check() : await this.orderIntegrationCheckbox.uncheck();
  }
  
  async checkShipmentScan(check: boolean): Promise<void> {
    check ? await this.shipmentScanCheckbox.check() : await this.shipmentScanCheckbox.uncheck();
  }
  
  async checkScanSounds(check: boolean): Promise<void> {
    check ? await this.scanSoundsCheckbox.check() : await this.scanSoundsCheckbox.uncheck();
  }
}