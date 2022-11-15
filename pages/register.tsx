import AppContainer from '../components/AppContainer'
import words from '../config/words'

import { Box, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { internalServerError } from '../const/api/errors'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'

const usernameErrorText = 'Usernames can only consist of 4-32 Latin letters or numbers'
const passwordErrorText = 'Passwords can only consist of 4-32 Latin letters or numbers'
const passwordAgainErrorText = 'The two passwords must be the same'
const errorTextUserAlreadyExists = 'This user is already registered'

const RegisterPage: React.FC = () => {
  const token = useAppSelector((s) => s.token.value)
  const dispatch = useAppDispatch()

  const router = useRouter()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')

  const [errorText, setErrorText] = useState<string>('')

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const passwordAgainChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordAgain(event.target.value)
  }

  const isUsernameError = String(username).match(/^[a-zA-Z0-9]{4,32}$/) === null
  const isPasswordError = String(password).match(/^[a-zA-Z0-9]{4,32}$/) === null
  const isPasswordAgainError = password !== passwordAgain

  const goToLogin = (): void => {
    router.push('/login').catch(console.error)
  }

  const register = (): void => {
    ;(async (): Promise<void> => {
      const res = await axios({
        method: 'post',
        url: `/api/employee/${username}`,
        params: {
          password,
        },
        validateStatus: (s) => s < 499,
      })

      switch (res.data.code) {
        case 201: {
          dispatch({
            type: 'token/create',
            payload: res.data.data.token,
          })
          return
        }
        case 403: {
          setErrorText(errorTextUserAlreadyExists)
          return
        }
        default: {
          setErrorText(res.data.message ?? internalServerError.message)
        }
      }
    })().catch((err) => {
      setErrorText(err?.data?.message ?? String(err))
    })
  }

  if (token !== null) {
    router.push('/redirect').catch(console.error)
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
              type='test'
              label='Username'
              sx={{ width: '100%' }}
              inputProps={{
                autoComplete: 'email',
              }}
              onChange={emailChange}
              value={username}
              error={isUsernameError && username !== ''}
              variant='filled'
              helperText={isUsernameError && username !== '' ? usernameErrorText : ''}
            />
          </Box>

          <Box sx={{ margin: '1rem', width: '100%' }}>
            <TextField
              id='password'
              type='password'
              label='Password'
              sx={{ width: '100%' }}
              inputProps={{
                autoComplete: 'new-password',
              }}
              onChange={passwordChange}
              value={password}
              error={isPasswordError && password !== ''}
              variant='filled'
              helperText={isPasswordError && password !== '' ? passwordErrorText : ''}
            />
          </Box>

          <Box sx={{ margin: '1rem', width: '100%' }}>
            <TextField
              id='password-again'
              type='password'
              label='Password again'
              sx={{ width: '100%' }}
              inputProps={{
                autoComplete: 'new-password',
              }}
              onChange={passwordAgainChange}
              value={passwordAgain}
              error={isPasswordAgainError && passwordAgain !== ''}
              variant='filled'
              helperText={
                isPasswordAgainError && passwordAgain !== '' ? passwordAgainErrorText : ''
              }
            />
          </Box>

          <Typography>
            Already our employee?
            <a
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={goToLogin}
            >
              Login here!
            </a>
          </Typography>

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
              onClick={register}
              disabled={isUsernameError || isPasswordError || isPasswordAgainError}
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

export default RegisterPage
