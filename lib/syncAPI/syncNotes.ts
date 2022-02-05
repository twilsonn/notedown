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
  } = JSON.parse(req.body)

  let put: PutCommandInput = {
    TableName: process.env.NOTEDOWN_DB_NAME,
    Item: {
      pk: `USER#${id}`,
      sk: `NOTES#${id}`,
      notes: JSON.stringify(body.notes),
      type: 'NOTES',
      expires: dayjs(new Date()).add(60, 'day').unix()
    }
  }

  try {
    const data = await client.put(put)

    if (data.$metadata.httpStatusCode !== 200) {
      throw new Error('Internal error')
    }

    return Promise.resolve({
      success: true,
      data: {
        notes: body.notes
      }
    })
  } catch (err) {
    return Promise.resolve({
      success: false,
      error: {
        code: 500,
        message: 'PUT: service error'
      }
    })
  }
}

export default syncNotes
