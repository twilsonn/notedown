import { createMigrate, PersistMigrate } from 'redux-persist'
import { RootState } from '.'
import initialState from './reducers/notesSlicer/types'

type PersistedRootStateV3 = RootState

/*
 * This is the current version and should match the latest version above (V3).
 */
export const persistVersion = 1

const persistMigrations = {
  [persistVersion]: async (
    state: PersistedRootStateV3
  ): Promise<PersistedRootStateV3> => {
    return {
      ...state,
      notes: {
        past: [],
        present: { ...initialState },
        future: [],
        _persist: {
          version: persistVersion,
          rehydrated: false
        }
      }
    }
  }
}

/*
 * A union type is created specifically to use below.
 */
type MigrationState = PersistedRootStateV3

export const persistMigrate = createMigrate<MigrationState>(persistMigrations)
