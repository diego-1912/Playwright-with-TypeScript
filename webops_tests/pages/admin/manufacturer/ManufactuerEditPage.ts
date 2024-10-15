import { Page } from '@playwright/test';
import { BasePage } from '../../../pages/BasePage';

export class ManufacturerEditPage extends BasePage {
    private manufacturerNameInput = '//label[contains(text(), "Manufacturer Name")]/following-sibling::input[@name="name"]';
    private manufacturerCaseIdInput = 'input[name="caseIdName"][type="text"]';
    private manufacturerErpCodeInput = 'input[name="erpCode"].form-control';
   
   
   //Main dropdowns
   private manufacturerProfileDropdown = 'text=Manufacturer Profile';
    private localizationDropdown = 'text=Localization';
    private settingsInfoDropdown = 'text=Settings Info';
    private securityOptionDropdown = 'text=Security Option';
    private transferDropdown = 'text=Transfer';
    private manufacturerPreferenceDropdown = 'text=Manufacturer Preference';
    private barcodeSettingsDropdown = 'text=Barcode Settings';
    private mobileAppBatchSizesDropdown = 'text=Mobile App Batch Sizes';

    //Main Buttons
    private saveButton = 'button.btn-primary[value="save"]';
    private cancelButton = 'button[value="cancel"]';

    //Manufacturer Profile options
    private accessToReplenishmentCheckbox = 'text=Access to Replenishment Shipping Methods - Manufacturer Admin Only >> input[type="checkbox"]';
    private shipMethodAtItemLevelCheckbox = 'text=Ship Method at Item Level >> input[type="checkbox"]';
    private caseIdentifierRequirementCheckbox = 'text=Case Identifier Requirement >> input[type="checkbox"]';
    private manufacturerCaseIdRequiredCheckbox = 'text=Manufacturer Case ID Required >> input[type="checkbox"]';
    private revisionInformationCheckbox = 'text=Revision Information >> input[type="checkbox"]';
    private revisionInformationRequiredCheckbox = 'text=Revision Information Required >> input[type="checkbox"]';
    private revisionInformationWarningMessageCheckbox = 'text=Revision Information Warning Message >> input[type="checkbox"]';
    private revisionInformationWarningMessageText = 'text=Revision Information Warning Message Text >> textarea';
    private logoUploadInput = 'text=Logo >> input[type="file"]';
    private activationDateInputs = 'text=Activation Date >> input[type="text"]';

    //Setting Info Options

    private noLotCodeValueInput = 'text=No Lot Code Value >> input';
    private arriveDaysPriorInput = 'text=Arrive By Days Prior To Surgery Date >> input';
    private allowLoanerBankAlternativesCheckbox = 'text=Allow Loaner Bank Alternatives >> input[type="checkbox"]';
    private allowQuantityReceivingCheckbox = 'text=Allow Quantity Receiving for Lot Controlled Items >> input[type="checkbox"]';
    private allowTempKitsCheckbox = 'text=Allow temp kits from loaner banks >> input[type="checkbox"]';
    private allowRestockAtKitCheckInCheckbox = 'text=Allow Restock at Kit Check In >> input[type="checkbox"]';
    private allowScanQuantityForKitEditCheckbox = 'text=Allow Scan Quantity for Kit Edit - Items >> input[type="checkbox"]';
    private binLocationFormatRadio15Char = 'text=15-character max. No separators required. >> input[type="radio"]';
    private binLocationFormatRadio4Levels = 'text=Four levels. Three characters each. Dot or dash separators. >> input[type="radio"]';

    //Securiry Options
    private maxFailedLoginAttemptsInput = 'text=Maximum Failed Login Attempts >> input[type="number"]';
    private strongPasswordCheckbox = 'text=Strong Password >> input[type="checkbox"]';

