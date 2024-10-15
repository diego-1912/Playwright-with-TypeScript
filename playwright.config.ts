import { defineConfig, devices } from '@playwright/test';
import path from 'path';

interface CustomOptions {
  baseURL: string;
  username: string;
  password: string;
}

export default defineConfig<CustomOptions>({
  testDir: './webops_tests/tests',
  testMatch: '**/*.spec.ts',
  outputDir: 'test-results/',
  timeout: 180000,
  expect: {
    timeout: 60000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: process.env.CI ? 4 : 4,
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      attachmentsBaseURL: 'attachments/',
    }],
    ['list'],
  ],
  globalSetup: path.join(__dirname, 'webops_tests', 'config', 'globalSetup.ts'),
  use: {
    trace: 'on-first-retry',
    actionTimeout: 90000,
    navigationTimeout: 110000,
    locale: 'en-US',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    baseURL: process.env.TEST_BASE_URL || 'https://test4.webops.net/do',
    username: process.env.TEST_USERNAME || 'miguelcorrea',
    password: process.env.TEST_PASSWORD || 'welcome01',

    storageState: 'auth-state.json',

    // Add screenshot configuration
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});