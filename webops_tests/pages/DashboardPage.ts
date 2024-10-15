import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    private readonly selectors = {
        manufacturerDropdown: "#manufacturer-dropdown",
        webOpsLogo: "img[src*='WebOps-Logo-NoSlogan.svg']",
        adminDropdown: "a.dropdown-toggle.menu_link[role='button'][data-toggle='dropdown']",
        manufacturerOption: "a:text('Manufacturer')",
        profileDropdown: "button.navbar-toggle",
        logoutOption: "a[href*='/do/logout']",
        trainingOption: "a[href*='javascript:openTrainingWindow()']",
        releaseNotesOption: "a[href*='/do/releaseNotesMenu']"
    };

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(baseURL: string): Promise<void> {
        await this.handleAction(
            async () => {
                await this.page.goto(`${baseURL}/homePage`);
                await this.page.waitForLoadState('load');
            },
            `Navigated to dashboard (${baseURL}/homePage)`,
            `Failed to navigate to dashboard (${baseURL}/homePage)`
        );
    }

    async isWebOpsLogoVisible(): Promise<boolean> {
        return this.handleAction(
            async () => {
                await this.page.waitForSelector(this.selectors.webOpsLogo, { state: 'visible', timeout: 5000 });
                return true;
            },
            'Checked WebOps logo visibility',
            'Failed to check WebOps logo visibility'
        );
    }

    async selectManufacturerByIndex(index: number): Promise<void> {
        await this.handleAction(
          async () => {
            await this.clickElement(this.selectors.manufacturerDropdown);
            await this.selectDropdownOptionByIndex(this.selectors.manufacturerDropdown, index, 'Manufacturer');
          },
          `Selected manufacturer at index ${index}`,
          `Failed to select manufacturer at index ${index}`
        );
      }
      
    async selectManufacturerFromAdminMenu(): Promise<void> {
        await this.handleAction(
            async () => {
                await this.clickElement(this.selectors.adminDropdown);
                await this.clickElement(this.selectors.manufacturerOption);
            },
            'Selected Manufacturer option from Admin dropdown',
            'Failed to select Manufacturer option from Admin dropdown'
        );
    }
    async getUserName(): Promise<string> {
        return this.handleAction(
            async () => {
                const userName = await this.page.textContent(this.selectors.profileDropdown);
                return userName?.trim() ?? '';
            },
            'Retrieved user name',
            'Failed to retrieve user name'
        );
    }

    async performProfileAction(action: 'logout' | 'training' | 'releaseNotes'): Promise<void> {
        const actionMap = {
            logout: this.selectors.logoutOption,
            training: this.selectors.trainingOption,
            releaseNotes: this.selectors.releaseNotesOption
        };

        const actionSelector = actionMap[action];
        const actionName = action.charAt(0).toUpperCase() + action.slice(1);

        await this.handleAction(
            async () => {
                await this.clickElement(this.selectors.profileDropdown);
                await this.clickElement(actionSelector);
            },
            `Performed ${actionName} action`,
            `Failed to perform ${actionName} action`
        );
    }
}
export default DashboardPage;