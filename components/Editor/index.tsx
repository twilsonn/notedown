import React, { useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

import { useEditor, EditorContent } from '@tiptap/react'
import extensions from './extensions'

import { useAppDispatch, useAppSelector } from '../../store'
import {
  syncNotes,
  toggleNoteSaved,
  updateNote
} from '../../store/reducers/notesSlicer'
import { Editor } from '@tiptap/core'
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

  const debouncedSync = useMemo(() => {
    return debounce(() => {
      openedNote?.note.saved ? dispatch<any>(syncNotes(false)) : null
    }, 5000)
  }, [dispatch, openedNote?.note.saved])

  const updateOpenedNote = useMemo(() => {
    return (e: Editor) => {
      if (openedNote) {
        dispatch(
          updateNote({
            ...openedNote.note,
            content: e.getJSON(),
            title: e.getText().split('\n')[0],
            updatedAt: new Date(Date.now()).getTime()
          })
        )

        if (session?.user) {
          debouncedSync()
        }
      }
    }
  }, [debouncedSync, dispatch, openedNote, session?.user])

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor: Editor) => updateOpenedNote(editor), 700),
    [updateOpenedNote]
  )

  let editor = useEditor(
    {
      extensions,
      editable: !syncing,
      content: openedNote?.note.content,
      onCreate: ({ editor }) => {
        pos ? editor.commands.focus(pos) : editor.commands.focus('end')
      },
      onUpdate: ({ editor }) => {
        if (openedNote) {
          dispatch(toggleNoteSaved())
          debouncedUpdateOpenedNote(editor)
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
