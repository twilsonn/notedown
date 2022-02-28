import React, { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'

import { useAppDispatch, useAppSelector } from '../store'
import { syncNotes } from '../store/reducers/notesSlicer'

import { LayoutGroup, motion, MotionConfig, Variants } from 'framer-motion'
import { useMediaQuery } from 'beautiful-react-hooks'

import ContextMenuWrapper from './ContextMenuWrapper'
import ControlBar from './ControlBar'
import Notes from './Notes'
import SyncConflict from './SyncConflict'
import { setNavOpened, toggleNavBar } from '../store/reducers/appReducer'

const LazyEditor = dynamic(() => import('./Editor'), {
  ssr: false
})

function App() {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const { syncing, lastSync, openedNote } = useAppSelector(
    (state) => state.notes.present
  )
  const open = useAppSelector((state) => state.app.navOpen)

  useEffect(() => {
    if (session?.user) {
      dispatch<any>(syncNotes(false))
    }
  }, [dispatch, session?.user])

  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2Xl = useMediaQuery('(min-width: 1536px)')

  useEffect(() => {
    if (!isLg) {
      if (openedNote === undefined) {
        dispatch(toggleNavBar(true))
      } else {
        dispatch(toggleNavBar(false))
      }
    }
  }, [dispatch, isLg, openedNote])

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

  const EditorVariants = useMemo(
    () =>
      !isLg
        ? {
            open: { translateX: '100%', marginLeft: 0, width: '100%' },
            closed: { translateX: '0%', marginLeft: 0, width: '100%' }
          }
        : {
            open: {
              translateX: '0%',
              width: '100%',
              marginLeft: getSize(false)
            },
            closed: { translateX: '0%', marginLeft: 0, width: '100%' }
          },
    [getSize, isLg]
  )

  const SidebarVariants = useMemo(
    () =>
      !isLg
        ? {
            open: { translateX: '0%', width: '100%' },
            closed: { translateX: '-100%', width: '100%' }
          }
        : {
            open: { translateX: 0, width: getSize(true) },
            closed: { translateX: '-100%' }
          },
    [getSize, isLg]
  )

  const [editorVariants, setEditorVariants] = useState<Variants>(EditorVariants)

  const [sidebarVariants, setSidebarVariants] =
    useState<Variants>(SidebarVariants)

  useEffect(() => {
    setEditorVariants(EditorVariants)
    setSidebarVariants(SidebarVariants)
  }, [EditorVariants, SidebarVariants])

  return (
    <div className="flex overflow-hidden">
      {/* <LazyMotion features={domAnimation}> */}
      <MotionConfig transition={{ duration: 0.2 }}>
        <LayoutGroup>
          <ContextMenuWrapper>
            <motion.aside
              layout
              initial={false}
              animate={open ? 'open' : 'closed'}
              variants={sidebarVariants}
              onAnimationComplete={() => {
                if (!isLg) {
                  if (open) {
                    dispatch(setNavOpened(true))
                  } else {
                    dispatch(setNavOpened(false))
                  }
                }
              }}
              className="fixed lg:flex flex-col h-full overflow-hidden pb-8 lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gray-100 dark:bg-stone-900 transition-colors z-50"
            >
              <Notes />
            </motion.aside>
          </ContextMenuWrapper>

          <motion.div
            layout
            initial={false}
            animate={open ? 'open' : 'closed'}
            variants={editorVariants}
            style={{
              WebkitOverflowScrolling: 'touch',
              overflowY: 'auto'
            }}
            className="flex flex-col w-full min-h-full m-0 lg:w-2/3 lg:ml-[33.333333%] xl:w-3/4 xl:ml-[25%] 2xl:w-4/5 2xl:ml-[20%] bg-white dark:bg-stone-800 transition-colors"
          >
            {lastSync === null && syncing ? null : <LazyEditor />}
          </motion.div>
        </LayoutGroup>
      </MotionConfig>
      {/* </LazyMotion> */}

      <SyncConflict />
      <ControlBar />
    </div>
  )
}

export default App
