import puppeteer from 'puppeteer'

export async function getItemsElementList() {
  const url = 'https://www.mercadolivre.com.br/ofertas'

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)

  const items = await page.evaluate(() => {
    const itemsElement = document.querySelectorAll('.promotion-item')
    const items = Array.from(itemsElement)

    return items.map((item) => ({
      name: item.querySelector('.promotion-item__title')?.textContent,
      link: item
        .querySelector('.promotion-item__link-container')
        ?.getAttribute('href'),
      seller: item.querySelector('.promotion-item__seller')?.textContent,
      originalPrice: item.querySelectorAll('.andes-money-amount__fraction')[1]
        .textContent,
      promotionPrice: item.querySelectorAll('.andes-money-amount__fraction')[0]
        .textContent,
      promotionCents: item.querySelector('.andes-money-amount__cents')
        ?.textContent,
      discount: item.querySelector('.promotion-item__discount-text')
        ?.textContent,
      freeShipping: !!item.querySelector('.promotion-item__pill'),
      imageUrl: item.querySelector('.promotion-item__img')?.getAttribute('src'),
    }))
  })

  await browser.close()

  return items
}
