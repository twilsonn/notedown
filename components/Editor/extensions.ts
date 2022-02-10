import Document from '@tiptap/extension-document'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { ColorHighlighter } from './Extenstions/ColorHighligher'
import { SmilieReplacer } from './Extenstions/SmileReplacer'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Extensions } from '@tiptap/core'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Bold from '@tiptap/extension-bold'
import Gapcursor from '@tiptap/extension-gapcursor'
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import Dropcursor from '@tiptap/extension-dropcursor'
import Code from '@tiptap/extension-code'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight/lib/common.js'

const CustomDocument = Document.extend({
  content: 'heading block*'
})

const extensions: Extensions = [
  CustomDocument,
  History.configure({
    newGroupDelay: 250
  }),

  Text,
  Heading,
  Blockquote,
  Paragraph,

  Underline,
  Italic,
  Bold,
  Strike,
  Code,
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: 'base16/github'
    }
  }),

  Gapcursor,
  Dropcursor,

  TextStyle,
  Typography,

  FontFamily.configure({
    types: ['textStyle']
  }),

  SmilieReplacer,
  ColorHighlighter,
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty font',
    placeholder: 'Write something …'
  })
]

export default extensions
