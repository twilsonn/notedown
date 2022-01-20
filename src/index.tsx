import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import NewStore from './store'

import ContextMenuWrapper from 'components/ContextMenuWrapper'
import './assets/index.css'

import App from 'components/App'
import { PersistGate } from 'redux-persist/integration/react'
import useDarkMode from 'use-dark-mode'

const { store, persistor } = NewStore()

const Main = () => {
  const darkMode = useDarkMode()

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ContextMenuWrapper>
            <App />
          </ContextMenuWrapper>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

render(<Main />, document.getElementById('root'))
