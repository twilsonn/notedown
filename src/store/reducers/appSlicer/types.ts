interface AppStateInterface {
  isDark: boolean
}

const initialState: AppStateInterface = {
  isDark: false
}

export type AppState = typeof initialState

export type { AppStateInterface }

export default initialState
