import React from 'react'
import { generateText } from '@tiptap/react'

import { Note } from '../../store/reducers/notesSlicer/types'
import extensions from '../Editor/extensions'
import TimeAgo from '../TimeAgo'

const NoteCard: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & {
    note: Note
    open: boolean
  }
> = (props) => {
  const contentLength = 120
  const titleLength = 20

  const { note, open } = props
  const { title, updatedAt } = note

  const content = generateText(note.content, extensions)

  const noteTitle =
    title.length > titleLength
      ? title.substring(0, titleLength - 3) + '...'
      : title

  return (
    <button
      data-note
      data-id={note.id}
      className={`note-card prose dark:prose-invert ${
        open === true ? 'active' : ''
      }`}
      {...props}
    >
      <div className="flex justify-between items-center pointer-events-none">
        <h4 className="m-0 capitalize">
          {!title ? 'Untitled Note' : noteTitle}
        </h4>
        <p className="text-xs m-0">
          <TimeAgo date={new Date(updatedAt)} />
        </p>
      </div>
      <p className="pointer-events-none text-sm leading-tight wrap break-all">
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
