import { test as base } from '@playwright/test'
import { HomePage } from '../pageobjects/HomePage'
import { LiveAppPage } from '../pageobjects/LiveAppPage'
import { WarehousePage } from '../pageobjects/WarehouseAppPage'

type pages = {
  homePage: HomePage
  liveAppPage: LiveAppPage
  warehouseAppPage: WarehousePage
}

const testPages = base.extend<pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  liveAppPage: async ({ page }, use) => {
    await use(new LiveAppPage(page))
  },
  warehouseAppPage: async ({ page }, use) => {
    await use(new WarehousePage(page))
  }
})
export const test = testPages
export const expect = testPages.expect
