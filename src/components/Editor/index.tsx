import React, { useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

import { useEditor, EditorContent, Editor } from '@tiptap/react'

import Menu from './Menu'

import './styles.css'
import { useAppDispatch, useAppSelector } from 'hooks'
import { updateNote } from 'store/reducers/notesSlicer'
import LastSaved from './LastSaved'
import extensions from './extensions'

const TipTapEditor = () => {
  const openedNote = useAppSelector((state) => state.present.openedNote)
  const dispatch = useAppDispatch()
  const [ls, setLastSaved] = useState<Date | null>(null)

  const updateOpenedNote = (e: Editor) => {
    console.log('updated')
    const content = e.getJSON()
    dispatch(
      updateNote({
        id: openedNote.id,
        content,
        title: e.getText().split('\n')[0]
      })
    )

    const newLastSaved = new Date(Date.now())
    setLastSaved(newLastSaved)
  }

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor) => updateOpenedNote(editor), 1000),
    [openedNote]
  )

  let editor = useEditor(
    {
      extensions,
      onCreate: ({ editor }) => {
        editor.commands.setContent(openedNote.note.content)
      },
      onUpdate: ({ editor }) => {
        console.log('updating')
        debouncedUpdateOpenedNote(editor)
        setLastSaved(null)
      }
    },
    [openedNote]
  )

  return (
    <>
      {editor && <Menu editor={editor} />}
      <EditorContent editor={editor} />
      {ls && <LastSaved lastSaved={ls} />}
    </>
  )
}

export default TipTapEditor
