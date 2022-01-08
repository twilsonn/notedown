import React from 'react'

import Tiptap from './Editor'

function App() {
  return (
    <div className="m-auto">
      <div className="flex">
        <div className="min-h-screen max-w-sm  w-full bg-gray-100">
          <ul className="space-y-4 p-4">
            <li>
              <div className="prose px-3 py-2 bg-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="m-0 capitalize">Note 1</h4>
                  <p className="text-xs m-0">updated at 16:45</p>
                </div>
                <p className="text-sm leading-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam consequatur modi doloribus libero ducimus odio
                </p>
              </div>
            </li>
            <li>
              <div className="prose px-3 py-2 bg-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="m-0 capitalize">Note 2</h4>
                  <p className="text-xs m-0">updated at 14:09</p>
                </div>
                <p className="text-sm leading-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam consequatur modi doloribus libero ducimus odio
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full min-h-screen utline-none focus:outline-none py-12 flex justify-center">
          <Tiptap />
        </div>
      </div>
    </div>
  )
}

export default App
