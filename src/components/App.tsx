import React, { useState } from 'react'

import Tiptap from './Editor'
import Notes from './Notes'

import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import { useAppDispatch, useAppSelector } from 'hooks'
import { openNote, removeNote } from 'store/reducers/notesSlicer'

function App() {
  const { toggleMenu, ...menuProps } = useMenuState()
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const [isNote, setIsNote] = useState(false)
  const [noteID, setNoteID] = useState('')

  const notes = useAppSelector((state) => state.present.notes)
  const openedNote = useAppSelector((state) => state.present.openedNote)
  const dispatch = useAppDispatch()

  return (
    <div className="m-auto flex">
      <div
        onContextMenu={(e) => {
          e.preventDefault()

          const dataID = (e.target as HTMLInputElement).getAttribute('data-id')

          if (dataID) {
            setIsNote(true)
            setNoteID(dataID)
          }

          setAnchorPoint({ x: e.clientX, y: e.clientY })
          toggleMenu(true)
        }}
        className="fixed lg:flex flex-col min-h-screen hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100"
      >
        <ControlledMenu
          {...menuProps}
          anchorPoint={anchorPoint}
          onClose={() => {
            toggleMenu(false)
            setIsNote(false)
            setNoteID('')
          }}
        >
          {isNote && (
            <>
              <MenuItem onClick={() => dispatch(openNote(noteID))}>
                Open Note
              </MenuItem>
              <MenuItem onClick={() => dispatch(removeNote(noteID))}>
                Remove Note
              </MenuItem>
            </>
          )}
          <MenuItem>Add Note</MenuItem>
        </ControlledMenu>

        <Notes />
      </div>
      <div className="flex flex-col w-full lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%]">
        {openedNote && <Tiptap />}
      </div>
    </div>
  )
}

export default App
