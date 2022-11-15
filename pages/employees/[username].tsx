import AppContainer from '../../components/AppContainer'
import words from '../../config/words'

import { useAppSelector } from '../../hooks/useAppSelector'
import { Table, Text } from '@nextui-org/react'

import { useEffect, useState } from 'react'
import type { IEmployeeBase } from '../../db/schema'
import axios from 'axios'
import { useRouter } from 'next/router'
import links from '../../config/links'
import { useAppDispatch } from '../../client-store'

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((s) => s.token.value)
  const router = useRouter()
  if (token === null) router.push(links.home).catch(console.error)

  const [employee, setEmployee] = useState<IEmployeeBase>({
    username: '',
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  })

  console.log(employee)

  useEffect(() => {
    ;(async (): Promise<void> => {
      const res = await axios({
        url: `/api/employee/${String(router.query.username)}`,
        method: 'get',
        params: {
          token,
        },
        validateStatus: (s) => s < 499,
      })

      if (res.data.code === 401) {
        dispatch({ type: 'token/delete' })
      }

      if (res.data.code === 200) {
        setEmployee(res.data.data)
      }
    })().catch((res) => {
      console.error(res?.data?.message ?? String(res))
    })
  }, [token])

  return (
    <AppContainer title={words.site.titles.myself} shortBanner>
      <Text h3 b>
        Details of employee &quot;
        {employee.firstName === undefined && employee.lastName === undefined
          ? employee.username
          : [employee.firstName, employee.lastName].join(' ')}
        &quot;
      </Text>
      <Table aria-label='User details'>
        <Table.Header>
          <Table.Column>Field Name</Table.Column>
          <Table.Column>Content</Table.Column>
        </Table.Header>
        <Table.Body>
          {[...Object.entries(employee)].map(([k, v], i) => (
            <Table.Row key={i}>
              <Table.Cell>{k}</Table.Cell>
              <Table.Cell>{v}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </AppContainer>
  )
}

export default RegisterPage
