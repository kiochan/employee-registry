import AppContainer from '../components/AppContainer'
import words from '../config/words'

import { Box, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import links from '../config/links'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../client-store'

const usernameErrorText = 'Usernames can only consist of 4-32 Latin letters or numbers'
const passwordErrorText = 'Passwords can only consist of 4-32 Latin letters or numbers'
const incorrectPasswordErrorText = 'Username and password do not match'

const LoginPage: React.FC = () => {
  const router = useRouter()

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

  const goToRegister = (): void => {
    router.push(links.register).catch(console.error)
  }

  const login = (): void => {
    ;(async (): Promise<void> => {
      const res = await axios({
        method: 'post',
        url: '/api/token',
        params: {
          username,
          password,
        },
        validateStatus: (s) => s < 499,
      })

      if (res.data.code !== 201) {
        setErrorText(incorrectPasswordErrorText)
      } else {
        dispatch({
          type: 'token/create',
          payload: res.data.data.token,
        })
      }
    })().catch((error) => setErrorText(error.message ?? String(error)))
  }

  if (token !== null) {
    router.push(links.register).catch(console.error)
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
              helperText={isUsernameError && username !== '' ? usernameErrorText : ''}
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
              helperText={isPassError && password !== '' ? passwordErrorText : ''}
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
              onClick={goToRegister}
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
