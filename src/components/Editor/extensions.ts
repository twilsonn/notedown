import Document from '@tiptap/extension-document'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

import { ColorHighlighter } from './ColorHighligher'
import { SmilieReplacer } from './SmileReplacer'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Extensions } from '@tiptap/core'

const CustomDocument = Document.extend({
  content: 'heading block*'
})

const extensions: Extensions = [
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
]

export default extensions
