import React from 'react'

const NewNote = () => {
  return (
    <button
      type="button"
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-4 text-center group hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <svg
        className="mx-auto h-10 w-10 text-gray-300 group-hover:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-800">
        Create a new note
      </span>
    </button>
  )
}

export default NewNote
