import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import humanizeDuration from 'humanize-duration'

import { useEditor, EditorContent, Editor } from '@tiptap/react'

import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'

import { ColorHighlighter } from './ColorHighligher'
import { SmilieReplacer } from './SmileReplacer'
import Menu from './Menu'

import './styles.css'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { useAppDispatch, useAppSelector } from 'hooks'
import { updateNote } from 'store/reducers/notesSlicer'
import LastSaved from './LastSaved'

const CustomDocument = Document.extend({
  content: 'heading block*'
})

const TipTapEditor = () => {
  const openedNote = useAppSelector((state) => state.present.openedNote)
  const dispatch = useAppDispatch()
  const [ls, setLastSaved] = useState<Date | null>(null)

  const updateOpenedNote = (e: Editor) => {
    console.log('updated')
    const content = e.getJSON()
    dispatch(updateNote({ id: openedNote.id, content }))

    const newLastSaved = new Date(Date.now())
    setLastSaved(newLastSaved)
  }

  const debouncedUpdateOpenedNote = useMemo(
    () => debounce((editor) => updateOpenedNote(editor), 1000),
    []
  )

  let editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false
      }),
      CustomDocument,
      TextStyle,
      FontFamily.configure({
        types: ['textStyle']
      }),
      Typography,
      ColorHighlighter,
      SmilieReplacer,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty font',
        placeholder: 'Write something …'
      })
    ],
    onCreate: ({ editor }) => {
      editor.commands.setContent(openedNote.note.content)
    },
    onUpdate: ({ editor }) => {
      console.log('updating')
      debouncedUpdateOpenedNote(editor)
      setLastSaved(null)
    }
  })

  return (
    <>
      {editor && <Menu editor={editor} />}
      <EditorContent editor={editor} />
      {ls && <LastSaved lastSaved={ls} />}
    </>
  )
}

export default TipTapEditor
