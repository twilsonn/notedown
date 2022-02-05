import React, { useMemo } from 'react'
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

import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSession } from 'next-auth/react'

const TipTapEditor = () => {
  const { openedNote, notes, lastSync, syncing } = useAppSelector(
    (state) => state.notes.present
  )
  const dispatch = useAppDispatch()

  const { data: session } = useSession()

  const updateOpenedNote = useMemo(() => {
    return (e: Editor) => {
      if (openedNote) {
        const newTime = new Date(Date.now()).getTime()

        const newOpenedNote = {
          ...openedNote.note,
          content: e.getJSON(),
          title: e.getText().split('\n')[0],
          updatedAt: newTime
        }

        console.log('Updated time', newTime)

        dispatch(updateNote(newOpenedNote))

        if (session?.user) {
          dispatch<any>(
            syncNotes(
              notes.map((n) => {
                if (n.id === openedNote.id) {
                  return newOpenedNote
                }
                return n
              })
            )
          )
        }
      }
    }
  }, [dispatch, notes, openedNote, session])

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor: Editor) => updateOpenedNote(editor), 500),
    [updateOpenedNote]
  )

  let editor = useEditor(
    {
      extensions,
      editable: !syncing,
      content: openedNote?.note.content,
      autofocus: 'end',
      onUpdate: ({ editor }) => {
        if (openedNote) {
          dispatch(toggleNoteSaved())
          debouncedUpdateOpenedNote(editor)
        }
      }
    },
    [openedNote?.id, session]
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {openedNote && editor && <Menu editor={editor} />}
      <PerfectScrollbar>
        {openedNote && <EditorContent editor={editor} />}
      </PerfectScrollbar>
    </motion.div>
  )
}

export default TipTapEditor
