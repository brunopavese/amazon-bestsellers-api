import puppeteer from 'puppeteer'
import { List } from './types'

export async function getAmazonBestsellers(): Promise<List[]> {
  const url = 'https://www.amazon.com.br/bestsellers'

  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(url)
    await page.setViewport({ width: 1080, height: 1024 })

    await page.waitForSelector('li[aria-posinset="3"]')

    const productsByCategory: Array<List> = await page.evaluate(() => {
      const titlesElement = document.querySelectorAll('.a-carousel-heading')
      const titles = Array.from(titlesElement).map((element) =>
        element.innerHTML.slice(17),
      )
      const lists = Array.from(document.querySelectorAll('.a-carousel'))
      return lists.map((list, index) => {
        let itemId = 1
        return {
          category: titles[index] || '',
          items: Array.from(list.children)
            .slice(0, 3)
            .map((item) => {
              const url = item
                .querySelector('.a-link-normal')
                ?.getAttribute('href')
              return {
                id: itemId++,
                name: item.querySelector('span > div')?.textContent || '',
                price: item.querySelector('span > span')?.textContent || '',
                url: url ? `https://www.amazon.com.br/${url}` : '',
              }
            }),
        }
      })
    })

    await browser.close()

    return productsByCategory
  } catch (error) {
    throw new Error(`An error occurred during scraping, ${error}`)
  }
}
