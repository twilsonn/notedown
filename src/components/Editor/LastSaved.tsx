import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useAppSelector } from 'hooks'
import ReactTimeAgo from 'react-time-ago'

const LastSaved: React.FC = () => {
  const openedNote = useAppSelector((state) => state.present.openedNote)

  return (
    <div className="fixed bottom-0 right-0 w-full bg-gray-300 px-4 h-8">
      <div className="h-full w-full flex justify-end items-center text-xs text-gray-700 divide-x-2 divide-gray-400">
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
          {openedNote.note.saved ? (
            <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
          ) : (
            <ExclamationCircleIcon className="w-4 h-4 text-amber-500" />
          )}
        </div>
      </div>
    </div>
  )
}

export default LastSaved
