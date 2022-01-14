import { createStore } from '@reduxjs/toolkit'

import notesReducer from './reducers/notesSlicer'
import undoable from 'redux-undo'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'notes',
  storage
}

const persistedReducer = persistReducer(persistConfig, undoable(notesReducer))

const store = createStore(persistedReducer)

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default () => {
  return { store, persistor }
}
