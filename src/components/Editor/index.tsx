import React, { useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

import { useAppDispatch, useAppSelector } from 'hooks'
import { updateNote } from 'store/reducers/notesSlicer'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import extensions from './extensions'

import Menu from './Menu'
import LastSaved from './LastSaved'

import './styles.css'

const TipTapEditor = () => {
  const openedNote = useAppSelector((state) => state.present.openedNote)
  const dispatch = useAppDispatch()
  const [ls, setLastSaved] = useState<Date | undefined>(undefined)

  const updateOpenedNote = (e: Editor) => {
    dispatch(
      updateNote({
        id: openedNote.id,
        content: e.getJSON(),
        title: e.getText().split('\n')[0]
      })
    )

    const newLastSaved = new Date(Date.now())
    setLastSaved(newLastSaved)
  }

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor) => updateOpenedNote(editor), 500),
    [openedNote]
  )

  let editor = useEditor(
    {
      extensions,
      content: openedNote.note.content,
      onUpdate: ({ editor }) => {
        debouncedUpdateOpenedNote(editor)
        setLastSaved(undefined)
      }
    },
    [openedNote.id]
  )

  return (
    <>
      {editor && <Menu editor={editor} />}
      <EditorContent autoFocus editor={editor} />
      <LastSaved lastSaved={ls} />
    </>
  )
}

export default TipTapEditor
