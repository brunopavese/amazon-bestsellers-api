import express, { Request, Response } from 'express'
import { DynamoDB } from 'aws-sdk'
import serverless from 'serverless-http'
import { validate } from './utils/dataValidate'

const app = express()
const dynamodb = new DynamoDB.DocumentClient()

const tableName = process.env.DYNAMODB_TABLE_NAME || ''

app.use(express.json())

app.get('/', async (_req: Request, res: Response): Promise<void> => {
  const errorRes = {
    error: true,
    message: 'Error accessing database',
  }
  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: tableName,
    Key: { id: '1' },
  }
  try {
    const result = await dynamodb.get(params).promise()

    if (!result) {
      res.status(404).json(errorRes)
    }

    res
      .status(200)
      .json({ data: result.Item?.data, updateDate: result.Item?.updateDate })
  } catch {
    res.status(500).json(errorRes)
  }
})

app.put('/update', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!validate(req.body)) {
      res
        .status(400)
        .json({ error: true, message: 'Invalid request body format' })
    }
    const params = {
      TableName: tableName,
      Item: {
        id: '1',
        data: req.body.bestSellers,
        updateDate: req.body.updateDate,
      },
    }

    await dynamodb.put(params).promise()

    res
      .status(200)
      .json({ message: 'DB updated successfully', newData: req.body })
  } catch {
    res
      .status(500)
      .json({ error: true, message: 'Error updating in the database' })
  }
})

export const handler = serverless(app)
