import React from 'react'

const NotesLoader: React.FC = () => {
  return (
    <div
      className="w-full prose px-3 py-2 rounded-lg select-none 
       bg-gray-200 dark:bg-stone-800 dark:text-stone-200 transition-colors"
    >
      <div className="flex justify-between items-center pointer-events-none">
        <span className="m-0 capitalize h-6 bg-gray-300 dark:bg-stone-700 w-2/5 rounded-md relative overflow-hidden transition-colors">
          <div className="shimmer-wrapper">
            <div className="shimmer" />
          </div>
        </span>
      </div>
      <p className="pointer-events-none text-sm leading-tight h-5 bg-gray-300 dark:bg-stone-700 w-2/3 rounded-md relative overflow-hidden transition-colors">
        <span className="shimmer-wrapper">
          <span className="shimmer" />
        </span>
      </p>
    </div>
  )
}

export default NotesLoader
