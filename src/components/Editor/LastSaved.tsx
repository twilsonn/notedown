import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useAppSelector } from 'hooks'
import ReactTimeAgo from 'react-time-ago'

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

  return (
    <div className="fixed bottom-0 right-0 w-full px-4 h-8 border-t bg-gray-300 border-gray-300 dark:bg-stone-900 dark:border-stone-800">
      <div className="h-full w-full flex justify-end items-center text-xs divide-x-2  text-gray-700 divide-gray-400 dark:text-stone-300 dark:divide-stone-700">
        {openedNote ? (
          <>
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
          </>
        ) : (
          <span className="pr-2 pl-1 text-right">
            <TimeNow className="pr-2 pl-1 text-right" />
          </span>
        )}
      </div>
    </div>
  )
}

export default LastSaved
