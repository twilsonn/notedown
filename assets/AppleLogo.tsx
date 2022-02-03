import React from 'react'

const AppleLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M22 17.6c-.8 2.3-3.1 6.3-5.6 6.4-1.6 0-2-1-4-1-1.8 0-2.3 1-3.9 1C6 24.1 2 18.2 2 13c0-4.7 3.3-7.1 6.2-7.1 1.5 0 3 1 4 1s2.7-1.3 4.6-1.1c.7 0 3 .3 4.3 2.4-3.7 2.4-3.1 7.5.9 9.4zM16.8 0C14 .1 11.6 3 12 5.5c2.6.2 5-2.7 4.8-5.5z" />
    </svg>
  )
}

export default AppleLogo
