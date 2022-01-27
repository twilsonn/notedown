import { v4 as uuid } from 'uuid'
import { Content, JSONContent } from '@tiptap/core'
import { defaultNote } from './defaultNote'

type Note = {
  id: string
  title: string
  content: JSONContent
  updatedAt: Date
  createdAt: Date
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
}

const d = new Date(Date.now())

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
  }
}

export type NotesState = typeof initialState

export type { Note }

export default initialState
