import AppContainer from '../components/AppContainer'
import words from '../config/words'
import { Table, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import type { IEmployeeBase } from '../db/schema'
import { api } from '../lib/api'
import { useTokenCheck } from '../hooks/useTokenCheck'

const RegisterPage: React.FC = () => {
  const token = useTokenCheck()

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
    api(
      'get', '/api/whois',
      {
        token,
      },
      (res) => {
        if (res.code === 200) {
          setEmployee(res.data)
        }
      }
    )
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
