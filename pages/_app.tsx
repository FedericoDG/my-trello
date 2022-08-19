import type {AppProps} from 'next/app'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux'
import {SnackbarProvider} from 'notistack'

import {darkTheme, lightTheme} from '../themes'

import '../styles/globals.css'
import {store} from '../redux'

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  )
}

export default MyApp
