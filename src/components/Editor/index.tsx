import React from 'react'

import { useEditor, EditorContent } from '@tiptap/react'

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

const CustomDocument = Document.extend({
  content: 'heading block*'
})

export default () => {
  let editor = useEditor({
    extensions: [
      CustomDocument,
      Paragraph,
      Text,
      Code,
      Typography,
      ColorHighlighter,
      SmilieReplacer,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      StarterKit.configure({
        document: false
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        }
      })
    ],
    content: `
      <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>
      <p>
        → With the Typography extension, tiptap understands »what you mean« and adds correct characters to your text — it’s like a “typography nerd” on your side.
      </p>
      <p>
        Try it out and type <code>(c)</code>, <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, <code>--</code> or <code>1x1</code> here:
      </p>
      <p></p>
      <p>
        Or add completely custom input rules. We added a custom extension here that replaces smilies like <code>:-)</code>, <code><3</code> or <code>>:P</code> with emojis. Try it out:
      </p>
      <p></p>
      <p>
        You can also teach the editor new things. For example to recognize hex colors and add a color swatch on the fly: #FFF, #0D0D0D, #616161, #A975FF, #FB5151, #FD9170, #FFCB6B, #68CEF8, #80cbc4, #9DEF8F
      </p>
    `
  })

  return (
    <div>
      {editor && <Menu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
