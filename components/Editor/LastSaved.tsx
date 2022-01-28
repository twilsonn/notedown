import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

import ReactTimeAgo from 'react-time-ago'
import { useAppSelector } from '../../store'

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
  const openedNote = useAppSelector((state) => state.notes.present.openedNote)

  return openedNote ? (
    <div className="flex text-xs divide-x-2 text-gray-700 divide-gray-400 dark:text-stone-300 dark:divide-stone-700">
      {openedNote.note.saved ? (
        <>
          Last Updated:{' '}
          <span className="pr-2 pl-1 text-right">
            <ReactTimeAgo
              date={openedNote.note.updatedAt}
              timeStyle="twitter"
            />
          </span>
        </>
      ) : null}

      <div className="pl-2">
        {openedNote?.note.saved ? (
          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
        ) : (
          <ExclamationCircleIcon className="w-4 h-4 text-amber-500" />
        )}
      </div>
    </div>
  ) : (
    <span className="pr-2 pl-1 text-right">
      <TimeNow className="pr-2 pl-1 text-right" />
    </span>
  )
}

export default LastSaved
