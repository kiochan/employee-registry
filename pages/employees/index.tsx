import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import AppContainer from '../../components/AppContainer'
import words from '../../config/words'
import ContentHeader from '../../components/ContentHeader'
import ContentPageSelector from '../../components/ContentPageSelector'
import { Box, Typography } from '@mui/material'

import { Card, Grid, Row, Text } from '@nextui-org/react'
import links from '../../config/links'
import type { IEmployeeBase } from '../../db/schema'
import axios from 'axios'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../client-store'

const ShopPage: React.FC = () => {
  const router = useRouter()

  const token = useAppSelector((s) => s.token.value)
  if (token === null) router.push(links.home).catch(console.error)

  const [employees, setEmployees] = useState<IEmployeeBase[]>([])
  const [searchText, setSearchText] = useState<string>('')

  const dispatch = useAppDispatch()

  const page: number = parseInt(String(router.query.page ?? 1))
  const search: string = String(router.query.search ?? '')

  const limit: number = 20

  const offset: number = limit * (page - 1)
  const [total, setTotal] = useState<number>(0)

  const _totalPage = Math.ceil(total / limit)
  const totalPage = _totalPage === 0 ? 1 : _totalPage

  const textSearchInfo =
    search === ''
      ? ''
      : employees.length > 0
        ? `results of "${search}"`
        : `no results for username with "${search}"`

  useEffect(() => {
    ; (async (): Promise<void> => {
      const res = await axios({
        url: '/api/employee',
        method: 'get',
        params: {
          offset,
          limit,
          query: search,
          token,
        },
        validateStatus: (s) => s < 499,
      })

      if (res.data.code === 401) {
        dispatch({ type: 'token/delete' })
      }

      if (res.data.code === 200) {
        if (res.data?.total !== undefined) {
          setTotal(res.data.total)
        }
        if (res.data?.data !== undefined) {
          setEmployees(res.data.data)
        }
      }
    })().catch((res) => {
      console.error(res?.data?.message ?? String(res))
    })
  }, [offset, search])

  const onSearchChange = useCallback(
    (searchText: string) => {
      setSearchText(searchText)
    },
    [router],
  )

  const onSearchSubmit = useCallback(() => {
    router
      .push({
        pathname: links.employees,
        query: { page: 1, search: searchText },
      })
      .catch(console.error)
  }, [router, searchText, page])

  const onPageChange = useCallback(
    (page: number) => {
      router
        .push({
          pathname: links.employees,
          query: { page, search },
        })
        .catch(console.error)
    },
    [router],
  )

  return (
    <AppContainer title={words.site.titles.employees} shortBanner>
      <ContentHeader
        enableSearch
        searchValue={searchText}
        onSearchSubmit={onSearchSubmit}
        onSearchChange={onSearchChange}
      >
        {textSearchInfo}
      </ContentHeader>

      {/* there should be some items around */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5rem 0',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {employees.length > 0 ? (
            <Grid.Container gap={2} css={{ mw: '1000px' }} justify='flex-start'>
              {employees.map((employee, i) => {
                return (
                  <Grid key={i} xs={12} sm={4}>
                    <Card
                      isPressable
                      onClick={() => {
                        router.push(`/employees/${employee.username}`).catch(console.error)
                      }}
                    >
                      <Card.Header>
                        <Text h3 b>
                          {employee.firstName === undefined && employee.lastName === undefined
                            ? employee.username
                            : [employee.firstName, employee.lastName].join(' ')}
                        </Text>
                      </Card.Header>
                      <Card.Body css={{ py: '$10' }}>
                        <Text>Role: {employee.role ?? '<not set>'}</Text>
                      </Card.Body>
                      <Card.Divider />
                      <Card.Footer css={{ justifyItems: 'flex-start' }}>
                        <Row wrap='wrap' justify='space-between' align='center'>
                          <Text small>{employee.email ?? ''}</Text>
                          <Text small>{employee.address ?? ''}</Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                )
              })}{' '}
            </Grid.Container>
          ) : (
            <Typography
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '2rem',
                  md: '3rem',
                },
                transition: 'font-size 2s',
              }}
            >
              {`There are no employees data.`}
            </Typography>
          )}
        </Box>
      </Box>

      <ContentPageSelector
        onChange={onPageChange}
        current={page}
        min={1}
        max={totalPage}
      ></ContentPageSelector>
    </AppContainer>
  )
}

export default ShopPage
