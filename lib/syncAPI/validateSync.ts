import { Note } from '../../store/reducers/notesSlicer/types'

type ValidationResponse = 'valid' | 'conflicts' | 'invalid'
/**
 * validateSync - Checks if the current state notes matches the synced database notes
 * @param  {Note[]} currentNotes Notes saved in state
 * @param  {Note[]} newNotes Notes saved in database
 * @return {ValidationResponse}
 */
const validateSync = (
  currentNotes: Note[],
  newNotes: Note[]
): ValidationResponse => {
  const checkIdentical =
    JSON.stringify(currentNotes) === JSON.stringify(newNotes)

  const checkForNewNotes = currentNotes.length >= newNotes.length

  console.log(checkIdentical)

  const checkVersions = currentNotes.some((n1) => {
    return newNotes.some((n2) => {
      if (n1.id === n2.id && n1.updatedAt < n2.updatedAt) {
        console.log(n1.updatedAt, n2.updatedAt)
        console.log(n1.title, n2.title)
        return true
      }
    })
  })

  if (checkIdentical) {
    return 'valid'
  } else if (!checkIdentical && checkVersions) {
    return 'conflicts'
  } else {
    return 'invalid'
  }
}

export default validateSync
