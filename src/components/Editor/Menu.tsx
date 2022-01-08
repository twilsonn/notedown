import React from 'react'

const Menu: React.FC = () => {
  return (
    <div className="w-full rounded-lg bg-gray-100 p-4 flex space-x-2 mb-8">
      <div className="h-8 flex items-center rounded-md bg-gray-300 px-2">
        Times Roman
      </div>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        </svg>
      </button>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
          <line x1="4" y1="21" x2="20" y2="21"></line>
        </svg>
      </button>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 4h-9M14 20H5M14.7 4.7L9.2 19.4" />
        </svg>
      </button>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      </button>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 9.5H3M21 4.5H3M21 14.5H3M17 19.5H3" />
        </svg>
      </button>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9.5H5M21 4.5H3M21 14.5H3M19 19.5H5" />
        </svg>
      </button>
      <button className="w-8 h-8 bg-gray-300 text-gray-700 hover:text-gray-900 flex items-center justify-center rounded-md hover:bg-gray-400">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 9.5H7M21 4.5H3M21 14.5H3M21 19.5H7" />
        </svg>
      </button>
    </div>
  )
}

export default Menu
