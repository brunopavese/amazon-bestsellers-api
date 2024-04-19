import axios from 'axios'
import { getAmazonBestsellerItems } from './amazonScraper'
import { List, UpdateData } from './types'

const endpointUrl =
  'https://009i7tpx42.execute-api.sa-east-1.amazonaws.com/update'

async function fetchAndUpdateData(): Promise<void> {
  try {
    const bestSellers: Array<List> | null = await getAmazonBestsellerItems()
    if (bestSellers === null) {
      console.error('An error occurred during scraping or updating db')
      return
    }

    const updatedData: UpdateData = {
      bestSellers,
      updateDate: new Date().toString(),
    }
    console.log(updatedData)

    const response = await axios.put(endpointUrl, updatedData)
    console.log('Response:', response.data)
  } catch (error) {
    // console.error('Error:', error)
  } finally {
    console.log('Finished!')
  }
}

fetchAndUpdateData()
