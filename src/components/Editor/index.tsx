import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Code from '@tiptap/extension-code'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { ColorHighlighter } from './ColorHighligher'
import { SmilieReplacer } from './SmileReplacer'
import './styles.css'

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
      <div className="w-full rounded-lg bg-gray-100 p-4 flex space-x-2 mb-8">
        <div className="h-8 flex items-center rounded-md bg-gray-300 px-2">
          Times Roman
        </div>
        <button className="w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400">
          B
        </button>
        <button className="w-8 h-8 bg-gray-300 rounded-md italic">I</button>
        <button className="w-8 h-8 bg-gray-300 rounded-md">U</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
