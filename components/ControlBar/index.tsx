import React from 'react'
import DarkModeToggle from '../DarkModeToggle'
import LastSaved from '../Editor/LastSaved'

const ControlBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 w-full px-4 h-8 border-t bg-gray-300 border-gray-300 dark:bg-stone-900 dark:border-stone-800 transition-colors">
      <div className="h-full flex justify-between items-center">
        <DarkModeToggle />
        <LastSaved />
      </div>
    </div>
  )
}

export default ControlBar
