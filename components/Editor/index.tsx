import React, { useMemo } from 'react'
import debounce from 'lodash.debounce'

import { useEditor, EditorContent } from '@tiptap/react'
import extensions from './extensions'

import { useAppDispatch, useAppSelector } from '../../store'
import {
  cancelSyncNotes,
  startSync,
  syncNotes,
  toggleNoteSaved,
  updateNote
} from '../../store/reducers/notesSlicer'
import { Editor } from '@tiptap/core'
import Menu from './Menu'
import { motion } from 'framer-motion'

import PerfectScrollbar from 'react-perfect-scrollbar'
import session from 'redux-persist/lib/storage/session'
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
        dispatch(
          updateNote({
            id: openedNote.id,
            content: e.getJSON(),
            title: e.getText().split('\n')[0],
            updatedAt: new Date(Date.now()).getTime(),
            createdAt: openedNote.note.createdAt,
            saved: true
          })
        )
      }
    }
  }, [dispatch, openedNote])

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor: Editor) => updateOpenedNote(editor), 500),
    [updateOpenedNote]
  )

  const sync = useMemo(() => {
    return () => {
      if (session?.user) {
        dispatch(startSync())

        return fetch('api/sync', {
          method: 'post',
          body: JSON.stringify({
            notes: notes,
            lastSync: new Date().getTime()
          })
        })
          .then((res) => res.json())
          .then((data: { notes: string; lastSync: number }) => {
            dispatch(syncNotes(data))
          })
          .catch(() => {
            dispatch(cancelSyncNotes())
          })
      }
    }
  }, [dispatch, notes, session?.user])

  const debouncedSync = useMemo(() => debounce(() => sync(), 2000), [sync])

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
          debouncedSync()
        }
      }
    },
    [openedNote?.id, syncing]
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
