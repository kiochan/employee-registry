export interface Token {
  value: string
  timestamp: number
}

export type EmployeeRole = string

export interface Employee {
  username: string
  email: string
  lastName: string
  address: string
  role: EmployeeRole
}
