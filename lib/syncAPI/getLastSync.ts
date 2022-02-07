import { DynamoDBDocument, GetCommandInput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { LastSyncResponse } from './types'

const getLastSync = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { client, id }: { client: DynamoDBDocument; id: string }
): Promise<LastSyncResponse> => {
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
      return Promise.resolve({
        success: true,
        data: {
          notes: JSON.parse(data.Item.lastSync)
        }
      })
    }

    throw new Error('Internal Error')
  } catch (err) {
    return Promise.resolve({
      success: true,
      error: {
        message: 'Internal Error',
        code: 500
      }
    })
  }
}

export default getLastSync
