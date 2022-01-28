import React from 'react'
import App from '../components/App'
import { useAppDispatch, useAppSelector } from '../store'

const Counter: React.FC = () => {
  const notes = useAppSelector((state) => state.notes.present.notes)
  const dispatch = useAppDispatch()

  return (
    <>
      <App />
    </>
  )
}

export default Counter
