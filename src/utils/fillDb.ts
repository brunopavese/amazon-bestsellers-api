import axios from 'axios'
import { getAmazonBestsellerItems } from './amazonScraper'
import { List } from './types'

const endpointUrl =
  'https://009i7tpx42.execute-api.sa-east-1.amazonaws.com/update'

interface UpdateData {
  bestSellers: Array<List> | null
  updateDate: Date
}

async function fetchAndUpdateData(): Promise<void> {
  let isFetching = true

  while (isFetching) {
    try {
      const bestSellers: Array<List> | null = await getAmazonBestsellerItems()
      const updatedData: UpdateData = {
        bestSellers,
        updateDate: new Date(),
      }

      if (bestSellers === null) {
        console.error('An error occurred during scraping  or updating db')
      }

      const response = await axios.put(endpointUrl, updatedData)
      if (!response.data.error) isFetching = false
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      console.log('Finished!')
    }
  }
}

fetchAndUpdateData()
