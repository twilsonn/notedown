import React, { useMemo } from 'react'
import debounce from 'lodash.debounce'

import { useEditor, EditorContent } from '@tiptap/react'
import extensions from './extensions'

import { useAppDispatch, useAppSelector } from '../../store'
import { toggleNoteSaved, updateNote } from '../../store/reducers/notesSlicer'
import { Editor } from '@tiptap/core'
import Menu from './Menu'
import { motion } from 'framer-motion'

const TipTapEditor = () => {
  const openedNote = useAppSelector((state) => state.notes.present.openedNote)
  const dispatch = useAppDispatch()

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

  let editor = useEditor(
    {
      extensions,
      content: openedNote?.note.content,
      autofocus: 'end',
      onUpdate: ({ editor }) => {
        if (openedNote) {
          dispatch(toggleNoteSaved())
          debouncedUpdateOpenedNote(editor)
        }
      }
    },
    [openedNote?.id]
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {openedNote && editor && <Menu editor={editor} />}
      {openedNote && <EditorContent editor={editor} />}
    </motion.div>
  )
}

export default TipTapEditor
