import React from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'

import Logo from 'assets/Logo'
import NoteCard from './NoteCard'
import { PlusIcon } from '@heroicons/react/solid'
import { newNote, openNote } from 'store/reducers/notesSlicer'

const Notes: React.FC = () => {
  const notes = useAppSelector((state) => state.notes.present.notes)
  const openedNote = useAppSelector((state) => state.notes.present.openedNote)
  const dispatch = useAppDispatch()

  return (
    <>
      <header className="p-4 h-24 flex items-center">
        <Logo className="w-10 h-10" />
        <h1 className="ml-2 text-3xl font-semibold text-gray-800 dark:text-stone-200">
          Notedown
        </h1>
      </header>
      <div className="border-t dark:border-stone-800 transition-colors">
        <div className="px-4 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-lg dark:text-stone-200">Notes</h2>
          <button
            onClick={() => dispatch(newNote())}
            className={`px-2 py-1 border flex items-center justify-center rounded-md group text-sm 
              bg-white text-gray-600 dark:bg-stone-700 dark:text-stone-300 transition-colors
              border-white dark:border-stone-700
              hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-stone-800 dark:hover:text-stone-200
              hover:ring-1 hover:border-blue-400 hover:ring-blue-400 
              focus:ring-1 focus:border-blue-400 focus:ring-blue-400 focus:outline-none`}
          >
            New Note{' '}
            <span className="ml-1">
              <PlusIcon className="w-4 h-4 text-gray-600 group-hover:text-gray-800 dark:text-stone-300 dark:group-hover:text-gray-200 transition-colors" />
            </span>
          </button>
        </div>
      </div>
      <ul className="space-y-4 px-4 overflow-y-auto py-4 scrollbar">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard
              onClick={() => dispatch(openNote(note.id))}
              note={note}
              active={note.id === openedNote?.id}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Notes
