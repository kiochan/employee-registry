import * as React from 'react'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'

import useAnchorOpenHandle from '../hooks/useAnchorOpenHandle'
import useRedirect from '../hooks/useRedirect'
import useRedirectTo from '../hooks/useRedirectTo'

import { userSettings, loginOptions, pages } from '../config/navMenu'
import words from '../config/words'
import { useAppSelector } from '../hooks/useAppSelector'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../client-store'

const AppBar: React.FC<{}> = (): JSX.Element => {
  const [anchorElNav, handleOpenNavMenu, handleCloseNavMenu] = useAnchorOpenHandle()
  const [anchorElUser, handleOpenUserMenu, handleCloseUserMenu] = useAnchorOpenHandle()

  const redirectTo = useRedirectTo()

  const token = useAppSelector((s) => s.token.value)
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (token === null) return
      const res = await axios({
        url: '/api/whois',
        method: 'get',
        params: {
          token,
        },
        validateStatus: (s) => s < 500,
      })

      if (res.data.code === 200) {
        setUsername(res.data.data.username)
        return
      }

      dispatch({ type: 'token/delete' })

      console.error('Error message from remote: ' + String(res.data.message))
    })().catch(console.error)
  }, [token, setUsername])

  const login = useRedirect('/login')
  const register = useRedirect('/register')
  const logout = useRedirect('/logout')

  const component = (
    <MuiAppBar
      position='fixed'
      style={{
        zIndex: 500,
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* big screen logo */}
          <Link href='/'>
            <Box
              component='a'
              sx={{
                mr: 2,
                minWidth: '150px',
                maxWidth: '200px',
                cursor: 'pointer',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Typography>{words.site.name}</Typography>
            </Box>
          </Link>

          {/* small screen menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-app-bar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-app-bar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ link, name }, index) => (
                <Link href={link} key={index}>
                  <MenuItem component='a' onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* small screen Logo */}
          <Box component='a' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link href='/'>
              <Box
                sx={{ minWidth: '150px', maxWidth: '200px', cursor: 'pointer', display: 'flex' }}
              >
                <Typography>{words.site.name}</Typography>
              </Box>
            </Link>
          </Box>

          {/* big screen nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ link, name }, index) => (
              <Link href={link} key={index}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, display: 'block' }}>
                  {name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* small screen user info */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={words.site.titles.settings}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username ?? ''} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-app-bar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(token === null ? loginOptions : userSettings).map(({ name, link }, index) => {
                if (link === '/login') {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCloseUserMenu()
                        login()
                      }}
                    >
                      <Typography textAlign='center'>{name}</Typography>
                    </MenuItem>
                  )
                }

                if (link === '/register') {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCloseUserMenu()
                        register()
                      }}
                    >
                      <Typography textAlign='center'>{name}</Typography>
                    </MenuItem>
                  )
                }

                if (link === '/logout') {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCloseUserMenu()
                        logout()
                      }}
                    >
                      <Typography textAlign='center'>{name}</Typography>
                    </MenuItem>
                  )
                }

                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleCloseUserMenu()
                      redirectTo(link)
                    }}
                  >
                    <Typography textAlign='center'>{name}</Typography>
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
  return component
}

export default AppBar
