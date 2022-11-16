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
import { userSettings, loginOptions, pages } from '../config/navMenu'
import words from '../config/words'
import { useAppSelector } from '../hooks/useAppSelector'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../client-store'
import { useRouter } from 'next/router'
import { api } from '../lib/api'

const AppBar: React.FC<{}> = (): JSX.Element => {
  const router = useRouter()

  const [anchorElNav, handleOpenNavMenu, handleCloseNavMenu] = useAnchorOpenHandle()
  const [anchorElUser, handleOpenUserMenu, handleCloseUserMenu] = useAnchorOpenHandle()

  const token = useAppSelector((s) => s.token.value)
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    api('get', '/api/whois', {
      token,
    },
      (res) => {
        if (res.code === 200) {
          setUsername(res.data.username)

        } else {
          dispatch({ type: 'token/delete' })
        }
      }
    )
  }, [token])

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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* small screen Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleCloseUserMenu()
                      router.push(link).catch(console.error)
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
