import express from 'express'
import 'dotenv/config'
import * as format from './utils/format'
import { getItemsElementList } from './webScraper'
import { Item } from './types/item'

async function bootstrap() {
  const app = express()

  app.use(express.json())

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at: ${process.env.APP_URL}`)
  })
}

async function getOffers(): Promise<Item[]> {
  const list = await getItemsElementList()
  const processList = list.map((item) => ({
    name: item.name,
    url: item.link,
    seller: item.seller?.slice(4),
    originalPrice: format.price(item.originalPrice),
    promotionPrice: format.price(item.promotionPrice, item.promotionCents),
    discount: format.discount(item.discount),
    freeShipping: item.freeShipping,
    imageUrl: item.imageUrl,
  }))
  return processList
}
async function main() {
  const offers = await getOffers()
  for (const item of offers) {
    console.log(item)
  }
}

main()
// bootstrap()
