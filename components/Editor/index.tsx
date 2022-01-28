import React, { useMemo } from 'react'
import debounce from 'lodash.debounce'

import { useEditor, EditorContent } from '@tiptap/react'
import extensions from './extensions'

import Menu from './Menu'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleNoteSaved, updateNote } from '../../store/reducers/notesSlicer'
import { Editor } from '@tiptap/core'

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
            updatedAt: new Date(Date.now()),
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
    <>
      {openedNote && editor && <Menu editor={editor} />}
      {openedNote && <EditorContent editor={editor} />}
    </>
  )
}

export default TipTapEditor
