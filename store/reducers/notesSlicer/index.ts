import {
  AnyAction,
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction
} from '@reduxjs/toolkit'
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
        }
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
      state.openedNote?.id === action.payload ? undefined : state.openedNote
  }
}

export const syncNotes = createAsyncThunk<Note[], Note[]>(
  'notes/syncNotes',
  async (notes, api) => {
    try {
      const { success, data, error } = await fetch('api/sync', {
        method: 'post',
        body: JSON.stringify({
          notes
        })
      }).then((res) => res.json())

      if (success) {
        console.log('Notes are up to date.')
        return data.notes
      } else if (success === false && error.code === 202) {
        console.log('Notes have conflicts. Please resolve them')
        throw new Error()
      } else {
        throw new Error(data.error.message)
      }
    } catch (error) {
      throw new Error()
    }
  }
)

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
        state.notes = action.payload
        if (state.openedNote) {
          state.openedNote = {
            ...state.openedNote,
            note: action.payload.filter((n) => n.id === state.openedNote?.id)[0]
          }
        }
      })
      .addCase(syncNotes.rejected, (state) => {
        state.syncing = true
      })
  }
})

export const { newNote, updateNote, openNote, removeNote, toggleNoteSaved } =
  NotesSlice.actions

export default NotesSlice
