import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { getSession } from 'next-auth/react'
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocument,
  GetCommandInput,
  PutCommandInput
} from '@aws-sdk/lib-dynamodb'
import dayjs from 'dayjs'

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string
  },
  region: process.env.NEXT_AUTH_AWS_REGION
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  }
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  })

  const session = await getSession({ req })
  const body = JSON.parse(req.body)

  if (session && session.user && session.user.id) {
    let get: GetCommandInput = {
      TableName: process.env.NOTEDOWN_DB_NAME,
      Key: {
        pk: `USER#${session.user.id}`,
        sk: `NOTES#${session.user.id}`
      }
    }

    try {
      const data = await client.get(get)

      if (data.Item) {
        console.log(data.Item.ls, body.lastSync)

        if (data.Item.ls >= body.lastSync) {
          return res.json({
            success: true,
            notes: data.Item.notes,
            lastSync: data.Item.ls
          })
        }
      }
    } catch (err) {
      console.error(err)

      res.statusCode = 500
      return res.json({ error: true })
    }

    // =====================================

    console.log('Last Sync from body', body.lastSync)

    let put: PutCommandInput = {
      TableName: process.env.NOTEDOWN_DB_NAME,
      Item: {
        pk: `USER#${session.user.id}`,
        sk: `NOTES#${session.user.id}`,
        notes: JSON.stringify(body.notes),
        type: 'NOTES',
        ls: body.lastSync,
        expires: dayjs(new Date()).add(60, 'day').unix()
      }
    }

    try {
      const data = await client.put(put)
      if (data.$metadata.httpStatusCode !== 200) {
        throw new Error('Internal error')
      }
      return res.json({
        success: true,
        notes: body.notes,
        lastSync: body.lastSync
      })
    } catch (err) {
      console.error(err)

      res.statusCode = 500
      return res.json({ error: true })
    }
  }

  return res.status(500)
}
