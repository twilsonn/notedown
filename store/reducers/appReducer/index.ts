import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

import initialState, { AppState as AppState } from './types'

const toggleNavBarAction: CaseReducer<AppState, PayloadAction<boolean>> = (
  state,
  action
) => {
  return {
    ...state,
    navOpen: action.payload
  }
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleNavBar: toggleNavBarAction
  }
})

export const { toggleNavBar } = AppSlice.actions

export default AppSlice
