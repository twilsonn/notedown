import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { syncNotes } from '../store/reducers/notesSlicer'
import { Note } from '../store/reducers/notesSlicer/types'
import ContextMenuWrapper from './ContextMenuWrapper'
import ControlBar from './ControlBar'

import Notes from './Notes'

const LazyEditor = dynamic(() => import('./Editor'), {
  ssr: false
})

function App() {
  const { lastSync, notes } = useAppSelector((state) => state.notes.present)
  const dispatch = useAppDispatch()

  // const { data: session } = useSession()

  // const sync = () => {
  //   if (session?.user) {
  //     dispatch(startSync())

  //     console.log('LAST SYNC', lastSync)

  //     fetch('api/sync', {
  //       method: 'post',
  //       body: JSON.stringify({
  //         notes: notes,
  //         lastSync: lastSync
  //       })
  //     })
  //       .then((res) => res.json())
  //       .then((data: { notes: string; lastSync: number }) => {
  //         console.log('synced')
  //         dispatch(syncNotes(data))
  //       })
  //       .catch(() => {
  //         dispatch(cancelSyncNotes())
  //       })
  //   }
  // }

  // useEffect(() => {
  //   sync()
  // }, [session])

  return (
    <div className="m-auto flex">
      <ContextMenuWrapper>
        <div className="fixed lg:flex flex-col h-full max-h-screen overflow-hidden pb-8 hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100 dark:bg-stone-900 transition-colors">
          <Notes />
        </div>
      </ContextMenuWrapper>
      <div className="flex flex-col w-full min-h-screen lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%] bg-white dark:bg-stone-800 transition-colors">
        <LazyEditor />
      </div>
      <ControlBar />
    </div>
  )
}

export default App
