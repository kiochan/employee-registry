import AppContainer from '../components/AppContainer'
import words from '../config/words'
import { Box, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { internalServerError } from '../const/api/errors'
import links from '../config/links'
import { useTokenCheck } from '../hooks/useTokenCheck'
import { useRouter } from 'next/router'
import { api } from '../lib/api'

const usernameErrorText = 'Usernames can only consist of 4-32 Latin letters or numbers'
const passwordErrorText = 'Passwords can only consist of 4-32 Latin letters or numbers'
const passwordAgainErrorText = 'The two passwords must be the same'
const errorTextUserAlreadyExists = 'This user is already registered'

const RegisterPage: React.FC = () => {
  const router = useRouter()
  useTokenCheck()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')

  const [fields, setFields] = useState<
    Record<'email' | 'lastName' | 'firstName' | 'address' | 'role', string>
  >({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    address: '',
  })

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

  const goToAddViaCsv = (): void => {
    router.push(links.addViaCsv).catch(console.error)
  }

  const register = (): void => {
    api(
      'post', `/api/employee/${username}`,
      {
        ...fields,
        password,
      },
      (res) => {
        switch (res.code) {
          case 201: {
            router.push(`/employees/${username}`).catch(console.error)
            return
          }
          case 403: {
            setErrorText(errorTextUserAlreadyExists)
            return
          }
          default: {
            setErrorText(res.message ?? internalServerError.message)
          }
        }
      }
    )
  }

  return (
    <AppContainer title={words.site.titles.addNew} shortBanner>
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

          {(
            Object.keys(fields) as Array<'email' | 'lastName' | 'firstName' | 'address' | 'role'>
          ).map((v, i) => {
            return (
              <Box sx={{ margin: '1rem', width: '100%' }} key={i}>
                <TextField
                  id={`info-${v}`}
                  type='text'
                  label={`${v}`}
                  sx={{ width: '100%' }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    setFields({ ...fields, [v]: event.target.value })
                  }}
                  value={fields[v]}
                  variant='filled'
                  helperText={
                    isPasswordAgainError && passwordAgain !== '' ? passwordAgainErrorText : ''
                  }
                />
              </Box>
            )
          })}

          <Typography>
            Wanna add more employees at once?
            <Typography
              component='a'
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={goToAddViaCsv}
            >
              Upload .csv file
            </Typography>
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
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default RegisterPage
