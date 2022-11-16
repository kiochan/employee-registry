import AppContainer from '../../components/AppContainer'
import words from '../../config/words'
import { Box, TextField, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { internalServerError } from '../../const/api/errors'
import { useAppSelector } from '../../hooks/useAppSelector'
import links from '../../config/links'
import { Spacer } from '@nextui-org/react'
import { api } from '../../lib/api'
import useRedirect from '../../hooks/useRedirect'
import { useRouter } from 'next/router'
import { useTokenCheck } from '../../hooks/useTokenCheck'

const passwordErrorText = 'Passwords can only consist of 4-32 Latin letters or numbers'
const passwordAgainErrorText = 'The two passwords must be the same'
const errorTextUserAlreadyExists = 'This user is already registered'

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const token = useAppSelector((s) => s.token.value)
  useTokenCheck()
  const gotoEmployees = useRedirect(links.employees)

  const [errorText, setErrorText] = useState<string>('')

  const username = String(router.query.username)

  useEffect(() => {
    api('get', `/api/employee/${username}`, {
      token,
    }, (res) => {
      if (res.code === 200) {
        setFields(res.data)
      }
    })
  }, [token])

  const update = (): void => {
    api(
      'put', `/api/employee/${username}`,
      {
        ...fields,
        password: passwordAgain === '' ? undefined : passwordAgain,
      },
      (res) => {

        switch (res.code) {
          case 200: {
            gotoEmployees()
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
      })
  }

  const [fields, setFields] = useState<
    Record<'email' | 'lastName' | 'firstName' | 'address' | 'role', string>
  >({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    address: '',
  })

  const deleteUser = (): void => {
    api(
      'delete', `/api/employee/${username}`, {},
      (res) => {
        switch (res.code) {
          case 200: {
            gotoEmployees()
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

  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const passwordAgainChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordAgain(event.target.value)
  }

  const isPasswordError = String(password).match(/^[a-zA-Z0-9]{4,32}$/) === null
  const isPasswordAgainError = password !== passwordAgain

  return (
    <AppContainer title={words.site.titles.employee} shortBanner>
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
              label='Username (not editable)'
              sx={{ width: '100%' }}
              inputProps={{
                autoComplete: 'email',
              }}
              value={username}
              variant='filled'
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

          <Typography color='error'>{errorText}</Typography>

          <Spacer />

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
              onClick={update}
              sx={{
                width: '10rem',
                margin: '1rem',
              }}
            >
              Update
            </Button>
          </Box>
        </Box>

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
            onClick={deleteUser}
            color='error'
            disabled={isPasswordAgainError}
            sx={{
              width: '10rem',
              margin: '1rem',
            }}
          >
            DELETE
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default RegisterPage
