import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

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
import { motion } from 'framer-motion'

import { useSession } from 'next-auth/react'

const TipTapEditor = () => {
  const { openedNote, syncing, lastSync } = useAppSelector(
    (state) => state.notes.present
  )
  const dispatch = useAppDispatch()

  const [pos, setPos] = useState<number | null>(null)

  const { data: session } = useSession()

  const updateNoteDebounced = useDebouncedCallback((e: JSONContent) => {
    if (e.content && openedNote) {
      dispatch(
        updateNote({
          ...openedNote.note,
          content: e,
          title: e.content[0].content?.at(0)?.text || '',
          updatedAt: new Date(Date.now()).getTime()
        })
      )
    }
  }, 700)

  const toggleSyncDebounced = useDebouncedCallback(() => {
    if (openedNote?.note.saved) {
      dispatch(toggleNoteSaved())
    }
  }, 10)

  const syncNotesDebounced = useDebouncedCallback(() => {
    dispatch<any>(syncNotes(false))
  }, 5000)

  const editor = useEditor(
    {
      extensions,
      editable: !syncing,
      content: openedNote?.note.content,
      onCreate: ({ editor }) => {
        pos ? editor.commands.focus(pos) : editor.commands.focus('end')
      },
      onUpdate: ({ editor }) => {
        if (openedNote) {
          if (openedNote.note.saved) {
            toggleSyncDebounced()
          }
          updateNoteDebounced(editor.getJSON())

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

  return editor && openedNote ? (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </motion.div>
  ) : null
}

export default TipTapEditor
