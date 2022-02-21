import { CaseReducer, createSlice } from '@reduxjs/toolkit'

import initialState, { AppState as AppState } from './types'

const toggleNavBarAction: CaseReducer<AppState> = (state) => {
  return {
    ...state,
    navOpen: !state.navOpen
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
