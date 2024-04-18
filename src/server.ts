import express from 'express'
import 'dotenv/config'
import { getAmazonBestsellerItems } from './utils/amazonScraper'

async function bootstrap() {
  const app = express()

  app.use(express.json())

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at: ${process.env.APP_URL}`)
  })
}

async function main() {
  const offers = await getAmazonBestsellerItems()
  if (offers) {
    for (const item of offers) {
      console.log(item)
    }
  }
}

main()
// bootstrap()
