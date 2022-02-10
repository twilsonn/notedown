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

import rateLimit from '../../lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500 // Max 500 users per second
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST', 'GET'],
    origin: '*',
    optionsSuccessStatus: 200
  })

  try {
    await limiter.check(res, 10, 'CACHE_TOKEN')

    const session = await getSession({ req })

    if (session && session.user) {
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
  } catch (error) {
    res.status(429).json({ error: 'Rate limit exceeded' })
  }
}
