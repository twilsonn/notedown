import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import NewStore from './store'

import './assets/index.css'

import App from 'components/App'
import { PersistGate } from 'redux-persist/integration/react'
import useDarkMode from 'use-dark-mode'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

const { store, persistor } = NewStore()

const Main = () => {
  useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

render(<Main />, document.getElementById('root'))
