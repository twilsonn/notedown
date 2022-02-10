import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { useAppDispatch, useAppSelector } from '../../store'
import { newNote, openNote } from '../../store/reducers/notesSlicer'

import NotesLoader from './NotesLoader'
import NoteCard from './NoteCard'

import Logo from '../../assets/Logo'
import { PlusIcon } from '@heroicons/react/solid'

const Notes: React.FC = () => {
  const noteState = useAppSelector((state) => state.notes.present)

  const { openedNote, notes, syncing, lastSync } = noteState

  const dispatch = useAppDispatch()

  return (
    <>
      <header className="p-4 h-24 flex items-center ">
        <Logo className="w-10 h-10 cursor-pointer" />
        <h1 className="ml-2 text-3xl font-semibold text-gray-800 dark:text-stone-200 select-none">
          Notedown
        </h1>
      </header>
      <div className="border-t dark:border-stone-800 transition-colors">
        <div className="px-4 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-lg dark:text-stone-200 select-none">
            Notes
          </h2>
          <button
            onClick={() => dispatch(newNote())}
            className={`px-2 py-1 border flex items-center justify-center rounded-md group text-sm select-none
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

      <PerfectScrollbar>
        {lastSync === null && syncing ? (
          <ul className="space-y-4 px-4 overflow-y-auto pb-4 pt-1.5">
            <NotesLoader />
            <NotesLoader />
            <NotesLoader />
            <NotesLoader />
            <NotesLoader />
          </ul>
        ) : (
          <ul className="space-y-4 px-4 overflow-y-auto pb-4 pt-1.5">
            {notes.map((note) => (
              <li key={note.id}>
                <NoteCard
                  onClick={() => dispatch(openNote(note.id))}
                  note={note}
                  open={openedNote && note.id === openedNote.id ? true : false}
                />
              </li>
            ))}
          </ul>
        )}
      </PerfectScrollbar>
    </>
  )
}

export default Notes
