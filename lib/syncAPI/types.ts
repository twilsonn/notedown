import { Note } from '../../store/reducers/notesSlicer/types'

type GetNotesValid = {
  success: boolean
  error?: {
    message: string
    code: number
  }
  data: {
    notes: Note[]
  }
}

type GetNotesConflicted = {
  success: boolean
  error?: {
    message: string
    code: number
  }
  data: {
    current_notes: Note[]
    synced_notes: Note[]
  }
}

type GetNotesError = {
  success: boolean
  error?: {
    message: string
    code: number
  }
}

export type SyncResponse = GetNotesValid | GetNotesConflicted | GetNotesError
