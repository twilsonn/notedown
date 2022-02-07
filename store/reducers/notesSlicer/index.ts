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

export const syncNotes = createAsyncThunk<
  { notes: Note[]; lastSync: number },
  void,
  { state: AppState }
>('notes/syncNotes', async (_, api) => {
  const state = api.getState()

  try {
    const { success, data, error } = await fetch('api/sync', {
      method: 'post',
      body: JSON.stringify({
        notes: state.notes.present.notes,
        lastSync: state.notes.present.lastSync
      })
    }).then((res) => res.json())

    if (success) {
      return { notes: data.notes, lastSync: data.lastSync }
    } else if (success === false && error.code === 202) {
      console.log('Notes have conflicts. Please resolve them')
      return { notes: data.notes, lastSync: data.lastSync }
    } else {
      throw new Error(data.error.message)
    }
  } catch (error) {
    throw new Error()
  }
})

export const detectSyncAlignment = createAsyncThunk<
  { lastSync: number },
  void,
  { state: AppState }
>('notes/detectSyncAlignment', async (_, api) => {
  const state = api.getState()
  try {
    const { success, data, error } = await fetch('api/lastSync', {
      method: 'get'
    }).then((res) => res.json())

    if (success) {
      if (data.lastSync === state.notes.present.lastSync) {
        return { lastSync: data.lastSync }
      }
    }

    throw new Error()
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
    toggleNoteSaved: toggleNoteSavedAction
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncNotes.pending, (state) => {
        state.syncing = true
      })
      .addCase(syncNotes.fulfilled, (state, action) => {
        state.syncing = false
        state.synced = true
        state.notes = action.payload.notes

        console.log('Payload Last Sync', action.payload.lastSync)

        state.lastSync = action.payload.lastSync

        if (state.openedNote && action.payload.notes.length > 0) {
          state.openedNote = {
            ...state.openedNote,
            note: action.payload.notes[0]
          }
        }
      })
      .addCase(syncNotes.rejected, (state) => {
        state.syncing = false
        state.synced = false
      })

      .addCase(detectSyncAlignment.rejected, (state) => {
        state.synced = false
      })
  }
})

export const { newNote, updateNote, openNote, removeNote, toggleNoteSaved } =
  NotesSlice.actions

export default NotesSlice
