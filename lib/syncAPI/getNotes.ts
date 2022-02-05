import { DynamoDBDocument, GetCommandInput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { Note } from '../../store/reducers/notesSlicer/types'
import { SyncResponse } from './types'
import validateSync from './validateSync'

const getNotes = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { client, id }: { client: DynamoDBDocument; id: string }
): Promise<SyncResponse> => {
  const body: {
    notes: Note[]
  } = JSON.parse(req.body)

  let get: GetCommandInput = {
    TableName: process.env.NOTEDOWN_DB_NAME,
    Key: {
      pk: `USER#${id}`,
      sk: `NOTES#${id}`
    }
  }

  try {
    const data = await client.get(get)
    if (data.$metadata.httpStatusCode === 200 && data.Item) {
      const checkSync = validateSync(body.notes, JSON.parse(data.Item.notes))
      console.log(checkSync)
      if (checkSync === 'valid') {
        return Promise.resolve({
          success: true,
          data: {
            notes: JSON.parse(data.Item.notes)
          }
        })
      } else if (checkSync === 'conflicts') {
        return Promise.resolve({
          success: false,
          error: {
            message: 'sync failed. conflicts',
            code: 202
          },
          data: {
            current_notes: body.notes,
            synced_notes: JSON.parse(data.Item.notes)
          }
        })
      } else {
        return Promise.resolve({
          success: false,
          data: {
            notes: body.notes
          }
        })
      }
    }

    return Promise.resolve({
      success: false,
      error: {
        code: 204,
        message: 'GET: service error - Not found'
      }
    })
  } catch (err) {
    console.log(err)
    return Promise.resolve({
      success: false,
      error: {
        code: 500,
        message: 'GET: service error - Internal Error with DB'
      }
    })
  }
}

export default getNotes
