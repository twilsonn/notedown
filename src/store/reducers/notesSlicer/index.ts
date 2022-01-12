import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Content } from '@tiptap/core'

import type { RootState } from '../../index'
import initialState, { NotesState, Note } from './types'

const createNoteAction: CaseReducer<NotesState, PayloadAction<Note>> = (
  state,
  action
) => {
  return { ...state, notes: [...state.notes, action.payload] }
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
    createNote: createNoteAction,
    updateNote: updateNoteAction
  }
})

export const { createNote, updateNote } = NotesSlice.actions

export const selectNote = (state: RootState) => state.present.notes

export default NotesSlice.reducer
