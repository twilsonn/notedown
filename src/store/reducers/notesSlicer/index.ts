import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import type { RootState } from '../../index'
import initialState, { NotesState, Note } from './types'

const newNoteAction: CaseReducer<NotesState> = (state) => {
  const newNotes: Note[] = [
    ...state.notes,
    {
      id: uuid(),
      content: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: {
              textAlign: 'left',
              level: 1
            }
          }
        ]
      },
      title: ''
    }
  ]

  return {
    ...state,
    openedNote: {
      id: newNotes[newNotes.length - 1].id,
      note: newNotes[newNotes.length - 1]
    },
    notes: newNotes
  }
}

const updateNoteAction: CaseReducer<NotesState, PayloadAction<Note>> = (
  state,
  action
) => {
  return {
    ...state,
    notes: state.notes.map((n) =>
      n.id === action.payload.id ? action.payload : n
    ),
    openedNote: {
      ...state.openedNote,
      note: action.payload
    }
  }
}

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    newNote: newNoteAction,
    updateNote: updateNoteAction
  }
})

export const { newNote, updateNote } = NotesSlice.actions

export const selectNote = (state: RootState) => state.present.notes

export default NotesSlice.reducer
