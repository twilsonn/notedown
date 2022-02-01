import App, { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import { wrapper } from '../store'
import { ReactReduxContext } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import useDarkMode from 'use-dark-mode'
import React from 'react'
import Script from 'next/script'

import '../styles/globals.css'
import '../styles/Editor.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

class MyApp extends App<{ session: Session }> {
  render() {
    const { Component, pageProps, session } = this.props

    return (
      <ReactReduxContext.Consumer>
        {({ store }: any) => (
          <PersistGate persistor={store.__persistor} loading={null}>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </PersistGate>
        )}
      </ReactReduxContext.Consumer>
    )
  }
}

const withHooksHOC = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (props: AppProps) => {
    useDarkMode(true, {
      classNameDark: 'dark',
      classNameLight: 'light'
    })

    return (
      <>
        <Script src="/noflash.js" strategy="beforeInteractive" />
        <Component {...props} />
      </>
    )
  }
}

export default wrapper.withRedux(withHooksHOC(MyApp))
