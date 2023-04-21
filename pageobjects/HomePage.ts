import { Locator, Page, expect } from '@playwright/test'
export class HomePage {
  readonly page: Page
  readonly userNameInput: Locator
  readonly userPasswordInput: Locator
  readonly loginBtn: Locator
  readonly userIcon: Locator
  readonly builderLink: Locator

  constructor(page: Page) {
    this.page = page
    this.userNameInput = page.getByLabel('Email Address')
    this.userPasswordInput = page.getByLabel('Password')
    this.loginBtn = page.getByRole('button', { name: 'Sign In' })
    this.userIcon = page.locator('a#global-user-settings')
    this.builderLink = page.getByRole('link', { name: 'd builder' })
  }

  async goto() {
    // Open baseUrl
    await this.page.goto('/')
  }

  async login(user: string, pass: string) {
    // Login with valid credentials from the .env file
    await this.userNameInput.fill(user)
    await this.userPasswordInput.fill(pass)
    // intercept the request to auth and assert its status
    await this.page.route('https://eu-api.knack.com/v1/accounts/session/**', async route => {
      // Make the original request
      const response = await route.fetch()
      await expect(response.status()).toBe(200)
      await route.fulfill({ response })
    })
    await this.loginBtn.click()
  }

  async openBuilder() {
    // intercept the request to auth and assert its status
    await this.page.route(
      'https://api.knack.com/v1/account/testmail/application/warehouse-manager/layout/builder',
      async route => {
        // Make the original request
        const response = await route.fetch()
        expect(response.status()).toBe(200)
        const json = await response.json()
        expect(json).toMatchObject({
          s3_secure: { domain: 's3-eu-west-1.amazonaws.com', bucket: 'eu-secure-assets.cloud-database.co' }
        })
        await route.continue()
      }
    )
    //Open Warehouse App builder link
    await this.builderLink.click()
  }
}
