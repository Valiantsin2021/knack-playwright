import { expect, Locator, Page } from '@playwright/test'

export class LiveAppPage {
  readonly page: Page
  readonly userNameInput: Locator
  readonly userPasswordInput: Locator
  readonly loginBtn: Locator
  readonly inventoryLink: Locator
  readonly warningIcons: Locator
  readonly onHandColumn: Locator
  readonly addFiltersBtn: Locator
  readonly filtersOptionsSelect: Locator
  readonly filtersOperatorSelect: Locator
  readonly filtersAnswerSelect: Locator
  readonly filtersSubmitBtn: Locator
  readonly inventoryTableReorderCells: Locator

  constructor(page: Page) {
    this.page = page
    this.userNameInput = page.getByLabel('Email Address')
    this.userPasswordInput = page.getByLabel('Password')
    this.loginBtn = page.locator('input[type="submit"]')
    this.inventoryLink = page
      .locator('#app-menu-list')
      .getByRole('link', { name: ' Inventory' })
    this.warningIcons = page.locator('i.fa.fa-warning :text-is("0")')
    this.onHandColumn = page.getByRole('link', { name: 'On-Hand' })
    this.addFiltersBtn = page.locator('a').filter({ hasText: 'Add filters' })
    this.filtersOptionsSelect = page.locator(
      'div#kn-filters-form select[name="field"]',
    )
    this.filtersOperatorSelect = page.locator(
      'div#kn-filters-form select[name="operator"]',
    )
    this.filtersAnswerSelect = page.locator(
      'div#kn-filters-form select[name="value"]',
    )
    this.filtersSubmitBtn = page.getByRole('button', { name: 'Submit' })
    this.inventoryTableReorderCells = page.locator('td>span.col-7')
  }
  async login(adminUser, adminPass) {
    // Login with valid credentials from the .env file
    await this.userNameInput.fill(adminUser)
    await this.userPasswordInput.fill(adminPass)
    await this.loginBtn.click()
  }
  async filterInventory(filtersOption, filtersOperator, filtersAnswer) {
    //Click on the “Add filters” button.
    //Filter on passed parameters from constants file and then click Submit.
    await this.addFiltersBtn.click()
    await this.filtersOptionsSelect.selectOption(filtersOption)
    await this.filtersOperatorSelect.selectOption(filtersOperator)
    await this.filtersAnswerSelect.selectOption(filtersAnswer)
    await this.filtersSubmitBtn.click()
  }
}
