import { Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';


export class NavigationMenu extends BasePage {
  
  private dropdownMaps: Map<string, Map<string, Locator>>;

  constructor(page: Page) {
    super(page);
    this.dropdownMaps = new Map();
    this.initializeDropdownMaps();

  }
  private initializeDropdownMaps(): void {
    // Admin dropdown
    const adminDropdownMap = new Map<string, Locator>([
      ['dropdown', this.page.getByRole('button', { name: ' Admin' })],
      ['ASN Reason Code', this.page.getByRole('link', { name: 'ASN Reason Code' })],
      ['Advanced Expiration Cutoff', this.page.getByRole('link', { name: 'Advanced Expiration Cutoff' })],
      ['Branch', this.page.getByRole('link', { name: 'Branch' })],
      ['Company', this.page.getByRole('link', { name: 'Company' })],
      ['DiscrepancyCode', this.page.getByRole('link', { name: 'Discrepancy Code' })],
      ['Hospital', this.page.getByRole('link', { name: 'Hospital', exact: true })],
      ['Manufacturer', this.page.getByRole('link', { name: 'Manufacturer' })],
      ['Order Hold Reason Code', this.page.getByRole('link', { name: 'Order Hold Reason Code' })],
      ['Physician', this.page.getByRole('link', { name: 'Physician', exact: true })],
      ['Product Quality Actions', this.page.getByRole('link', { name: 'Product Quality Actions' })],
      ['Product System', this.page.getByRole('link', { name: 'Product System' })],
      ['Sales Representative', this.page.getByRole('link', { name: 'Sales Representative' })],
      ['Shipping Methods', this.page.getByRole('link', { name: 'Shipping Methods' })],
      ['Upload Hospital Prices', this.page.getByRole('link', { name: 'Upload Hospital Prices' })],
      ['User', this.page.getByRole('link', { name: 'User', exact: true })]
    ]);
    this.dropdownMaps.set('Admin', adminDropdownMap);

    // Cases dropdwon
    const caseDropdownMap = new Map<string, Locator>([
      ['dropdown', this.page.getByRole('button', { name: 'Cases' })],
      ['Case Search', this.page.getByRole('link', { name: 'Case Search' })],
      ['Post A Case', this.page.getByRole('link', { name: 'Post A Case' })]
    ]);
    this.dropdownMaps.set('Cases', caseDropdownMap);
    
     // Inventory dropdown
    
    const inventoryDropdownMap = new Map<string, Locator>([
      ['dropdown', this.page.getByRole('button', { name: ' Inventory' })],
      ['Download Kit Listing', this.page.getByRole('link', { name: 'Download Kit Listing' })],
      ['Download Kit Table', this.page.getByRole('link', { name: 'Download Kit Table' })],
      ['Inventory Item', this.page.getByRole('link', { name: 'Inventory Item', exact: true })],
      ['Inventory Item Part', this.page.getByRole('link', { name: 'Inventory Item Part' })],
      ['Inventory Location', this.page.getByRole('link', { name: 'Inventory Location' })],
      ['Inventory Types', this.page.getByRole('link', { name: 'Inventory Types' })],
      ['Item Alert Check', this.page.getByRole('link', { name: 'Item Alert Check' })],
      ['Market Divisions', this.page.getByRole('link', { name: 'Market Divisions' })],
      [ 'Mobile Inventory Count', this.page.getByRole('link', { name: 'Mobile Inventory Count' })],
      ['Product Categories', this.page.getByRole('link', { name: 'Product Categories' })],
      ['Scan On PC', this.page.getByRole('link', { name: 'Scan On PC' })],
      
    ]);
    this.dropdownMaps.set('Inventory',inventoryDropdownMap);
 
    // Kits dropdwon
 
 const kitsDropdownMap = new Map<string, Locator>([
  ['dropdown', this.page.getByRole('button', { name: ' Kits' })],
  ['Kit Families', this.page.getByRole('link', { name: 'Kit Families' })],
  ['Kits', this.page.getByRole('link', { name: 'Kits' })],
  ['Instruments', this.page.getByRole('link', { name: 'Instruments' })]
]);
this.dropdownMaps.set('Kits', kitsDropdownMap);

const dispatchDropdownMap = new Map<string, Locator>([
  ['dropdown', this.page.getByRole('button', { name: ' Dispatch' })],
  ['Cases - Kits At Location', this.page.getByRole('link', { name: 'Cases - Kits At Location' })],
  ['Cases - Pickup List', this.page.getByRole('link', { name: 'Cases - Pickup List' })],
  ['Daily Shipment List - Incoming', this.page.getByRole('link', { name: 'Daily Shipment List - Incoming' })],
  ['Weekly Shipment List - All', this.page.getByRole('link', { name: 'Weekly Shipment List - All' })]
]);
this.dropdownMaps.set('Dispatch', dispatchDropdownMap);

const receivingDropdownMap = new Map<string, Locator>([
  ['dropdown', this.page.getByRole('button', { name: ' Receiving' })],
  ['Advanced Shipping Notice', this.page.getByRole('link', { name: 'Advanced Shipping Notice' })],
  ['Check In New Inventory', this.page.getByRole('link', { name: 'Check In New Inventory' })],
  ['Check In Case Usage', this.page.getByRole('link', { name: 'Check In Case Usage' })]
]);
this.dropdownMaps.set('Receiving', receivingDropdownMap);

const transfersDropdownMap = new Map<string, Locator>([
  ['dropdown', this.page.getByRole('button', { name: ' Transfers' })],
  ['Create Transfer', this.page.getByRole('link', { name: 'Create Transfer' })],
  ['Transfer Search', this.page.getByRole('link', { name: 'Transfer Search' })],
]);
this.dropdownMaps.set('Transfers', transfersDropdownMap);


//Look for better locator
const profileDropdownMap = new Map<string, Locator>([
  ['dropdown', this.page.getByRole('button', { name: '' })],//Look for better locator
  ['Logout', this.page.getByRole('link', { name: 'Logout' })],
  ['Settings' , this.page.getByRole('link', { name: 'Settings' })],
  ['Training', this.page.getByRole('link', { name: 'Training' })],
  ['Release Notes', this.page.getByRole('link', { name: 'Release Notes' })],

]);
this.dropdownMaps.set('Transfers', profileDropdownMap);

  }
  

  /**
   * Interacts with a specified dropdown and selects an option
   * @param dropdownName The name of the dropdown to interact with e.g 
   * @param option The option to select from the dropdown
   * @example  await navigationMenu.selectDropdownAndOption('Admin', 'Branch');
   * 
   */
  async selectDropdownAndOption(dropdownName: string, option: string): Promise<void> {
    await this.handleAction(
      async () => {
        const dropdownMap = this.dropdownMaps.get(dropdownName);
        if (!dropdownMap) {
          throw new Error(`Invalid dropdown name: ${dropdownName}`);
        }

        const dropdownLocator = dropdownMap.get('dropdown');
        const optionLocator = dropdownMap.get(option);

        if (!dropdownLocator || !optionLocator) {
          throw new Error(`Invalid option for ${dropdownName} dropdown: ${option}`);
        }

        await dropdownLocator.click();
        await optionLocator.click();
      },
      `Selected ${dropdownName} dropdown option: ${option}`,
      `Failed to select ${dropdownName} dropdown option: ${option}`
    );
  }

  
}
