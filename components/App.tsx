import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'

import { useAppDispatch, useAppSelector } from '../store'
import { syncNotes } from '../store/reducers/notesSlicer'

import {
  LayoutGroup,
  motion,
  MotionConfig,
  useCycle,
  Variants
} from 'framer-motion'
import { useMediaQuery } from 'beautiful-react-hooks'

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

  const [open, cycleOpen] = useCycle(true, false)
  const [size, setSize] = useState('0%')

  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2Xl = useMediaQuery('(min-width: 1536px)')

  useEffect(() => {
    const getSize = () => {
      if (is2Xl) {
        return '20%'
      }

      if (isXl) {
        return '25%'
      }

      if (isLg) {
        return '33.333333%'
      }

      return '0%'
    }

    setSize(getSize())
  }, [isLg, isXl, is2Xl])

  const sidebarVariants: Variants = {
    open: { width: '100%', marginLeft: size },
    closed: { width: '100%', marginLeft: 0 }
  }

  const editorVariants: Variants = {
    open: { translateX: 0 },
    closed: { translateX: '-100%' }
  }

  return (
    <div className="m-auto flex">
      <MotionConfig transition={{ duration: 0.2 }}>
        <LayoutGroup>
          <ContextMenuWrapper key="aside">
            <motion.aside
              layout
              initial={'open'}
              animate={open ? 'open' : 'closed'}
              variants={editorVariants}
              className="fixed lg:flex flex-col h-full max-h-screen overflow-hidden pb-8 hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100 dark:bg-stone-900 transition-colors"
            >
              <Notes />
            </motion.aside>
          </ContextMenuWrapper>

          <motion.div
            key="editor"
            layout
            initial={'open'}
            animate={open ? 'open' : 'closed'}
            variants={sidebarVariants}
            onClick={() => cycleOpen()}
            className="flex flex-col w-full min-h-screen lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%] bg-white dark:bg-stone-800 transition-colors"
          >
            {lastSync === null && syncing ? null : <LazyEditor />}
          </motion.div>
        </LayoutGroup>
      </MotionConfig>

      <SyncConflict />
      <ControlBar />
    </div>
  )
}

export default App
