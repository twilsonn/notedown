import { Note } from '../../store/reducers/notesSlicer/types'

type SyncResponse = {
  success: boolean
  type: 'synced' | 'desynced' | 'error' | 'conflicts'
  error?: {
    message: string
    code: number
  }
  data?: {
    notes: Note[]
    lastSync: number
  }
}

type LastSyncResponse = {
  success: boolean
  error?: {
    message: string
    code: number
  }
  lastSync?: number
}

export type { LastSyncResponse, SyncResponse }
