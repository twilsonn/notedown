import React from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { generateHTML, generateText } from '@tiptap/react'
import extensions from 'components/Editor/extensions'

import Logo from 'assets/Logo'
import { PlusIcon } from '@heroicons/react/solid'
import { newNote, openNote } from 'store/reducers/notesSlicer'

const Note: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { title: string; content: string }
> = (props) => {
  const contentLength = 120
  const titleLength = 20

  const { title, content } = props

  return (
    <div
      className="prose px-3 py-2 bg-gray-200 rounded-lg cursor-pointer select-none"
      {...props}
    >
      <div className="flex justify-between items-center">
        <h4 className="m-0 capitalize">
          {title.length > titleLength
            ? title.substring(0, titleLength - 3) + '...'
            : title}
        </h4>
        <p className="text-xs m-0">updated at 16:45</p>
      </div>
      <p className="text-sm leading-tight wrap break-all">
        {content.length > contentLength
          ? content.substring(0, contentLength - 3) + '...'
          : content}
      </p>
    </div>
  )
}

const Notes: React.FC = () => {
  const notes = useAppSelector((state) => state.present.notes)
  const dispatch = useAppDispatch()

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
            onClick={() => dispatch(newNote())}
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
            <li key={note.id}>
              <Note
                onClick={() => dispatch(openNote(note))}
                title={note.title}
                content={generateText(note.content, extensions)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Notes
