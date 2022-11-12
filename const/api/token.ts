import { HttpStatusCode } from './http-status-code'

export const usernamePasswordMismatch = {
  code: HttpStatusCode.Forbidden,
  status: 'fail',
  message: 'username and password do not match.',
} as const

export const usernameNotFound = {
  code: HttpStatusCode.Forbidden,
  status: 'fail',
  message: 'username dose not exist.',
} as const
