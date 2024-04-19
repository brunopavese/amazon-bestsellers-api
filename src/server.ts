import express, { Request, Response } from 'express'
import { DynamoDB } from 'aws-sdk'
import serverless from 'serverless-http'
import { isValidBody } from './utils/isValidBody'

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

    res.status(200).json(result.Item?.data)
  } catch {
    res.status(500).json(errorRes)
  }
})

app.put('/update', async (req: Request, res: Response): Promise<void> => {
  try {
    // if (!isValidBody(req.body)) {
    //   res
    //     .status(400)
    //     .json({ error: true, message: 'Invalid request body format' })
    // }
    const params = {
      TableName: tableName,
      // Key: { id: '1' },
      Item: {
        id: '1',
        data: req.body.bestSellers,
        updateDate: req.body.updateDate,
      },
      // UpdateExpression: 'SET #data = :data',
      // ExpressionAttributeNames: {
      //   '#data': 'data',
      // },
      // ExpressionAttributeValues: {
      //   ':data': {
      //     bestSellers: req.body.bestSellers,
      //     updateDate: req.body.updateDate,
      //   },
      // },
    }

    await dynamodb.put(params).promise()

    res.status(200).json({ message: 'DB updated successfully', body: req.body })
  } catch {
    res
      .status(500)
      .json({ error: true, message: 'Error updating in the database' })
  }
})

export const handler = serverless(app)
