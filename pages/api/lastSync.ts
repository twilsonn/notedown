import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { getSession } from 'next-auth/react'
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import getLastSync from '../../lib/syncAPI/getLastSync'

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

  if (session && session.user) {
    const id = session.user.id
    const get = await getLastSync(req, res, { client, id })

    if (get.success) {
      res.json(get.lastSync)
    }
  }

  return res.status(500)
}
