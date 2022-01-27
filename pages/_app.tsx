import App from 'next/app'
import { AppState, AppStore, wrapper } from '../store'
import { ReactReduxContext } from 'react-redux'
import { Persistor } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

export default wrapper.withRedux(
  class MyApp extends App {
    render() {
      const { Component, pageProps } = this.props
      return (
        <ReactReduxContext.Consumer>
          {({ store }: any) => (
            <PersistGate
              persistor={store.__persistor}
              loading={<div>Loading</div>}
            >
              <Component {...pageProps} />
            </PersistGate>
          )}
        </ReactReduxContext.Consumer>
      )
    }
  }
)
