import { StrictMode } from 'react'
import { render } from 'react-dom'

import './assets/index.css'

import App from 'components/App'

const Main = () => {
  return (
    <StrictMode>
        <App />
    </StrictMode>
  )
}

render(<Main />, document.getElementById('root'))
