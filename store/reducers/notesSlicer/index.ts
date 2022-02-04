import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import initialState, { NotesState, Note } from './types'

const newNoteAction: CaseReducer<NotesState> = (state) => {
  const d = new Date(Date.now()).getTime()

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
      title: '',
      createdAt: d,
      updatedAt: d,
      saved: true
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
      id: action.payload.id,
      note: action.payload
    }
  }
}

const openNoteAction: CaseReducer<NotesState, PayloadAction<string>> = (
  state,
  action
) => {
  return {
    ...state,
    openedNote: {
      id: action.payload,
      note: state.notes.filter((n) => n.id === action.payload)[0]
    }
  }
}

const toggleNoteSavedAction: CaseReducer<NotesState> = (state) => {
  return state.openedNote
    ? {
        ...state,
        openedNote: {
          ...state.openedNote,
          note: {
            ...state.openedNote?.note,
            saved: false
          }
        }
      }
    : state
}

const removeNoteAction: CaseReducer<NotesState, PayloadAction<string>> = (
  state,
  action
) => {
  return {
    ...state,
    notes: state.notes.filter((n) => n.id !== action.payload),
    openedNote:
      state.openedNote?.id === action.payload ? undefined : state.openedNote
  }
}

const syncNotesAction: CaseReducer<
  NotesState,
  PayloadAction<{
    notes: string
    lastSync: number
  }>
> = (state, action) => {
  return {
    ...state,
    syncing: false,
    lastSync: action.payload.lastSync,
    notes: JSON.parse(action.payload.notes)
  }
}

const startSyncAction: CaseReducer<NotesState> = (state) => {
  return {
    ...state,
    syncing: true
  }
}
const cancelSyncNotesAction: CaseReducer<NotesState> = (state) => {
  return {
    ...state,
    syncing: false
  }
}

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    newNote: newNoteAction,
    updateNote: updateNoteAction,
    openNote: openNoteAction,
    removeNote: removeNoteAction,
    toggleNoteSaved: toggleNoteSavedAction,
    syncNotes: syncNotesAction,
    startSync: startSyncAction,
    cancelSyncNotes: cancelSyncNotesAction
  }
})

export const {
  newNote,
  updateNote,
  openNote,
  removeNote,
  toggleNoteSaved,
  syncNotes,
  startSync,
  cancelSyncNotes
} = NotesSlice.actions

export default NotesSlice
