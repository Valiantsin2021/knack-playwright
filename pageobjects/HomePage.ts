import { Locator, Page } from '@playwright/test'
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
    await this.loginBtn.click()
  }

  async openBuilder() {
    //Open Warehouse App builder link
    await this.builderLink.click()
  }
}
