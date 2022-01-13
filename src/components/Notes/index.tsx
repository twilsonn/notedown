import React from 'react'
import { generateHTML } from '@tiptap/react'
import extensions from 'components/Editor/extensions'

import { useAppSelector } from 'hooks'
import Logo from 'assets/Logo'
import NewNote from './NewNote'
import { PlusIcon } from '@heroicons/react/solid'

const Note: React.FC<{ title: string; content: string }> = ({
  title,
  content
}) => {
  const descrpition = content.replace(/<[^>]*>?/gm, '')
  const descrpitionLength = 120
  const titleLength = 30
  return (
    <div className="prose px-3 py-2 bg-gray-200 rounded-lg">
      <div className="flex justify-between items-center">
        <h4 className="m-0 capitalize">
          {title.length > titleLength
            ? title.substring(0, titleLength - 3) + '...'
            : title}
        </h4>
        <p className="text-xs m-0">updated at 16:45</p>
      </div>
      <p className="text-sm leading-tight">
        {descrpition.length > descrpitionLength
          ? descrpition.substring(0, descrpitionLength - 3) + '...'
          : descrpition}
      </p>
    </div>
  )
}

const Notes: React.FC = () => {
  const notes = useAppSelector((state) => state.present.notes)
  const openedNote = useAppSelector((state) => state.present.openedNote)

  return (
    <>
      <header className="p-4 h-24 flex items-center">
        <Logo className="w-10 h-10" />
        <h1 className="ml-2 text-3xl font-semibold text-gray-800">Notedown</h1>
      </header>
      <div className="border-t">
        <div className="px-4 py-4 mb-1 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Notes</h2>
          <button
            className={`px-2 py-1 border flex items-center justify-center rounded-md group text-sm bg-white text-gray-600
              hover:ring-1 hover:border-blue-400 hover:ring-blue-400 hover:bg-gray-50 hover:text-gray-800
              focus:ring-1 focus:border-blue-400 focus:ring-blue-400 focus:outline-none`}
          >
            New Note{' '}
            <span className="ml-1">
              <PlusIcon className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </span>
          </button>
        </div>

        <ul className="space-y-4 px-4">
          {notes.map((note) => (
            <li>
              <Note
                title={note.title}
                content={generateHTML(note.content, extensions)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Notes
