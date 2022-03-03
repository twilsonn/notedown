import React, { useState, useEffect } from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  RefreshIcon
} from '@heroicons/react/solid'
import { domAnimation, LazyMotion, m } from 'framer-motion'

import { useAppSelector } from '../../store'
import TimeAgo from '../TimeAgo'

const TimeNow: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())
  useEffect(() => {
    let myInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 500)
    return () => {
      clearInterval(myInterval)
    }
  })
  return <span {...props}>{currentTime}</span>
}

const LastSaved: React.FC = () => {
  const { openedNote, synced, syncing } = useAppSelector(
    (state) => state.notes.present
  )

  return (
    <div className="flex text-xs divide-x-2 text-gray-700 divide-gray-400 dark:text-stone-300 dark:divide-stone-700">
      {openedNote ? (
        <>
          {openedNote.note.saved ? (
            <>
              Last Updated:{' '}
              <span className="pr-2 pl-1 text-right">
                <TimeAgo date={new Date(openedNote.note.updatedAt)} />
              </span>
            </>
          ) : null}

          <div className="pl-2">
            <div>
              {syncing ? (
                <LazyMotion features={domAnimation}>
                  <m.div
                    animate={{ rotate: '-360deg' }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      type: 'tween',
                      ease: 'linear'
                    }}
                  >
                    <RefreshIcon className="w-4 h-4 text-blue-400" />
                  </m.div>
                </LazyMotion>
              ) : openedNote?.note.saved && synced ? (
                <CheckCircleIcon className="w-4 h-4 text-blue-400" />
              ) : openedNote?.note.saved ? (
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              ) : (
                <ExclamationCircleIcon className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>
        </>
      ) : (
        <TimeNow className="pl-1 text-right" />
      )}
    </div>
  )
}

export default LastSaved
