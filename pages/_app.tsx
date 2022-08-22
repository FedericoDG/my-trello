import type {AppProps} from 'next/app'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux'
import {SnackbarProvider} from 'notistack'

import {darkTheme, lightTheme} from '../themes'

import '../styles/globals.css'
import {store} from '../redux'
import shareThemeInfo from '../services/theme-info'
import {useEffect, useState} from 'react'

const MyApp = ({Component, pageProps}: AppProps) => {
  const [theme, setTheme] = useState(darkTheme)

  const subScription$ = shareThemeInfo.getSubject()

  useEffect(() => {
    subScription$.subscribe((data) => {
      !!data ? setTheme(darkTheme) : setTheme(lightTheme)
    })
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  )
}

export default MyApp
