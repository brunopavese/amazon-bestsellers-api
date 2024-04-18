import express, { Request, Response } from 'express'
import { getAmazonBestsellerItems } from './utils/amazonScraper'
import { List } from './utils/types'
import 'dotenv/config'

async function bootstrap() {
  const app = express()

  app.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const bestSellers: Array<List> | null = await getAmazonBestsellerItems()

      if (bestSellers === null) {
        console.error('An error occurred during scraping 🥲')
        res.status(500).json({
          message: 'An error occurred during scraping 🥲',
        })
      }

      res.status(200).json({ bestSellers })
    } catch {
      res.status(500).json({
        message: 'Error fetching Amazon Best Sellers',
      })
    }
  })

  app.use(express.json())

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at: ${process.env.APP_URL}`)
  })
}

bootstrap()
