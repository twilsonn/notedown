import React, { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import extensions from './extensions'

import { useAppDispatch, useAppSelector } from '../../store'
import {
  syncNotes,
  toggleNoteSaved,
  updateNote
} from '../../store/reducers/notesSlicer'
import { JSONContent } from '@tiptap/core'
import Menu from './Menu'
import { domAnimation, LazyMotion, m } from 'framer-motion'

import { useSession } from 'next-auth/react'
import { useMediaQuery, useDebouncedCallback } from 'beautiful-react-hooks'

const TipTapEditor = () => {
  const { openedNote, syncing, lastSync } = useAppSelector(
    (state) => state.notes.present
  )
  const { opened } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const [pos, setPos] = useState<number | null>(null)
  const isLg = useMediaQuery('(min-width: 1024px)')

  const { data: session } = useSession()

  const updateNoteDebounced = useDebouncedCallback(
    (e: JSONContent, note: typeof openedNote) => {
      if (e.content && note !== undefined) {
        const title = () => {
          let content = e.content
          if (content && content[0]) {
            content = content[0].content
            if (content && content[0]) {
              return content[0].text
            }
          }
          return null
        }

        dispatch(
          updateNote({
            ...note.note,
            content: e,
            title: title() || '',
            updatedAt: new Date(Date.now()).getTime()
          })
        )
      }
    },
    [dispatch, updateNote],
    700
  )

  const toggleSyncDebounced = useDebouncedCallback(
    () => {
      if (openedNote?.note.saved) {
        dispatch(toggleNoteSaved())
      }
    },
    [dispatch, toggleNoteSaved, openedNote?.note.saved],
    10
  )

  const syncNotesDebounced = useDebouncedCallback(
    () => {
      dispatch<any>(syncNotes(false))
    },
    [dispatch, syncNotes],
    5000
  )

  const editor = useEditor(
    {
      extensions,
      editable: !syncing,
      content: openedNote?.note.content,
      onCreate: ({ editor }) => {
        if (isLg) {
          pos ? editor.commands.focus(pos) : editor.commands.focus('end')
        }
      },
      onUpdate: ({ editor }) => {
        if (openedNote) {
          if (openedNote.note.saved) {
            toggleSyncDebounced()
          }
          updateNoteDebounced(editor.getJSON(), openedNote)

          if (session?.user) {
            syncNotesDebounced()
          }
        }
      },
      onSelectionUpdate: ({ transaction }) => {
        pos === transaction.selection.anchor
          ? null
          : setPos(transaction.selection.anchor)
      }
    },
    [openedNote?.id, session, syncing, lastSync]
  )

  return editor && (!opened || openedNote) ? (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Menu editor={editor} />
        <EditorContent editor={editor} />
      </m.div>
    </LazyMotion>
  ) : null
}

export default TipTapEditor
