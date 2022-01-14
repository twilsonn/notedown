import React from 'react'

import Tiptap from './Editor'
import Notes from './Notes'

function App() {
  return (
    <div className="m-auto flex">
      <div className="lg:flex flex-col min-h-screen hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100">
        <Notes />
      </div>
      <div className="flex flex-col w-full lg:w-2/3 xl:w-3/4 2xl:w-4/5">
        <Tiptap />
      </div>
    </div>
  )
}

export default App
