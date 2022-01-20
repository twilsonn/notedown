import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import NewStore from './store'

import ContextMenuWrapper from 'components/ContextMenuWrapper'
import './assets/index.css'

import App from 'components/App'
import { PersistGate } from 'redux-persist/integration/react'
import { useColorScheme } from 'hooks'

const { store, persistor } = NewStore()

const Main = () => {
  const { isDark, setIsDark } = useColorScheme()

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

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
