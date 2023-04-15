import { Locator, Page } from '@playwright/test'
export class WarehousePage {
  readonly page: Page
  readonly pagesBtn: Locator
  readonly pagesAdminInventoryLink: Locator
  readonly inventoryLink: Locator
  readonly inventoryView: Locator
  readonly pagesFilterMenu: Locator
  readonly onHandColumn: Locator
  readonly displayRuleSelect: Locator
  readonly colorInput: Locator
  readonly saveChangesBtn: Locator
  readonly loader: Locator
  readonly liveAppLink: Locator
  readonly recordsBtn: Locator
  readonly recordsMessage: Locator
  readonly recordsWarehouseInventoryLink: Locator
  readonly recordsAddFiltersBtn: Locator
  readonly recordsFiltersOptionsSelect: Locator
  readonly recordsFiltersOperatorSelect: Locator
  readonly recordsFiltersAnswerSelect: Locator
  readonly recordsFiltersSubmitBtn: Locator
  readonly recordsInventoryTableReorderCells: Locator

  constructor(page: Page) {
    this.page = page
    this.pagesBtn = page.getByRole('link', { name: 'Pages' })
    this.pagesAdminInventoryLink = page.getByRole('link', {
      name: 'Admin > Inventory'
    })
    this.inventoryLink = page.getByRole('link', {
      name: 'Inventory',
      exact: true
    })
    this.pagesFilterMenu = page.locator('[data-cy="page-filter-menu"]')
    this.inventoryView = page.locator('[content="Click to edit this view"]')
    this.onHandColumn = page.getByRole('cell', { name: 'On-Hand' }).locator('div').nth(2)
    this.displayRuleSelect = page.locator('div.display-rule-actions>select')
    this.colorInput = page.locator('input[name="text"]')
    this.saveChangesBtn = page.getByText('save changes')
    this.loader = page.locator('#kn-layout #loader-bg')
    this.liveAppLink = page.getByRole('link', { name: 'Go to Live App' })
    this.recordsBtn = page.getByRole('link', { name: 'Records' })
    this.recordsMessage = page.getByText('Select a table to view its records')
    this.recordsWarehouseInventoryLink = page.getByText('Warehouse Inventory')
    this.recordsAddFiltersBtn = page.locator('a').filter({ hasText: 'Add filters' })
    this.recordsFiltersOptionsSelect = page.locator('[data-cy="field-list-field"]')
    this.recordsFiltersOperatorSelect = page.locator('[data-cy="field-list-operator"]')
    this.recordsFiltersAnswerSelect = page.locator('[data-cy="dropdown-select"]')
    this.recordsFiltersSubmitBtn = page.getByRole('button', { name: 'Submit' })
    this.recordsInventoryTableReorderCells = page.locator('td[data-cy*="table-cell"]')
  }

  async gotoPagesInventory() {
    //Click on the Pages Tab.
    //Click on the `Admin > Inventory` page in the left nav.
    //Click on the `Inventory` page in the left nav.
    //Click to activate the `Warehouse Inventory` View.
    await this.pagesBtn.click()
    await this.pagesAdminInventoryLink.click()
    await this.inventoryLink.click()
    await this.inventoryView.click()
  }

  async gotoRecordsInventory() {
    //Click on the Records Tab
    //Click on the `Warehouse Inventory` Object in the left nav.
    await this.recordsBtn.click()
    await this.recordsWarehouseInventoryLink.click()
  }

  async filterRecordsInventory(recordsFiltersOption, recordsFiltersOperator, recordsFiltersAnswer) {
    //Click on the “Add filters” button.
    //Filter on passed parameters from constants file and then click Submit.
    await this.recordsAddFiltersBtn.click()
    await this.recordsFiltersOptionsSelect.selectOption(recordsFiltersOption)
    await this.recordsFiltersOperatorSelect.selectOption(recordsFiltersOperator)
    await this.recordsFiltersAnswerSelect.selectOption(recordsFiltersAnswer)
    await this.recordsFiltersSubmitBtn.click()
  }
}
