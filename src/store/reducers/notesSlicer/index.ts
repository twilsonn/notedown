import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../index'
import initialState, { NotesState, Note } from './types'

const createNoteAction: CaseReducer<NotesState, PayloadAction<Note>> = (
  state,
  action
) => {
  return { ...state, notes: [...state.notes, action.payload] }
}

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: createNoteAction
  }
})

export const { createNote } = NotesSlice.actions

export const selectNote = (state: RootState) => state.present.notes

export default NotesSlice.reducer
