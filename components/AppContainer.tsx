import AppBar from './AppBar'
import Head from 'next/head'

import words from '../config/words'
import type { HeroBannerProps } from './HeroBanner'
import HeroBanner from './HeroBanner'
import Box from '@mui/material/Box'

import PerfectScrollbar from 'react-perfect-scrollbar'
import Footer from './Footer'

export interface AppContainerProps extends HeroBannerProps {
  displayHero?: boolean
  children?: React.ReactNode
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const title = props.title === undefined ? words.site.name : `${props.title} - ${words.site.name}`

  const displayHero = props.heroImages != null || (props.displayHero ?? true)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PerfectScrollbar options={{}}>
        <div
          style={{
            width: '100%',
            maxHeight: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 200,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flex: 1,
            }}
          >
            {displayHero ? <HeroBanner {...props} /> : null}
            <Box
              sx={{
                justifyContent: 'center',
                top: 'auto',
                width: '100%',
                display: 'flex',
                zIndex: 100,
              }}
            >
              <Box
                maxWidth='xl'
                sx={{
                  position: 'relative',
                  width: '100%',
                  padding: `${props.children !== undefined ? 2 : 0}rem 4rem 0 4rem`,
                }}
              >
                {props.children}
              </Box>
            </Box>
          </Box>
          <AppBar></AppBar>
          <Footer></Footer>
        </div>
      </PerfectScrollbar>
    </>
  )
}

export default AppContainer
