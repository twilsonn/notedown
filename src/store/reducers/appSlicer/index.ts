import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import type { RootState } from '../../index'
import initialState, { AppState } from './types'

const toogleDarkModeAction: CaseReducer<AppState> = (state) => {
  return {
    ...state,
    isDark: !state.isDark
  }
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toogleDarkMode: toogleDarkModeAction
  }
})

export const { toogleDarkMode } = AppSlice.actions

export const selectApp = (state: RootState) => state.app

export default AppSlice.reducer
