import React from 'react'
import App, { AppProps } from 'next/app'
import Script from 'next/script'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import { wrapper } from '../store'
import { ReactReduxContext } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ModalProvider } from 'react-modal-hook'
import useDarkMode from 'use-dark-mode'

import '../styles/tailwind.css'
import '../styles/globals.css'
import Head from 'next/head'
class MyApp extends App<{ session: Session }> {
  render() {
    const { Component, pageProps, session } = this.props

    return (
      <ReactReduxContext.Consumer>
        {({ store }: any) => (
          <PersistGate persistor={store.__persistor} loading={null}>
            <SessionProvider session={session}>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
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
        <Head>
          <title>Notedown</title>
        </Head>

        <Script src="/noflash.js" strategy="beforeInteractive" />
        <Component {...props} />
        <Script src="/100vh.js" strategy="beforeInteractive" />
      </>
    )
  }
}

export default wrapper.withRedux(withHooksHOC(MyApp))
