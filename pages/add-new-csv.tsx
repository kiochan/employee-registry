import AppContainer from '../components/AppContainer'
import words from '../config/words'

import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { useAppSelector } from '../hooks/useAppSelector'
import links from '../config/links'
import { useFilePicker } from 'use-file-picker'
import { Radio, Text } from '@nextui-org/react'
import { parseCsv } from '../lib/parseCsv'

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const token = useAppSelector((s) => s.token.value)
  if (token === null) router.push(links.home).catch(console.error)

  const [encoding, setEncoding] = useState<'uft-8' | 'iso-8859-15'>('uft-8')
  const [list, setList] = useState<Array<Record<string, string>>>([])

  const [openFileSelector, { plainFiles, loading }] = useFilePicker({
    accept: '.csv',
    limitFilesConfig: {
      max: 1,
      min: 1,
    },
  })

  const submit = (): void => {
    Promise.all(
      list.map(async (obj: Record<string, string>): Promise<void> => {
        return await axios({
          method: 'post',
          url: `/api/employee/${obj.username}`,
          params: obj,
          validateStatus: (s) => s < 499,
        })
      }),
    )
      .then(() => {
        router.push('/employees').catch(console.error)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (plainFiles[0] !== undefined) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          let res = parseCsv(String(reader.result))

          if (encoding === 'iso-8859-15') {
            res = res.map((r) => {
              const { Vorname, Nachname, Strasse, Nr, PLZ, Ort, Land, Rolle, Passwort } = r
              return {
                username: Nachname ?? '',
                email: '',
                lastName: Nachname ?? '',
                firstName: Vorname ?? '',
                address: `${Strasse ?? ''} ${Nr ?? ''}, ${Ort ?? ''} ${PLZ ?? ''}, ${Land ?? ''}`,
                role: Rolle,
                password: Passwort ?? 'password',
              }
            })
          }

          setList(res)
        },
        false,
      )

      reader.readAsText(plainFiles[0], encoding)
    }
  }, [plainFiles])

  return (
    <AppContainer title={words.site.titles.addViaCsv} shortBanner>
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
            margin: '3rem',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Radio.Group
            label='Encoding'
            defaultValue={'utf-8'}
            onChange={setEncoding as (v: string) => void}
            value={encoding}
          >
            <Radio value='utf-8'>UTF-8</Radio>
            <Radio value='iso-8859-15'>German</Radio>
          </Radio.Group>
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
            onClick={() => openFileSelector()}
            disabled={loading}
            sx={{
              width: '10rem',
              margin: '1rem',
            }}
          >
            {loading ? 'Loading...' : 'Select file'}
          </Button>
        </Box>

        {list.length > 0 ? (
          <>
            <Box
              sx={{
                margin: '3rem',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Text blockquote css={{}}>
                {JSON.stringify(list, undefined, 4)}
              </Text>
            </Box>

            <Button
              variant='contained'
              onClick={submit}
              disabled={list.length <= 0}
              sx={{
                width: '10rem',
                margin: '1rem',
              }}
            >
              {'Submit'}
            </Button>
          </>
        ) : null}
      </Box>
    </AppContainer>
  )
}

export default RegisterPage
