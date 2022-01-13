import { v4 as uuid } from 'uuid'
import { Content } from '@tiptap/core'
import { defaultNote } from './defaultNote'

type Note = {
  id: string
  content: Content
}

interface NotesStateInterface {
  notes: Note[]
  openedNote: {
    id: string
    note: Note
  }
}

const notes: Note[] = [{ content: defaultNote, id: uuid() }]

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