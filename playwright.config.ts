import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: ['*.fix.spec.ts'],
  workers: 1,
  timeout: 5 * 60 * 1000, // Setup timeout to 5 minutes.
  expect: {
    timeout: 10 * 1000
  },
  use: {
    baseURL: 'https://builder.knack.com/',
    testIdAttribute: 'data-cy',
    // headless: false, // Turn off headless mode.
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 10000,
    locale: 'en-GB',
    screenshot: 'only-on-failure', // "on"
    video: 'retain-on-failure', // "on"
    // retries: 2, // number of retry to fail test
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry'
  },
  reporter: [
    ['line'],
    [
      'html',
      {
        open: 'never'
      }
    ],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false
      }
    ]
  ],
  projects: [
    {
      name: 'chromium',

      /* Project-specific settings. */
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
}

export default config
