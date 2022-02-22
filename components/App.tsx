import React, { useCallback, useEffect, useState } from 'react'
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
  const open = useAppSelector((state) => state.app.navOpen)

  useEffect(() => {
    if (session?.user) {
      dispatch<any>(syncNotes(false))
    }
  }, [dispatch, session?.user])

  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2Xl = useMediaQuery('(min-width: 1536px)')

  const getSize = useCallback(
    (isSidebar: boolean) => {
      if (is2Xl) {
        return '20%'
      }

      if (isXl) {
        return '25%'
      }

      if (isLg) {
        return '33.333333%'
      }

      return isSidebar ? '0%' : '0%'
    },
    [isLg, isXl, is2Xl]
  )

  const [editorVariants, setEditorVariants] = useState<Variants>({
    open: { width: '100%', marginLeft: getSize(false) },
    closed: { width: '100%', marginLeft: 0 }
  })

  const [sidebarVariants, setSidebarVariants] = useState<Variants>({
    open: { translateX: 0, width: open ? getSize(true) : undefined },
    closed: { translateX: '-100%' }
  })

  useEffect(() => {
    const isSmall = !isLg && !isXl && !is2Xl
    setEditorVariants(
      isSmall
        ? {
            open: { width: '100%', translateX: '100%', marginLeft: 0 },
            closed: { width: '100%', translateX: '0%', marginLeft: 0 }
          }
        : {
            open: { width: '100%', marginLeft: getSize(false) },
            closed: { width: '100%', marginLeft: 0 }
          }
    )
    setSidebarVariants(
      isSmall
        ? {
            open: { width: '100%', translateX: '0%' },
            closed: { width: '100%', translateX: '-100%' }
          }
        : {
            open: { translateX: 0, width: open ? getSize(true) : undefined },
            closed: { translateX: '-100%' }
          }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLg, isXl, is2Xl, getSize, open])

  return (
    <div className="m-auto flex overflow-hidden w-screen h-screen">
      <MotionConfig transition={{ duration: 0.2 }}>
        <LayoutGroup>
          <ContextMenuWrapper key="aside">
            <motion.aside
              layout
              initial={false}
              animate={open ? 'open' : 'closed'}
              variants={sidebarVariants}
              className="fixed lg:flex flex-col h-full max-h-screen overflow-hidden pb-8 lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100 dark:bg-stone-900 transition-colors z-50"
            >
              <Notes />
            </motion.aside>
          </ContextMenuWrapper>

          <motion.div
            key="editor"
            layout
            initial={false}
            animate={open ? 'open' : 'closed'}
            variants={editorVariants}
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
