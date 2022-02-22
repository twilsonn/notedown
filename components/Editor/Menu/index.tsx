import { ArrowLeftIcon, MenuIcon } from '@heroicons/react/solid'
import { Editor as CoreEditor } from '@tiptap/core'
import { EditorContentProps, EditorContentState } from '@tiptap/react'
import { useMediaQuery } from 'beautiful-react-hooks'

import React, { DetailedHTMLProps } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { toggleNavBar } from '../../../store/reducers/appReducer'
import { openNote } from '../../../store/reducers/notesSlicer'
import SelectFont from './SelectFont'
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
  > & { active: boolean }
> = (props) => {
  const { children, active } = props
  return (
    <button
      className={`menu_button ${active ? 'active' : ''}`}
      onClick={props.onClick}
    >
      {children}
    </button>
  )
}

const Menu: React.FC<{ editor: Editor }> = ({ editor }) => {
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.app.navOpen)

  const isLg = useMediaQuery('(min-width: 1024px)')

  const changeFont = (family: string) => {
    editor.commands.setFontFamily(family)
  }

  return (
    <div className="w-full sticky top-0 left-0 px-4 md:px-12 pt-4 z-10 flex space-x-2">
      <div
        onClick={() => {
          dispatch(toggleNavBar())
          if (!isLg) {
            dispatch(openNote(false))
          }
        }}
        className="rounded-lg p-4 flex justify-center items-center mb-8 cursor-pointer bg-gray-200 dark:bg-stone-900 bg-opacity-[99%] transition-colors"
      >
        {open ? (
          <ArrowLeftIcon className="w-6 h-6 m-1 text-gray-700 dark:text-stone-300" />
        ) : (
          <MenuIcon className="w-6 h-6 m-1 text-gray-700 dark:text-stone-300" />
        )}
      </div>
      <div className="rounded-lg p-4 pl-2 sm:pl-4 flex justify-center sm:justify-start space-x-2 mb-8 bg-gray-200 dark:bg-stone-900 bg-opacity-[99%] transition-colors">
        <SelectFont
          changeFont={changeFont}
          currentFont={editor.getAttributes('textStyle')['fontFamily']}
        />
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
        {/* <MenuButton active={false}>
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
        </MenuButton> */}
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
    </div>
  )
}

export default Menu
