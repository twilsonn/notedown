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
          text: 'Your First Note…'
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'center'
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold'
            }
          ],
          text: 'Disclaimer! Notedown is not intended to be used as a permanent note-taking app. Please do not store any sensitive information as this may not be recoverable. This is a portfolio project 🙂'
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
          marks: [
            {
              type: 'textStyle',
              attrs: {
                fontFamily: 'Inter'
              }
            }
          ],
          text: 'You can change the style of the text!'
        },
        {
          type: 'text',
          text: ' Press the buttons in the floating menu to change the styles to '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold'
            }
          ],
          text: 'bold'
        },
        {
          type: 'text',
          text: ', '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'underline'
            }
          ],
          text: 'underline'
        },
        {
          type: 'text',
          text: ' and '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'italic'
            }
          ],
          text: 'italic.'
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
          marks: [
            {
              type: 'italic'
            }
          ],
          text: 'Notedown also replaces text emojis to real emojis! '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'code'
            }
          ],
          text: ' :) :D :P '
        },
        {
          type: 'text',
          text: ' transforms into 🙂  😃  😛'
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
          text: 'Press ctrl + e to trigger a code component. This will stop emoji transforms.'
        }
      ]
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'js'
      },
      content: [
        {
          type: 'text',
          text: '// Notedown allows you to write code! \nconst triggerCode = "Simply type ```js to write JavaScript!"'
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
          text: 'Notedown displays previews of hex color codes: #38ff2e #2efff8 #ff2e58 #e72eff'
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
          marks: [
            {
              type: 'textStyle',
              attrs: {
                fontFamily: 'Comic Sans MS'
              }
            }
          ],
          text: 'Additionally, you can sign in via an OAuth method to sync notes between devices. Notedown will prompt you when there are any conflicts. All synced changes will be permanent so, you won’t be able to recover a previous version.'
        }
      ]
    }
  ]
}
