import { test, expect } from '@playwright/test'
import { HomePage } from '../pageobjects/HomePage'
import { WarehousePage } from '../pageobjects/WarehouseAppPage'
import { LiveAppPage } from '../pageobjects/LiveAppPage'
import { constants } from '../utils/constants'
require('dotenv').config()
let yesRowsCount
const user = process.env.USER
const pass = process.env.PASS
const adminUser = process.env.APPUSER
const adminPass = process.env.APPPASS
test.describe(`Filtering Inventory`, async () => {
  test.beforeEach(async ({ page }) => {
    //Navigate to the Knack Builder login url for your app.
    //Login.
    const homePage = new HomePage(page)
    await homePage.goto()
    await homePage.login(user, pass)
    await homePage.openBuilder()
  })
  test('Filter records in the Inventory object where "Needs Re-Order" is Yes, count the records, and confirm their value', async ({
    page,
  }) => {
    test.slow()
    const warehousePage = new WarehousePage(page)
    //Go to Records > Warehouse Inventory grid
    //Click on the Records Tab
    //Click on the `Warehouse Inventory` Object in the left nav.
    await warehousePage.gotoRecordsInventory()
    //Click on the “Add filters” button.
    //Filter on “Needs Re-Order” “is” “Yes” and then click Submit.
    await warehousePage.filterRecordsInventory(
      constants.recordsFiltersOption,
      constants.recordsFiltersOperator,
      constants.recordsFiltersAnswer,
    )
    const noCells = await warehousePage.recordsInventoryTableReorderCells
    .filter({ hasText: `No` })
    .count()
    const yesCells = await warehousePage.recordsInventoryTableReorderCells
      .filter({ hasText: `${constants.recordsFiltersAnswer}` })
      .count()
    //Validate that EVERY “Needs Re-Order” table cell is set to “Yes”.
    for(let i = 0; i < yesCells; i++) {
      await expect(warehousePage.recordsInventoryTableReorderCells.filter({ hasText: `${constants.recordsFiltersAnswer}` }).nth(i)).toBeVisible()
    }
    //Validate that No “Needs Re-Order” table cell with 'No' is visible.
    for(let i = 0; i < noCells; i++) {
      await expect(warehousePage.recordsInventoryTableReorderCells.filter({ hasText: `No` }).nth(i)).toBeHidden()
    }
    //Count and store the number of records displayed in the table.
    console.log(yesCells)
    yesRowsCount = yesCells
  })

  test('Validate that a Table displaying these same records in the Live App properly filters in the same way with the same results', async ({
    page,
    context,
  }) => {
    test.slow()
    //Go to the Live App (there is a link to the Live App in the top header).
    const warehousePage = new WarehousePage(page)
    const [newtab] = await Promise.all([
      context.waitForEvent('page'), //listener
      warehousePage.liveAppLink.click(), //event on the promise page
    ])
    await newtab.waitForLoadState()
    const liveAppPage = new LiveAppPage(newtab)
    //Login as the admin with credentials from .env file
    await liveAppPage.login(adminUser, adminPass)
    //Navigate to the Inventory tab.
    await liveAppPage.inventoryLink.click()
    await expect(liveAppPage.onHandColumn).toBeVisible()
    //Click on the “Add filters” button.
    //Filter on “Needs Re-Order” “is” “Yes” and then click Submit.
    await liveAppPage.filterInventory(
      constants.recordsFiltersOption,
      constants.recordsFiltersOperator,
      constants.recordsFiltersAnswer,
    )
    const noCells = await liveAppPage.inventoryTableReorderCells
    .filter({ hasText: `No` })
    .count()
    const yesCells = await liveAppPage.inventoryTableReorderCells
      .filter({ hasText: `${constants.recordsFiltersAnswer}` })
      .count()
    //Validate that EVERY “Needs Re-Order” table cell is set to “Yes”.
    for(let i = 0; i < yesCells; i++) {
      await expect(liveAppPage.inventoryTableReorderCells.filter({ hasText: `${constants.recordsFiltersAnswer}` }).nth(i)).toBeVisible()
    }
    //Validate that No “Needs Re-Order” table cell with 'No' is visible.
    for(let i = 0; i < noCells; i++) {
      await expect(liveAppPage.inventoryTableReorderCells.filter({ hasText: `No` }).nth(i)).toBeHidden()
    }
    //Validate that the number of records matches the number of records shown in the builder Records Tab
    console.log(yesCells)
    console.log(yesRowsCount)
    expect(yesCells).toEqual(yesRowsCount)
  })
})
