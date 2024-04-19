import axios from 'axios'
import { getAmazonBestsellers } from './amazonScraper'
import { List, Data } from './types'
import 'dotenv/config'

const endpointUrl = `${process.env.API_GATEWAY_ENDPOINT}update`

async function updateTableFromScraper(): Promise<void> {
  try {
    const bestSellers: Array<List> = await getAmazonBestsellers()

    const dataObject: Data = {
      bestSellers,
      updateDate: new Date().toString(),
    }

    const response = await axios.put(endpointUrl, dataObject)
    console.log('Response:', response.data)
  } catch (error) {
    console.error(error)
  } finally {
    console.log('Finished!')
  }
}

updateTableFromScraper()
