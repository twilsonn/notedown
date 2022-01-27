import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'
import {
  configureStore,
  createSlice,
  EnhancedStore,
  ThunkAction
} from '@reduxjs/toolkit'
import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  Store
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer, Persistor } from 'redux-persist'

import storage from './sync_storage'
import undoable from 'redux-undo'

import notesReducer, { NotesSlice } from './reducers/notesSlicer'

// BINDING MIDDLEWARE
const bindMiddleware = (middleware: Middleware<any>[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = () => {
  // if (isServer) {
  //   return configureStore({
  //     reducer: {
  //       [notesReducer.name]: undoable(notesReducer.reducer)
  //     },
  //     devTools: true,
  //     middleware: bindMiddleware([thunkMiddleware])
  //   })
  // } else {
  const persistConfig = {
    key: 'nextjs',
    whitelist: ['counter'],
    storage
  }

  const persistedNoteReducer = persistReducer(
    {
      key: 'notes',
      storage
    },
    undoable(notesReducer.reducer)
  )

  const combinedReducer = combineReducers({
    notes: persistedNoteReducer
  })

  const persistedReducer = persistReducer(persistConfig, combinedReducer)

  const store: Store & { __persistor: Persistor } = createStore(
    persistedReducer,
    bindMiddleware([thunkMiddleware])
  )

  store.__persistor = persistStore(store)

  return store
  // }
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
