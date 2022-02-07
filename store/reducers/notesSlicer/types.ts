import { v4 as uuid } from 'uuid'
import { Content, JSONContent } from '@tiptap/core'
import { defaultNote } from './defaultNote'

type Note = {
  id: string
  title: string
  content: JSONContent
  updatedAt: number
  createdAt: number
  saved: boolean
}

interface NotesStateInterface {
  notes: Note[]
  openedNote:
    | {
        id: string
        note: Note
      }
    | undefined
  syncing: boolean
  synced: boolean
  lastSync: number | null
}

const d = new Date(Date.now()).getTime()

const notes: Note[] = [
  {
    id: uuid(),
    title: 'Your First Note',
    content: defaultNote,
    updatedAt: d,
    createdAt: d,
    saved: true
  }
]

const initialState: NotesStateInterface = {
  notes,
  openedNote: {
    id: notes[0].id,
    note: notes[0]
  },
  synced: false,
  syncing: false,
  lastSync: null
}

export type NotesState = typeof initialState

export type { Note, NotesStateInterface }

export default initialState
