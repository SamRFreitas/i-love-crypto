import { test, expect } from '@playwright/test'

async function setupMockFetchCoinList(page) {

  await page.route('**/coins/list', (route) => {

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'cosmos', name: 'Cosmos Hub', symbol: 'ATOM' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
        { id: 'dacxi', name: 'Dacxi', symbol: 'DACXI' },
      ])
    })

  })

}

async function setupMockFetchSimplePrice(page) {

  await page.route('**/simple/price**', (route) => {

    const prices = {
        bitcoin: { usd: 50000 },
        ethereum: { usd: 2000 },
        cosmos: { usd: 10 },
        dacxi: { usd: 0.5 },
    }

    const url = route.request().url()
    const match = url.match(/ids=([^&]*)/)
    const coinId = match ? match[1] : null

    if (coinId && prices[coinId]) {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ [coinId]: prices[coinId] }),
        })
    } else {
        route.continue()
    }

  })

}

async function setupMockFetchHistoricalDataWithTimeRange(page, withErrorMessage = true) {
  
  await page.route('**/market_chart/range**', (route) => {
    if (withErrorMessage) {
      route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Too Many Requests' }),
      })
    } else {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          prices: [[1, 1000]],
        }),
      })
    }
  })

}

async function selectDate(page) {

  await page.click('[data-test="dp-input"]')

  await page.waitForSelector('.dp__calendar')

  await page.evaluate(() => {
    const firstRowFirstCell = document.querySelector('.dp__calendar_row:first-child .dp__calendar_item:first-child')
    firstRowFirstCell.click()
  })

  await page.evaluate(() => {
    const selectButton = document.querySelector('.dp__action_button.dp__action_select')
    selectButton.click()
  })

}

const BASE_URL = 'http://localhost:8080/'

test('should show error Empty Date', async ({ page }) => {

  setupMockFetchCoinList(page)
  setupMockFetchSimplePrice(page)

  await page.goto(BASE_URL)

  await page.waitForTimeout(2000)

  await page.click('button[type="submit"]')

  await page.waitForSelector('text=Empty Datetime - Please, select a datetime')

  const isCursorNotAllowed = await page.$eval('button[type="submit"]', (button) => {
    const styles = window.getComputedStyle(button)
    return styles.getPropertyValue('cursor') === 'not-allowed'
  })
  expect(isCursorNotAllowed).toBe(true)

  await page.waitForSelector('text=Empty Datetime - Please, select a datetime', { timeout: 1000 })

  // await page.waitForTimeout(2000)

})


test('should show error Too Many Request', async ({ page }) => {

  setupMockFetchCoinList(page)
  setupMockFetchSimplePrice(page)
  setupMockFetchHistoricalDataWithTimeRange(page)

  await page.goto(BASE_URL)

  await selectDate(page)

  await page.click('button[type="submit"]')

  await page.waitForSelector('text=Too Many Requests - Please wait 1 minute and try again', { timeout: 1000 })

  // await page.waitForTimeout(2000)

})

test('should see a historicalPrice', async ({ page }) => {

  setupMockFetchCoinList(page)
  setupMockFetchSimplePrice(page)
  setupMockFetchHistoricalDataWithTimeRange(page, false)

  await page.goto(BASE_URL)

  await selectDate(page)

  await page.click('button[type="submit"]')

  const labelValue = await page.textContent('#historical-coin-price')
  expect(labelValue.trim()).toBe('$ 1000.00')

  // await page.waitForTimeout(2000)

})
