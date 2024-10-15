import { Browser, BrowserContext, chromium, firefox, webkit, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class SessionManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private config: any;

  constructor(private projectName: string) {
    this.loadConfig();
  }

  private loadConfig(): void {
    const configPath = path.resolve(__dirname, '..', '..', 'playwright.config.ts');
    const configContent = fs.readFileSync(configPath, 'utf8');
    // Simple parsing to extract the projects array
    const projectsMatch = configContent.match(/projects:\s*\[([\s\S]*?)\]/);
    if (projectsMatch) {
      const projectsString = projectsMatch[1];
      const projects = eval(`[${projectsString}]`);
      this.config = projects.find((p: any) => p.name === this.projectName);
      if (!this.config) {
        throw new Error(`Project ${this.projectName} not found in playwright.config.ts`);
      }
    } else {
      throw new Error('Unable to parse playwright.config.ts');
    }
  }

  async initialize(): Promise<void> {
    const { browserName, username, password, baseURL } = this.config.use;

    // Launch the browser based on the project configuration
    switch (browserName) {
      case 'chromium':
        this.browser = await chromium.launch();
        break;
      case 'firefox':
        this.browser = await firefox.launch();
        break;
      case 'webkit':
        this.browser = await webkit.launch();
        break;
      default:
        throw new Error(`Unsupported browser: ${browserName}`);
    }

    // Create a new context with the storage state
    this.context = await this.browser.newContext({
      storageState: path.resolve(__dirname, '..', 'config', `storageState-${this.projectName}.json`)
    });

    // Create a new page
    this.page = await this.context.newPage();

    // Navigate to the login page
    await this.page.goto(baseURL);

    // Check if already logged in
    const isLoggedIn = await this.page.evaluate(() => {
      return document.body.textContent?.includes('Welcome');
    });

    if (!isLoggedIn) {
      // Perform login
      await this.page.fill('input[name="username"]', username);
      await this.page.fill('input[name="password"]', password);
      await this.page.click('button[type="submit"]');

      // Wait for navigation after login
      await this.page.waitForNavigation();

      // Save the storage state
      await this.context.storageState({ path: path.resolve(__dirname, '..', 'config', `storageState-${this.projectName}.json`) });
    }
  }

  async getPage(): Promise<Page> {
    if (!this.page) {
      throw new Error('Session not initialized. Call initialize() first.');
    }
    return this.page;
  }

  async close(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}
