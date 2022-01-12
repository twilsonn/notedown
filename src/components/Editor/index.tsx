import React from 'react'

import { useEditor, EditorContent, generateHTML } from '@tiptap/react'

import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Code from '@tiptap/extension-code'

import { ColorHighlighter } from './ColorHighligher'
import { SmilieReplacer } from './SmileReplacer'
import Menu from './Menu'

import './styles.css'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { useAppSelector } from 'hooks'

const CustomDocument = Document.extend({
  content: 'heading block*'
})

const TipTapEditor = () => {
  const openedNote = useAppSelector((state) => state.present.openedNote)

  let editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false
      }),
      CustomDocument,
      // Paragraph,
      TextStyle,
      FontFamily.configure({
        types: ['textStyle']
      }),
      // Text,
      // Code,
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
    content: '',
    onCreate: ({ editor }) => {
      editor.commands.setContent(openedNote.note.content)
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      console.log(json)
    }
  })

  return (
    <>
      {editor && <Menu editor={editor} />}
      <EditorContent editor={editor} />
    </>
  )
}

export default TipTapEditor
