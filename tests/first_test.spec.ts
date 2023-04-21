import { test, expect } from '@playwright/test'
import { HomePage } from '../pageobjects/HomePage'
import { LiveAppPage } from '../pageobjects/LiveAppPage'
import { WarehousePage } from '../pageobjects/WarehouseAppPage'
import { color } from 'pengrape'
import constants from '../utils/constants'

require('dotenv').config()
//Use pengrape to generate a random color.
const randomColor = color({ format: 'hex' })
const user = process.env.USER!
const pass = process.env.PASS!
const adminUser = process.env.APPUSER!
const adminPass = process.env.APPPASS!
test.describe(`Change Icon Color for Display Rules`, async () => {
  test.beforeEach(async ({ page }) => {
    //Navigate to the Knack Builder login url for your app.
    //Login.
    const homePage = new HomePage(page)
    await homePage.goto()
    await homePage.login(user, pass)
    await homePage.openBuilder()
  })
  test('Randomize the color for a Display Rule warning symbol icon', async ({ page }) => {
    const warehousePage = new WarehousePage(page)
    //Click on the `Inventory` page in the left nav.
    //Click to activate the `Warehouse Inventory` View.
    await warehousePage.gotoPagesInventory()
    //Click on the On-Hand column header to open the column properties for that column.
    await warehousePage.onHandColumn.click()
    //Under Display Rules, validate that a display rule exists that sets an icon
    await expect(page.getByText(constants.displayIconRule)).toHaveCount(1)
    await warehousePage.displayRuleSelect.selectOption(constants.displayIconRule)
    //Update the Display Rule Icon color to this random color.
    await warehousePage.colorInput.fill(randomColor)
    //Click `Save Changes`in the left nav.
    await warehousePage.saveChangesBtn.click()
    await expect(warehousePage.loader).toBeHidden()
  })

  test('Validate that the warning symbol icon has the correct color in the Live App', async ({ page, context }) => {
    const warehousePage = new WarehousePage(page)
    //Go to the Live App (there is a link to the Live App in the top header).
    const [newtab] = await Promise.all([
      context.waitForEvent('page'), //listener
      warehousePage.liveAppLink.click() //event on the promise page
    ])
    await newtab.waitForLoadState()
    const liveAppPage = new LiveAppPage(newtab)
    //Login as the admin with credentials from .env file
    await liveAppPage.login(adminUser, adminPass)
    //Navigate to the Inventory tab.
    await liveAppPage.inventoryLink.click()
    await expect(liveAppPage.onHandColumn).toBeVisible()
    //Validate that the icon next to On-Hand values of 0 is set to the new color
    for (const li of await liveAppPage.warningIcons.all()) {
      const style = await li.getAttribute('style')
      expect(style).toContain(`color: ${randomColor}`)
    }
  })
})
