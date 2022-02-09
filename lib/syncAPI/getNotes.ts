import { DynamoDBDocument, GetCommandInput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Note } from '../../store/reducers/notesSlicer/types'
import { SyncResponse } from './types'
import validateSync from './validateSync'

const getNotes = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { client, id }: { client: DynamoDBDocument; id: string }
): Promise<SyncResponse> => {
  let body:
    | {
        notes: Note[]
        lastSync: number
        lastUpdate: number
      }
    | undefined = undefined

  try {
    body = JSON.parse(req.body)
  } catch (error) {}

  let get: GetCommandInput = {
    TableName: process.env.NOTEDOWN_DB_NAME,
    Key: {
      pk: `USER#${id}`,
      sk: `NOTES#${id}`
    }
  }

  try {
    const { Item } = await client.get(get)

    if (!Item) {
      return Promise.resolve({
        success: false,
        type: 'desynced',
        error: {
          code: 204,
          message: 'getSync: service error - Notes not found'
        }
      })
    }

    const data = {
      notes: JSON.parse(Item.notes),
      lastSync: Item.expires,
      lastUpdate: Item.lastUpdate
    }

    if (!body || body.lastUpdate < Item.lastUpdate) {
      // * If local hasn't synced or both versions are the same => return last synced version
      return Promise.resolve({
        success: true,
        type: 'conflicts',
        data
      })
    } else if (!body || body.lastSync === null) {
      // * If local hasn't synced or both versions are the same => return last synced version
      return Promise.resolve({
        success: true,
        type: 'synced',
        data
      })
    } else if (body.lastSync < Item.expires) {
      // * If local last sync is less than DB last sync => ask user which one they want
      return Promise.resolve({
        success: true,
        type: 'error',
        data
      })
    }

    // * Update values in DB
    return Promise.resolve({
      success: true,
      type: 'desynced'
    })
  } catch (err) {
    console.log(err)
    return Promise.reject({
      success: false,
      type: 'error',
      error: {
        code: 500,
        message: 'Internal Error'
      }
    })
  }
}

export default getNotes