    //Tranfer Options
    private interBranchTransferSelect = 'text=Inter Branch Item Transfer >> select';
    private prefixInterBranchTransferKitsCheckbox = 'text=Prefix Inter Branch Transfer Kits as New >> input[type="checkbox"]';
    private manufacturerReturnSelect = 'text=Manufacturer Return >> select';
    private autoGenerateReturnNotificationCheckbox = 'text=Auto Generate Return Notification Authorization Number >> input[type="checkbox"]';
    private alwaysRequireReceiptOfReturnsCheckbox = 'text=Always Require Receipt of Returns >> input[type="checkbox"]';


//Manufactures Preferences Options

//BarCode Settings

    private serialNumberAsLotCodeCheckbox = 'text=Serial Number as Lot Code >> input[type="checkbox"]';
    private gs1AisSelect = 'text=GS1 AIs >> select';
//Mobile App Batch size options

    private hospitalPricesInput = 'text=Hospital Prices >> input[type="number"]';
    private masterPartsFileInput = 'text=Master Parts File >> input[type="number"]';
    private parSettingsInput = 'text=Par Settings >> input[type="number"]';
    private inventoryCountInput = 'text=Inventory Count >> input[type="number"]';

    constructor(page: Page) {
        super(page);
    }

    async fillManufacturerName(name: string): Promise<void> {
        await this.fillInput(this.manufacturerNameInput, name);
    }

    async fillManufacturerCaseId(caseId: string): Promise<void> {
        await this.fillInput(this.manufacturerCaseIdInput, caseId);
    }

    async fillManufacturerErpCode(erpCode: string): Promise<void> {
        await this.fillInput(this.manufacturerErpCodeInput, erpCode);
    }

    async toggleManufacturerProfile(): Promise<void> {
        await this.clickElement(this.manufacturerProfileDropdown);
    }

    async toggleLocalization(): Promise<void> {
        await this.clickElement(this.localizationDropdown);
    }

    async toggleSettingsInfo(): Promise<void> {
        await this.clickElement(this.settingsInfoDropdown);
    }

    async toggleSecurityOption(): Promise<void> {
        await this.clickElement(this.securityOptionDropdown);
    }

    async toggleTransfer(): Promise<void> {
        await this.clickElement(this.transferDropdown);
    }

    async toggleManufacturerPreference(): Promise<void> {
        await this.clickElement(this.manufacturerPreferenceDropdown);
    }

    async toggleBarcodeSettings(): Promise<void> {
        await this.clickElement(this.barcodeSettingsDropdown);
    }

    async toggleMobileAppBatchSizes(): Promise<void> {
        await this.clickElement(this.mobileAppBatchSizesDropdown);
    }

    async clickSave(): Promise<void> {
        await this.clickElement(this.saveButton);
    }

    async clickCancel(): Promise<void> {
        await this.clickElement(this.cancelButton);
    }

    async toggleAccessToReplenishment(): Promise<void> {
        await this.clickElement(this.accessToReplenishmentCheckbox);
    }

    async toggleShipMethodAtItemLevel(): Promise<void> {
        await this.clickElement(this.shipMethodAtItemLevelCheckbox);
    }

    async toggleCaseIdentifierRequirement(): Promise<void> {
        await this.clickElement(this.caseIdentifierRequirementCheckbox);
    }

    async toggleManufacturerCaseIdRequired(): Promise<void> {
        await this.clickElement(this.manufacturerCaseIdRequiredCheckbox);
    }

    async toggleRevisionInformation(): Promise<void> {
        await this.clickElement(this.revisionInformationCheckbox);
    }

    async toggleRevisionInformationRequired(): Promise<void> {
        await this.clickElement(this.revisionInformationRequiredCheckbox);
    }

    async toggleRevisionInformationWarningMessage(): Promise<void> {
        await this.clickElement(this.revisionInformationWarningMessageCheckbox);
    }

    async setRevisionInformationWarningMessageText(text: string): Promise<void> {
        await this.fillInput(this.revisionInformationWarningMessageText, text);
    }

