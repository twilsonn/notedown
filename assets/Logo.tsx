import React from 'react'

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M5 2a2 2 0 0 0-2 2v18c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5z"
        fill="#1bbcff"
      />
      <path
        d="M6-.2a1 1 0 0 0-1 1v3c0 .4.4 1 1 1s1-.6 1-1v-3c0-.6-.4-1-1-1zm4 0a1 1 0 0 0-1 1v3c0 .4.4 1 1 1s1-.6 1-1v-3c0-.6-.4-1-1-1zm4 0a1 1 0 0 0-1 1v3c0 .4.4 1 1 1s1-.6 1-1v-3c0-.6-.4-1-1-1zm4 0a1 1 0 0 0-1 1v3c0 .4.4 1 1 1s1-.6 1-1v-3c0-.6-.4-1-1-1zM6 14.6h12v1H6zm0-3h12v1H6zm0-3h12v1H6zm0 9h4v1H6z"
        fill="#94DFFF"
      />
      <path
        d="M5 3.8c0 .5.4 1 1 1s1-.5 1-1H5Zm4 0c0 .5.4 1 1 1s1-.5 1-1H9Zm4 0c0 .5.4 1 1 1s1-.5 1-1h-2Zm4 0c0 .5.4 1 1 1s1-.5 1-1h-2Z"
        fill="#258DE9"
      />
      <path
        d="M3 21.4v.9c0 1 .9 1.7 2 1.7h14c1.1 0 2-.8 2-1.7v-1c0 1-.9 1.8-2 1.8H5c-1.1 0-2-.7-2-1.7Z"
        fill="#1698cf"
      />
    </svg>
  )
}

export default Logo
