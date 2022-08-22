import {CssBaseline, ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux'
import {SnackbarProvider} from 'notistack'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import type {AppProps} from 'next/app'

import {darkTheme, lightTheme} from '../themes'
import {store} from '../redux'
import shareThemeInfo from '../services/theme-info'

import '../styles/globals.css'

const MyApp = ({Component, pageProps}: AppProps) => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  const subScription$ = shareThemeInfo.getSubject()

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme = cookieTheme === 'light' ? lightTheme : darkTheme
    setCurrentTheme(selectedTheme)
  }, [])

  useEffect(() => {
    subScription$.subscribe((data) => {
      data === 'light' ? setCurrentTheme(lightTheme) : setCurrentTheme(darkTheme)
    })
  }, [])

  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  )
}

export default MyApp
