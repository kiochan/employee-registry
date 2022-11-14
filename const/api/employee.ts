import { HttpStatusCode } from './http-status-code'

export const usernameAlreadyExist = {
  code: HttpStatusCode.Forbidden,
  status: 'fail',
  message: 'username already exist.',
} as const
