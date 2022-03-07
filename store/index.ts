import { createWrapper } from 'next-redux-wrapper'
import { configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit'
import { Action, AnyAction, combineReducers, EmptyObject } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  persistStore,
  persistReducer,
  Persistor,
  createMigrate
} from 'redux-persist'
import undoable, { StateWithHistory } from 'redux-undo'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { PersistPartial } from 'redux-persist/lib/persistReducer'

import storage from './sync_storage'

import notesReducer from './reducers/notesSlicer'
import { NotesStateInterface } from './reducers/notesSlicer/types'

import appReducer from './reducers/appReducer'

import { persistMigrate, persistVersion } from './migrations'
import { AppStateInterface } from './reducers/appReducer/types'

const makeStore = () => {
  const persistConfig = {
    key: 'nextjs',
    storage,
    version: persistVersion,
    migrate: persistMigrate
  }

  const combinedReducer = combineReducers({
    notes: undoable(notesReducer.reducer, { limit: 10 }),
    app: appReducer.reducer
  })

  const persistedReducer = persistReducer(persistConfig, combinedReducer)

  const store: EnhancedStore<
    EmptyObject & {
      notes: StateWithHistory<NotesStateInterface>
      app: AppStateInterface
    } & PersistPartial,
    AnyAction,
    any
  > & { __persistor?: Persistor } = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false }).prepend(thunkMiddleware)
  })

  store.__persistor = persistStore(store)

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
