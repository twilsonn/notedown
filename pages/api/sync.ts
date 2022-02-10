import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { getSession } from 'next-auth/react'
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import getNotes from '../../lib/syncAPI/getNotes'
import syncNotes from '../../lib/syncAPI/syncNotes'
import { Note } from '../../store/reducers/notesSlicer/types'

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

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

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
    await sleep(1000)

    const id = session.user.id

    let body:
      | {
          notes: Note[]
          lastSync: number
          lastUpdate: number
          overwrite: boolean
        }
      | undefined = undefined

    try {
      body = JSON.parse(req.body)
    } catch (error) {
      console.log(error)
    }

    if (body?.overwrite) {
      const put = await syncNotes(req, res, { client, id })
      res.statusCode = put.error?.code! | 200
      return res.json(put)
    }

    const get = await getNotes(req, res, { client, id })

    if (get.type !== 'desynced') {
      return res.json(get)
    } else {
      const put = await syncNotes(req, res, { client, id })
      res.statusCode = put.error?.code! | 200
      return res.json(put)
    }
  }

  return res.status(500)
}
