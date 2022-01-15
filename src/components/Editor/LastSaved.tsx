import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

const LastSaved: React.FC<{ lastSaved?: Date }> = ({ lastSaved }) => {
  const [mil, setMil] = useState(lastSaved?.getMilliseconds())

  useEffect(() => {
    setMil(0)
    let myInterval = setInterval(() => {
      lastSaved ? setMil(Date.now() - lastSaved.getTime()) : null
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [lastSaved])

  const formatTime = (t: number) => {
    if (t >= 1000 * 60 * 60 * 24) {
      return `${Math.floor(t / (1000 * 60 * 60 * 24))} h`
    }

    if (t >= 1000 * 60) {
      return `${Math.floor(t / (1000 * 60))} m`
    }

    if (t < 1000 * 60) {
      return `${Math.floor(t / 1000)} s`
    }
  }

  return (
    <div className="fixed bottom-0 right-0 w-full bg-gray-300 px-4 h-8">
      <div className="h-full w-full flex justify-end items-center text-xs text-gray-700 divide-x-2 divide-gray-400">
        {lastSaved != undefined && mil != undefined && mil > 1000 ? (
          <>
            Last Updated:{' '}
            <span className="pr-2 pl-1 text-right">{formatTime(mil)}</span>
          </>
        ) : null}

        <div className="pl-2">
          {lastSaved != undefined ? (
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