    async uploadLogo(filePath: string): Promise<void> {
        await this.handleAction(
            () => this.page.setInputFiles(this.logoUploadInput, filePath),
            `Uploaded logo file: ${filePath}`,
            `Failed to upload logo file: ${filePath}`
        );
    }

    async setActivationDates(dates: string[]): Promise<void> {
        const dateInputs = await this.page.$$(this.activationDateInputs);
        for (let i = 0; i < dateInputs.length && i < dates.length; i++) {
            await this.handleAction(
                () => dateInputs[i].fill(dates[i]),
                `Set activation date ${i + 1} to ${dates[i]}`,
                `Failed to set activation date ${i + 1} to ${dates[i]}`
            );
        }
    }

    async setNoLotCodeValue(value: string): Promise<void> {
        await this.fillInput(this.noLotCodeValueInput, value);
    }

    async setArriveDaysPrior(days: number): Promise<void> {
        await this.fillInput(this.arriveDaysPriorInput, days.toString());
    }

    async toggleAllowLoanerBankAlternatives(): Promise<void> {
        await this.clickElement(this.allowLoanerBankAlternativesCheckbox);
    }

    async toggleAllowQuantityReceiving(): Promise<void> {
        await this.clickElement(this.allowQuantityReceivingCheckbox);
    }

    async toggleAllowTempKits(): Promise<void> {
        await this.clickElement(this.allowTempKitsCheckbox);
    }

    async toggleAllowRestockAtKitCheckIn(): Promise<void> {
        await this.clickElement(this.allowRestockAtKitCheckInCheckbox);
    }

    async toggleAllowScanQuantityForKitEdit(): Promise<void> {
        await this.clickElement(this.allowScanQuantityForKitEditCheckbox);
    }

    async selectBinLocationFormat15Char(): Promise<void> {
        await this.clickElement(this.binLocationFormatRadio15Char);
    }

    async selectBinLocationFormat4Levels(): Promise<void> {
        await this.clickElement(this.binLocationFormatRadio4Levels);
    }

    async setMaxFailedLoginAttempts(attempts: number): Promise<void> {
        await this.fillInput(this.maxFailedLoginAttemptsInput, attempts.toString());
    }

    async toggleStrongPassword(): Promise<void> {
        await this.clickElement(this.strongPasswordCheckbox);
    }

    async selectInterBranchTransferOption(option: string): Promise<void> {
        await this.selectOption(this.interBranchTransferSelect, option);
    }

    async togglePrefixInterBranchTransferKits(): Promise<void> {
        await this.clickElement(this.prefixInterBranchTransferKitsCheckbox);
    }

    async selectManufacturerReturnOption(option: string): Promise<void> {
        await this.selectOption(this.manufacturerReturnSelect, option);
    }

    async toggleAutoGenerateReturnNotification(): Promise<void> {
        await this.clickElement(this.autoGenerateReturnNotificationCheckbox);
    }

    async toggleAlwaysRequireReceiptOfReturns(): Promise<void> {
        await this.clickElement(this.alwaysRequireReceiptOfReturnsCheckbox);
    }

    async toggleSerialNumberAsLotCode(): Promise<void> {
        await this.clickElement(this.serialNumberAsLotCodeCheckbox);
    }

    async selectGs1Ais(option: string): Promise<void> {
        await this.selectOption(this.gs1AisSelect, option);
    }

    async setHospitalPrices(value: number): Promise<void> {
        await this.fillInput(this.hospitalPricesInput, value.toString());
    }

    async setMasterPartsFile(value: number): Promise<void> {
        await this.fillInput(this.masterPartsFileInput, value.toString());
    }

    async setParSettings(value: number): Promise<void> {
        await this.fillInput(this.parSettingsInput, value.toString());
    }

    async setInventoryCount(value: number): Promise<void> {
        await this.fillInput(this.inventoryCountInput, value.toString());
    }

