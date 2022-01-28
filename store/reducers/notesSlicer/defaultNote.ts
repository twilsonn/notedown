export const defaultNote = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 1
      },
      content: [
        {
          type: 'text',
          text: "It'll always have a heading …"
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      },
      content: [
        {
          type: 'text',
          text: '… Testing.'
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      },
      content: [
        {
          type: 'text',
          text: "→ With the Typography extension, tiptap understands »what you mean« and adds correct characters to your text — it's like a “typography nerd” on your side."
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      },
      content: [
        {
          type: 'text',
          text: 'Try it out and type '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '(c)'
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '->'
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '>>'
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '1/2'
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '!='
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '--'
        },
        {
          type: 'text',
          text: ' or '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '1x1'
        },
        {
          type: 'text',
          text: ' here:'
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      }
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      },
      content: [
        {
          type: 'text',
          text: 'Or add completely custom input rules. We added a custom extension here that replaces smilies like '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: ':-)'
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '<3'
        },
        {
          type: 'text',
          text: ' or '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: '>:P'
        },
        {
          type: 'text',
          text: ' with emojis. Try it out:'
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      }
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left'
      },
      content: [
        {
          type: 'text',
          text: 'You can also teach the editor new things. For example to recognize hex colors and add a color swatch on the fly: #FFF, #0D0D0D, #616161, #A975FF, #FB5151, #FD9170, #FFCB6B, #68CEF8, #80cbc4, #9DEF8F'
        }
      ]
    }
  ]
}
