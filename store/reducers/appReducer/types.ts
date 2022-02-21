type AppStateInterface = {
  navOpen: boolean
}

const initialState: AppStateInterface = {
  navOpen: true
}

export type AppState = typeof initialState

export type { AppStateInterface }

export default initialState
