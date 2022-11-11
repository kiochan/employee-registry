import { HttpStatusCode } from './http-status-code'

export const badRequest = {
  code: HttpStatusCode.BadRequest,
  status: 'error',
  message: 'Bad Request: The server cannot understand your request',
} as const

export const unauthorized = {
  code: HttpStatusCode.Unauthorized,
  status: 'error',
  message: 'Unauthorized: You need a token to use this service',
} as const

export const notFound = {
  code: HttpStatusCode.NotFound,
  status: 'error',
  message: 'Not Found: Resources not exist',
} as const

export const internalServerError = {
  code: HttpStatusCode.InternalServerError,
  status: 'error',
  message: 'Internal Server Error',
} as const
