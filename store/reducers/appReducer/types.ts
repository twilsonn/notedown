type AppStateInterface = {
  navOpen: boolean
  opened: boolean
}

const initialState: AppStateInterface = {
  navOpen: true,
  opened: true
}

export type AppState = typeof initialState

export type { AppStateInterface }

export default initialState
