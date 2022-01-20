import { combineReducers, compose, createStore } from '@reduxjs/toolkit'

import AppReducer from './reducers/appSlicer'
import notesReducer from './reducers/notesSlicer'
import undoable from 'redux-undo'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistedNoteReducer = persistReducer(
  {
    key: 'notes',
    storage
  },
  undoable(notesReducer)
)

const persistedAppReducer = persistReducer(
  {
    key: 'app',
    storage
  },
  AppReducer
)

const reducers = combineReducers({
  notes: persistedNoteReducer,
  app: persistedAppReducer
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers())

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default () => {
  return { store, persistor }
}
