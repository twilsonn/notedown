import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'

const Counter: React.FC = () => {
  const notes = useAppSelector((state) => state.notes.present.notes)
  const dispatch = useAppDispatch()

  return (
    <>
      <div>{notes[0].id}</div>
    </>
  )
}

export default Counter
