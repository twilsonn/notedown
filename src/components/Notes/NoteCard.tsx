import React from 'react'
import { generateText } from '@tiptap/react'
import extensions from 'components/Editor/extensions'
import { Note } from 'store/reducers/notesSlicer/types'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

import ReactTimeAgo from 'react-time-ago'

const NoteCard: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & {
    note: Note
    active: boolean
  }
> = (props) => {
  const contentLength = 120
  const titleLength = 20

  const { note, active } = props
  const { title, updatedAt } = note

  const content = generateText(note.content, extensions)

  return (
    <button
      className={`w-full text-left prose px-3 py-2 rounded-lg cursor-pointer select-none group
        hover:bg-gray-300 
        focus:outline-none  focus:ring-2 focus:ring-blue-400  ${
          active ? 'bg-gray-300' : 'bg-gray-200'
        }`}
      {...props}
    >
      <div className="flex justify-between items-center">
        <h4
          className={`m-0 capitalize group-hover:text-black ${
            active ? 'text-black' : 'text-gray-800'
          }`}
        >
          {!title
            ? 'Untitled Note'
            : title.length > titleLength
            ? title.substring(0, titleLength - 3) + '...'
            : title}
        </h4>
        <p className="text-xs m-0">
          <ReactTimeAgo date={updatedAt} locale="en-US" timeStyle="twitter" />
        </p>
      </div>
      <p
        className={`text-sm leading-tight wrap break-all group-hover:text-black ${
          active ? 'text-black' : 'text-gray-700'
        }`}
      >
        {!content
          ? '...'
          : content.length > contentLength
          ? content.substring(0, contentLength - 3) + '...'
          : content}
      </p>
    </button>
  )
}

export default NoteCard
