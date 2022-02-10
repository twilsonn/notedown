import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { AppState } from '../..'

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
    notes: newNotes,
    synced: false
  }
}

const updateNoteAction: CaseReducer<NotesState, PayloadAction<Note>> = (
  state,
  action
) => {
  let openedNoteIndex: number | undefined

  const newNotes = state.notes.map((n, i) => {
    if (n.id === action.payload.id) {
      openedNoteIndex = i
      return {
        ...action.payload,
        saved: true
      }
    }
    return n
  })

  return openedNoteIndex !== undefined
    ? {
        ...state,
        notes: newNotes,
        openedNote: {
          id: action.payload.id,
          note: newNotes[openedNoteIndex]
        },
        synced: false
      }
    : state
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
      state.openedNote?.id === action.payload ? undefined : state.openedNote,
    synced: false
  }
}

const updateNotesAction: CaseReducer<
  NotesState,
  PayloadAction<{ notes: Note[]; lastUpdate: number }>
> = (state, action) => {
  console.log(action.payload.notes)
  return {
    ...state,
    notes: action.payload.notes,
    openedNote: {
      id: action.payload.notes[0].id,
      note: action.payload.notes[0]
    },
    conflictModal: {
      show: false,
      syncedNotes: null,
      currentNotes: null,
      lastUpdate: null
    },
    lastUpdate: action.payload.lastUpdate,
    lastSync: new Date().getTime(),
    synced: true
  }
}

export const syncNotes = createAsyncThunk<
  { notes: Note[]; lastSync: number; lastUpdate?: number },
  boolean,
  { state: AppState }
>('notes/syncNotes', async (overwrite, api) => {
  const state = api.getState()

  try {
    const { success, type, data, error } = await fetch('api/sync', {
      method: 'post',
      body: JSON.stringify({
        notes: state.notes.present.notes,
        lastSync: state.notes.present.lastSync,
        lastUpdate: state.notes.present.lastUpdate,
        overwrite: overwrite
      })
    }).then((res) => res.json())

    if (success) {
      if (type === 'synced') {
        return { notes: data.notes, lastSync: data.lastSync }
      } else {
        return {
          notes: data.notes,
          lastSync: data.lastSync,
          lastUpdate: data.lastUpdate
        }
      }
    } else {
      throw new Error(data.error.message)
    }
  } catch (error) {
    throw new Error()
  }
})

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    newNote: newNoteAction,
    updateNote: updateNoteAction,
    openNote: openNoteAction,
    removeNote: removeNoteAction,
    toggleNoteSaved: toggleNoteSavedAction,
    updateNotes: updateNotesAction
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncNotes.pending, (state) => {
        state.syncing = true
      })
      .addCase(syncNotes.fulfilled, (state, action) => {
        if (action.payload.lastUpdate) {
          return {
            ...state,
            syncing: false,
            synced: false,
            lastSync: new Date().getTime(),
            conflictModal: {
              currentNotes: state.notes,
              syncedNotes: action.payload.notes,
              show: true,
              lastUpdate: action.payload.lastUpdate
            }
          }
        } else {
          return {
            ...state,
            syncing: false,
            synced: true,
            notes: action.payload.notes,
            lastSync: new Date().getTime(),
            openedNote:
              state.openedNote && action.payload.notes.length > 0
                ? {
                    ...state.openedNote,
                    note: action.payload.notes[0]
                  }
                : undefined,
            conflictModal: {
              currentNotes: null,
              syncedNotes: null,
              show: false,
              lastUpdate: null
            }
          }
        }
      })
      .addCase(syncNotes.rejected, (state) => {
        return {
          ...state,
          synced: false,
          syncing: false
        }
      })
  }
})

export const {
  newNote,
  updateNote,
  openNote,
  removeNote,
  toggleNoteSaved,
  updateNotes
} = NotesSlice.actions

export default NotesSlice
