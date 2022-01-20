import React, { useEffect, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

import { useAppDispatch, useAppSelector } from 'hooks'
import { toggleNoteSaved, updateNote } from 'store/reducers/notesSlicer'

import {
  useEditor,
  EditorContent,
  Editor,
  PureEditorContent
} from '@tiptap/react'
import extensions from './extensions'

import Menu from './Menu'
import LastSaved from './LastSaved'

import './styles.css'

const TipTapEditor = () => {
  const openedNote = useAppSelector((state) => state.notes.present.openedNote)
  const dispatch = useAppDispatch()

  const updateOpenedNote = (e: Editor) => {
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

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor) => updateOpenedNote(editor), 500),
    [openedNote]
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
      <LastSaved />
    </>
  )
}

export default TipTapEditor
