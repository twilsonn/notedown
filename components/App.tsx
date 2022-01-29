import dynamic from 'next/dynamic'
import React from 'react'
import ContextMenuWrapper from './ContextMenuWrapper'
import ControlBar from './ControlBar'

import Notes from './Notes'

const LazyEditor = dynamic(() => import('./Editor'), {
  ssr: false
})

function App() {
  return (
    <div className="m-auto flex">
      <ContextMenuWrapper>
        <div className="fixed lg:flex flex-col h-full max-h-screen overflow-hidden pb-8 hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100 dark:bg-stone-900 transition-colors">
          <Notes />
        </div>
      </ContextMenuWrapper>
      <div className="flex flex-col w-full min-h-screen lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%] bg-white dark:bg-stone-800 transition-colors">
        <LazyEditor />
        <ControlBar />
      </div>
    </div>
  )
}

export default App
