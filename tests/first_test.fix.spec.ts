import { test, expect } from '../fixture/pagesFixture'
import { LiveAppPage } from '../pageobjects/LiveAppPage'
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
  test.beforeEach(async ({ homePage, page }) => {
    // intercept and abort all requests to img
    // await page.route('**/*', route => {
    //   return route.request().resourceType() === 'image' ? route.abort() : route.continue()
    // })
    //Navigate to the Knack Builder login url for your app.
    //Login.
    await homePage.goto()
    await homePage.login(user, pass)
    await homePage.openBuilder()
  })
  test('Randomize the color for a Display Rule warning symbol icon', async ({ page, warehouseAppPage }) => {
    //Click on the `Inventory` page in the left nav.
    //Click to activate the `Warehouse Inventory` View.
    expect(await page.screenshot()).toMatchSnapshot('builderPage.png', {
      maxDiffPixels: 27 // allow no more than 27 different pixels.
    })
    await warehouseAppPage.gotoPagesInventory()
    //Click on the On-Hand column header to open the column properties for that column.
    await warehouseAppPage.onHandColumn.click()
    await expect(warehouseAppPage.onHandColumn).toHaveScreenshot()
    //Under Display Rules, validate that a display rule exists that sets an icon
    await expect(page.getByText(constants.displayIconRule)).toHaveCount(1)
    await warehouseAppPage.displayRuleSelect.selectOption(constants.displayIconRule)
    //Update the Display Rule Icon color to this random color.
    await warehouseAppPage.colorInput.fill(randomColor)
    //Click `Save Changes`in the left nav.
    await warehouseAppPage.saveChangesBtn.click()
    await expect(warehouseAppPage.loader).toBeHidden()
  })

  test('Validate that the warning symbol icon has the correct color in the Live App', async ({
    warehouseAppPage,
    context,
    page
  }) => {
    // Go to the Live App (there is a link to the Live App in the top header).
    const [newtab] = await Promise.all([
      context.waitForEvent('page'), //listener
      warehouseAppPage.liveAppLink.click() //event on the promise page
    ])
    await newtab.waitForLoadState()
    const liveAppPage = new LiveAppPage(newtab)
    //Login as the admin with credentials from .env file
    await liveAppPage.login(adminUser, adminPass)
    await page.waitForLoadState()
    expect(await page.screenshot()).toMatchSnapshot('liveAppPage.png', {
      maxDiffPixels: 27 // allow no more than 27 different pixels.
    })
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
