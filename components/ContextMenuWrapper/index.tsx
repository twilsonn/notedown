import React, { useState } from 'react'

import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu'
import { useAppDispatch, useAppSelector } from '../../store'
import { newNote, openNote, removeNote } from '../../store/reducers/notesSlicer'

const ContextMenuWrapper: React.FC = ({ children }) => {
  const { toggleMenu, ...menuProps } = useMenuState()
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const [isNote, setIsNote] = useState(false)
  const [noteID, setNoteID] = useState('')

  const notes = useAppSelector((state) => state.notes.present.notes)

  const dispatch = useAppDispatch()

  return (
    <>
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
          {window.getSelection()?.toString() !== '' && (
            <MenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  window.getSelection()?.toString()!
                )
              }
            >
              Copy
            </MenuItem>
          )}
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
          <MenuItem onClick={() => dispatch(newNote())}>Add Note</MenuItem>
        </ControlledMenu>

        {children}
      </div>
    </>
  )
}

export default ContextMenuWrapper
