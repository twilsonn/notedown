import dayjs from 'dayjs'
import { Note } from '../../store/reducers/notesSlicer/types'

type ValidationResponse = 'valid' | 'conflicts' | 'invalid'
/**
 * validateSync - Checks if the current state notes matches the synced database notes
 * @param  {Note[]} newNotes Notes saved in state
 * @param  {Note[]} syncedNotes Notes saved in database
 * @return {ValidationResponse}
 */
const validateSync = (
  newNotes: Note[],
  syncedNotes: Note[]
): ValidationResponse => {
  const checkIdentical =
    JSON.stringify(newNotes) === JSON.stringify(syncedNotes)

  const checkForNewNotes = newNotes.length >= syncedNotes.length

  const checkVersions = newNotes.some((n1) => {
    return syncedNotes.some((n2) => {
      if (n1.id === n2.id) {
        console.log(dayjs(n1.updatedAt).diff(n2.updatedAt))
      }
      if (n1.id === n2.id && n1.updatedAt < n2.updatedAt) {
        return true
      }
    })
  })

  if (checkIdentical) {
    return 'valid'
  } else if (checkVersions) {
    return 'conflicts'
  } else {
    return 'invalid'
  }
}

export default validateSync
