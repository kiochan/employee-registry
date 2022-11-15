import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Provider as StoreProvider } from 'react-redux'
import { useStore } from '../client-store'
import { PersistGate } from 'redux-persist/integration/react'

// redux toolkit: see https://redux-toolkit.js.org/usage/usage-with-typescript

import { ThemeProvider } from '@mui/material/styles'
import { motion } from 'framer-motion'

// Roboto font
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// perfect scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

import '../styles/global.less'

import CssBaseline from '@mui/material/CssBaseline'
import muiTheme from '../config/theme.mui'
import nextTheme from '../config/theme.nextui'

function App({ Component, pageProps, router }: AppProps): JSX.Element {
  const { store, persistor } = useStore(pageProps.initialReduxState)

  const component = (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextUIProvider theme={nextTheme}>
            <motion.div
              key={router.route}
              initial='initial'
              animate='animate'
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </NextUIProvider>
        </PersistGate>
      </StoreProvider>
    </ThemeProvider>
  )

  return component
}

export default App
