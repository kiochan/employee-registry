import type { IEmployeeBase } from '../../db/schema'
import type {
  RequestWithToken,
  ResponseBaseError,
  ResponseBaseFailure,
  ResponseBaseSuccessful,
  ResponseListBase,
} from './common'

/**
 * read employee list
 */
export interface RequestReadEmployees {
  token: string
  start?: number
  limit?: number
}

/**
 * response for read employee list
 */
export interface ResponseReadEmployees extends ResponseListBase<IEmployeeBase> {
  code: 200
}

/**
 * read employee
 */
export interface RequestReadEmployee extends RequestWithToken {
  username: string
}

/**
 * response of read employee
 */
export interface ResponseReadEmployee extends ResponseBaseSuccessful {
  code: 200
  data: IEmployeeBase
}

/**
 * create employee
 */
export interface RequestCreateEmployee extends IEmployeeBase, RequestWithToken {
  password: string
}

export type ResponseEmployees = ResponseReadEmployees | ResponseBaseError

// this type is not quite right, it is too generic
export type ResponseEmployee =
  | ResponseReadEmployee
  | ResponseBaseSuccessful
  | ResponseBaseFailure
  | ResponseBaseError
