import AppContainer from '../components/AppContainer'
import words from '../config/words'

import { Box, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

import links from '../config/links'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../client-store'
import { api } from '../lib/api'
import useRedirect from '../hooks/useRedirect'

const LoginPage: React.FC = () => {
  const gotoRegister = useRedirect(links.register)
  const gotoHome = useRedirect(links.home)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [errorText, setErrorText] = useState<string>('')

  const token = useAppSelector((s) => s.token.value)
  const dispatch = useAppDispatch()

  const usernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const isUsernameError = String(username).match(/^[a-zA-Z0-9]{4,32}$/) === null
  const isPassError = String(password).match(/^[a-zA-Z0-9]{4,32}$/) === null

  const login = (): void => {
    api('post', '/api/token', {
      username,
      password,
    }, (res) => {
      if (res.code === 201) {
        dispatch({
          type: 'token/create',
          payload: res.data.token,
        })
        return
      }

      setErrorText(words.text.incorrectPasswordErrorText)
    }
    )
  }

  if (token !== null) {
    gotoHome()
  }

  return (
    <AppContainer title={words.site.titles.login} shortBanner>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: {
              xs: 300,
              sm: 400,
              md: 500,
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ margin: '1rem', width: '100%' }}>
            <TextField
              id='account'
              type='text'
              label='Username'
              sx={{ width: '100%' }}
              onChange={usernameChange}
              value={username}
              error={isUsernameError && username !== ''}
              variant='filled'
              helperText={isUsernameError && username !== '' ? words.text.usernameErrorText : ''}
              inputProps={{
                autoComplete: 'email',
              }}
            />
          </Box>

          <Box sx={{ margin: '1rem', width: '100%' }}>
            <TextField
              id='password'
              type='password'
              label='Password'
              sx={{ width: '100%' }}
              onChange={passwordChange}
              value={password}
              error={isPassError && password !== ''}
              variant='filled'
              helperText={isPassError && password !== '' ? words.text.passwordErrorText : ''}
              inputProps={{
                autoComplete: 'password-current',
              }}
            />
          </Box>

          <Typography color='error'>{errorText}</Typography>

          <Box
            sx={{
              margin: '3rem',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Button
              variant='contained'
              disabled={isUsernameError || isPassError}
              onClick={login}
              sx={{
                width: '10rem',
                margin: '1rem',
              }}
            >
              Login
            </Button>
            <Button
              variant='outlined'
              onClick={gotoRegister}
              sx={{
                width: '10rem',
                margin: '1rem',
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default LoginPage
