import React from 'react'

import Tiptap from './Editor'
import Notes from './Notes'

function App() {
  return (
    <div className="m-auto">
      <div className="flex relative">
        <div className="min-h-screen max-w-sm w-full bg-gray-100">
          <Notes />
        </div>
        <div className="w-full min-h-screen focus:outline-none px-12 flex flex-col relative">
          <Tiptap />
        </div>
      </div>
    </div>
  )
}

export default App