    async fillMainFields(name: string, caseId: string, erpCode: string): Promise<void> {
        await this.fillManufacturerName(name);
        await this.fillManufacturerCaseId(caseId);
        await this.fillManufacturerErpCode(erpCode);
    }

    async setAllManufacturerProfileCheckboxes(checked: boolean): Promise<void> {
        const checkboxMethods = [
            this.toggleAccessToReplenishment,
            this.toggleShipMethodAtItemLevel,
            this.toggleCaseIdentifierRequirement,
            this.toggleManufacturerCaseIdRequired,
            this.toggleRevisionInformation,
            this.toggleRevisionInformationRequired,
            this.toggleRevisionInformationWarningMessage
        ];

    }

    async setAllSettingsInfoCheckboxes(checked: boolean): Promise<void> {
        const checkboxMethods = [
            this.toggleAllowLoanerBankAlternatives,
            this.toggleAllowQuantityReceiving,
            this.toggleAllowTempKits,
            this.toggleAllowRestockAtKitCheckIn,
            this.toggleAllowScanQuantityForKitEdit
        ];

      
    }

    async fillSettingsInfoFields(noLotCodeValue: string, arriveDaysPrior: number, binLocationFormat: '15char' | '4levels'): Promise<void> {
        await this.setNoLotCodeValue(noLotCodeValue);
        await this.setArriveDaysPrior(arriveDaysPrior);
        if (binLocationFormat === '15char') {
            await this.selectBinLocationFormat15Char();
        } else {
            await this.selectBinLocationFormat4Levels();
        }
    }

    async fillSecurityOptions(maxAttempts: number, enableStrongPassword: boolean): Promise<void> {
        await this.setMaxFailedLoginAttempts(maxAttempts);
        const isChecked = await this.page.isChecked(this.strongPasswordCheckbox);
        if (enableStrongPassword !== isChecked) {
            await this.toggleStrongPassword();
        }
    }
    async fillTransferOptions(
        interBranchOption: string,
        prefixInterBranch: boolean,
        manufacturerReturnOption: string,
        autoGenerateReturn: boolean,
        alwaysRequireReceipt: boolean
    ): Promise<void> {
        await this.selectInterBranchTransferOption(interBranchOption);
        const isPrefixChecked = await this.page.isChecked(this.prefixInterBranchTransferKitsCheckbox);
        if (prefixInterBranch !== isPrefixChecked) {
            await this.togglePrefixInterBranchTransferKits();
        }
        await this.selectManufacturerReturnOption(manufacturerReturnOption);
        const isAutoGenerateChecked = await this.page.isChecked(this.autoGenerateReturnNotificationCheckbox);
        if (autoGenerateReturn !== isAutoGenerateChecked) {
            await this.toggleAutoGenerateReturnNotification();
        }
        const isAlwaysRequireChecked = await this.page.isChecked(this.alwaysRequireReceiptOfReturnsCheckbox);
        if (alwaysRequireReceipt !== isAlwaysRequireChecked) {
            await this.toggleAlwaysRequireReceiptOfReturns();
        }
    }

    async fillBarcodeSettings(serialNumberAsLotCode: boolean, gs1AisOption: string): Promise<void> {
        const isSerialNumberChecked = await this.page.isChecked(this.serialNumberAsLotCodeCheckbox);
        if (serialNumberAsLotCode !== isSerialNumberChecked) {
            await this.toggleSerialNumberAsLotCode();
        }
        await this.selectGs1Ais(gs1AisOption);
    }

    async fillMobileAppBatchSizes(
        hospitalPrices: number,
        masterPartsFile: number,
        parSettings: number,
        inventoryCount: number
    ): Promise<void> {
        await this.setHospitalPrices(hospitalPrices);
        await this.setMasterPartsFile(masterPartsFile);
        await this.setParSettings(parSettings);
        await this.setInventoryCount(inventoryCount);
    }
}