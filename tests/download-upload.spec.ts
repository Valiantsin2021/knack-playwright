import { test, expect } from '@playwright/test'
import { promises as fsPromise } from 'fs'
async function loadData() {
  return await fsPromise.readFile('./Lambdainfo.txt', 'utf8')
}

test.describe(`test upload and download the files`, async () => {
  test(`download text file`, async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo')
    await page.locator('button#create').isDisabled()
    await page.locator('textarea#textbox').type('hello from playwright')
    await page.locator('button#create').isEnabled()
    await page.locator('button#create').click()

    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('a#link-to-download').click()])
    const fileName = download.suggestedFilename()
    await download.saveAs(fileName)

    const downloadedFile = await loadData()
    expect(downloadedFile).toEqual('hello from playwright')
  })
  test(`upload text file`, async ({ page }) => {
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/')
    await page.setInputFiles('input[name="files[]"]', ['Lambdainfo.txt', 'playwright-logo.png'])
    await page.getByText('Lambdainfo.txt').isVisible()
    await page.getByText('playwright-logo.png').isVisible()
    await expect(page.locator('//tbody//td/strong').filter({ hasText: 'File type not allowed' })).toBeVisible()
    await expect(page.locator('tbody.files td:nth-child(4) button.start').first()).toBeDisabled()
    await expect(page.locator('tbody.files td:nth-child(4) button.start').last()).toBeEnabled()
    await expect(page.locator('tbody.files td:nth-child(4)').last().locator('button.edit')).toBeVisible()
    await expect(page.locator('tbody.files td:nth-child(4)').last().locator('button.edit')).toBeVisible()
    // await expect(page.locator('tbody.files td:nth-child(4) button.start')).not.toBeVisible()
    // await page.locator('(//tbody//td/strong)[2]').isHidden()
    await expect(page.getByText('File type not allowed')).toBeVisible()
  })
})

