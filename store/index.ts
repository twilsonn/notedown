import { createWrapper } from 'next-redux-wrapper'
import { configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit'
import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  EmptyObject,
  Middleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import undoable, { StateWithHistory } from 'redux-undo'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { PersistPartial } from 'redux-persist/lib/persistReducer'

import storage from './sync_storage'

import notesReducer from './reducers/notesSlicer'
import { NotesStateInterface } from './reducers/notesSlicer/types'

// BINDING MIDDLEWARE
const bindMiddleware = (middleware: Middleware<any>[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = () => {
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

  const store: EnhancedStore<
    EmptyObject & {
      notes: StateWithHistory<NotesStateInterface> & PersistPartial
    } & PersistPartial,
    AnyAction,
    any
  > & { __persistor?: Persistor } = configureStore({
    reducer: persistedReducer,
    middleware: bindMiddleware([thunkMiddleware])
  })

  store.__persistor = persistStore(store)

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
