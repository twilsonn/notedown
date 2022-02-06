import React from 'react'
import { useSession } from 'next-auth/react'
import LastSaved from '../Editor/LastSaved'
import Settings from './Settings'

const ControlBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 w-full z-50 px-4 h-8 border-t bg-gray-300 border-gray-300 dark:bg-stone-900 dark:border-stone-800 transition-colors">
      <div className="h-full flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Settings />
        </div>
        <LastSaved />
      </div>
    </div>
  )
}

export default ControlBar
