import { Editor as CoreEditor } from '@tiptap/core'
import { EditorContentProps, EditorContentState } from '@tiptap/react'

import React, {
  ButtonHTMLAttributes,
  Children,
  DetailedHTMLProps,
  MouseEventHandler
} from 'react'
declare class Editor extends CoreEditor {
  contentComponent: React.Component<
    EditorContentProps,
    EditorContentState
  > | null
}

const MenuButton: React.FC<
  DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { active?: boolean }
> = (props) => {
  const { children, active } = props
  return (
    <button
      className={`w-8 h-8   hover:text-gray-800 flex items-center justify-center rounded-md hover:bg-gray-300 hover:ring-2 hover:ring-blue-400 ${
        active ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-600'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

const Menu: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className="w-full rounded-lg bg-gray-100 p-4 flex space-x-2 mb-8">
      <div
        onClick={() => {}}
        className="h-8 flex items-center rounded-md bg-gray-300 px-2"
      >
        Times Roman
      </div>
      {/* BOLD */}
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        </svg>
      </MenuButton>
      {/* UNDERLINE */}
      <MenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
          <line x1="4" y1="21" x2="20" y2="21"></line>
        </svg>
      </MenuButton>
      {/* ITALICS */}
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 4h-9M14 20H5M14.7 4.7L9.2 19.4" />
        </svg>
      </MenuButton>
      {/* TEXT TYPE */}
      <MenuButton>
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      </MenuButton>
      {/* LEFT ALIGN */}
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 9.5H3M21 4.5H3M21 14.5H3M17 19.5H3" />
        </svg>
      </MenuButton>
      {/* CENTER ALIGN */}
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9.5H5M21 4.5H3M21 14.5H3M19 19.5H5" />
        </svg>
      </MenuButton>
      {/* RIGHT ALIGN */}
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 9.5H7M21 4.5H3M21 14.5H3M21 19.5H7" />
        </svg>
      </MenuButton>
    </div>
  )
}

export default Menu
