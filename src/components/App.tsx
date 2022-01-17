import React from 'react'

import Tiptap from './Editor'
import Notes from './Notes'

function App() {
  return (
    <div className="m-auto flex">
      <div className="fixed lg:flex flex-col min-h-screen hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100">
        <Notes />
      </div>
      <div className="flex flex-col w-full min-h-screen lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%]">
        <Tiptap />
      </div>
    </div>
  )
}

export default App
