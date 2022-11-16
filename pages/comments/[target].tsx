import AppContainer from '../../components/AppContainer'
import words from '../../config/words'

import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import links from '../../config/links'
import type { FormElement } from '@nextui-org/react'
import { Input, Text } from '@nextui-org/react'
import { useAppSelector } from '../../hooks/useAppSelector'

const RegisterPage: React.FC = () => {
  const token = useAppSelector((s) => s.token.value)
  const router = useRouter()
  if (token === null) router.push(links.home).catch(console.error)

  const [message, setMessage] = useState<string>('')

  const [comments, setComments] = useState<
    Array<{
      contents: string
      date: Date
      author: string
    }>
  >([])

  const target = router.query.target

  useEffect((): void => {
    reload()
  }, [])

  const reload = (): void => {
    ;(async (): Promise<void> => {
      const res = await axios({
        url: `/api/comment/${String(target)}`,
        method: 'get',
        params: {
          token,
        },
        validateStatus: (s) => s < 500,
      })

      setComments(res.data.data)
    })().catch(console.error)
  }

  const sendComment = (): void => {
    if (message.length <= 0) return
    ;(async (): Promise<void> => {
      const res = await axios({
        url: `/api/comment/${String(target)}`,
        method: 'post',
        params: {
          token,
          contents: message,
        },
        validateStatus: (s) => s < 500,
      })

      if (res.data.code === 201) {
        reload()
        setMessage('')
      }
    })().catch(console.error)
  }

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
            {comments.map((o, i) => {
              return (
                <Text key={i}>
                  [{new Date(o.date).toLocaleDateString()} {new Date(o.date).toLocaleTimeString()}]{' '}
                  {o.author}: {o.contents ?? '<empty>'}
                </Text>
              )
            })}
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: '3rem',
            width: '100%',
            maxWidth: 800,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Input
            aria-label='message input'
            value={message}
            css={{ width: '100%' }}
            onChange={(e: React.ChangeEvent<FormElement>) => {
              setMessage(e.target.value)
            }}
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
            aria-label='submit comment'
            variant='contained'
            onClick={sendComment}
            sx={{
              width: '10rem',
              margin: '1rem',
            }}
          >
            NEW COMMENT
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default RegisterPage
