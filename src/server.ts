import express, { Request, Response } from 'express'
import { DynamoDB } from 'aws-sdk'
import serverless from 'serverless-http'

const app = express()
const dynamodb = new DynamoDB.DocumentClient()

const tableName = process.env.DYNAMODB_TABLE_NAME || ''

app.get('/', async (_req: Request, res: Response): Promise<void> => {
  const errorRes = {
    error: true,
    message: 'Error accessing database',
  }
  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: tableName,
    Key: { id: 1 },
  }
  try {
    const result = await dynamodb.get(params).promise()

    if (!result) {
      res.status(404).json(errorRes)
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json(errorRes)
  }
})

app.put('/update', async (req: Request, res: Response): Promise<void> => {
  try {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: { id: 1 },
      UpdateExpression: 'SET #data = :data',
      ExpressionAttributeNames: {
        '#data': 'data',
      },
      ExpressionAttributeValues: {
        ':data': req.body.data,
      },
    }

    await dynamodb.update(params).promise()

    res.status(200).json({ message: 'DB updated successfully' })
  } catch {
    res
      .status(500)
      .json({ error: true, message: 'Error updating in the database' })
  }
})

app.use(express.json())

export const handler = serverless(app)
