import App, { AppProps } from 'next/app'
import { wrapper } from '../store'
import { ReactReduxContext } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import useDarkMode from 'use-dark-mode'
import React from 'react'
import Script from 'next/script'
import Head from 'next/head'

import '../styles/globals.css'
import '../styles/styles.css'

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
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3393f0" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Script src="noflash.js" />
        <Component {...props} />
      </>
    )
  }
}

export default wrapper.withRedux(withHooksHOC(MyApp))
