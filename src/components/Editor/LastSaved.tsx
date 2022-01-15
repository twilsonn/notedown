// import humanizeDuration from 'humanize-duration'
import React from 'react'
import { useState, useEffect } from 'react'

// const shortEnglishHumanizer = humanizeDuration.humanizer({
//   language: 'shortEn',
//   languages: {
//     shortEn: {
//       y: () => 'y',
//       mo: () => 'mo',
//       w: () => 'w',
//       d: () => 'd',
//       h: () => 'h',
//       m: () => 'm',
//       s: () => 's',
//       ms: () => 'ms'
//     }
//   }
// })

const LastSaved: React.FC<{ lastSaved: Date }> = ({ lastSaved }) => {
  const [mil, setMil] = useState(500)

  useEffect(() => {
    let myInterval = setInterval(() => {
      setMil(lastSaved.getTime() - Date.now())
    }, 5000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <div className="fixed bottom-0 right-0 w-full bg-gray-300 px-4 py-2">
      {/* Last Updated: {mil && shortEnglishHumanizer(mil, { round: true })} */}
    </div>
  )
}

export default LastSaved
