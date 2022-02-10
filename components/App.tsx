import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { syncNotes } from '../store/reducers/notesSlicer'
import ContextMenuWrapper from './ContextMenuWrapper'
import ControlBar from './ControlBar'

import Notes from './Notes'
import SyncConflict from './SyncConflict'

const LazyEditor = dynamic(() => import('./Editor'), {
  ssr: false
})

function App() {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const { syncing, lastSync } = useAppSelector((state) => state.notes.present)

  useEffect(() => {
    if (session?.user) {
      dispatch<any>(syncNotes(false))
    }
  }, [dispatch, session?.user])

  return (
    <div className="m-auto flex">
      <ContextMenuWrapper>
        <div className="fixed lg:flex flex-col h-full max-h-screen overflow-hidden pb-8 hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100 dark:bg-stone-900 transition-colors">
          <Notes />
        </div>
      </ContextMenuWrapper>
      <div className="flex flex-col w-full min-h-screen lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%] bg-white dark:bg-stone-800 transition-colors">
        {lastSync === null && syncing ? null : <LazyEditor />}
      </div>
      <SyncConflict />
      <ControlBar />
    </div>
  )
}

export default App
