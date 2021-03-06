import { DynamoDBDocument, PutCommandInput } from '@aws-sdk/lib-dynamodb'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { Note } from '../../store/reducers/notesSlicer/types'
import { SyncResponse } from './types'

const syncNotes = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { client, id }: { client: DynamoDBDocument; id: string }
): Promise<SyncResponse> => {
  const body: {
    notes: Note[]
    lastUpdate: number
  } = JSON.parse(req.body)

  const expires = dayjs(new Date()).add(60, 'day').unix()

  let put: PutCommandInput = {
    TableName: process.env.NOTEDOWN_DB_NAME,
    Item: {
      pk: `USER#${id}`,
      sk: `NOTES#${id}`,
      notes: JSON.stringify(body.notes),
      type: 'NOTES',
      expires: expires,
      lastUpdate: body.lastUpdate
    }
  }

  try {
    const data = await client.put(put)

    if (data.$metadata.httpStatusCode !== 200) {
      throw new Error('Internal error')
    }

    return Promise.resolve({
      success: true,
      type: 'synced',
      data: {
        notes: body.notes,
        lastSync: expires,
        lastUpdate: body.lastUpdate
      }
    })
  } catch (err) {
    return Promise.resolve({
      success: false,
      type: 'error',
      error: {
        code: 500,
        message: 'PUT: service error'
      }
    })
  }
}

export default syncNotes
