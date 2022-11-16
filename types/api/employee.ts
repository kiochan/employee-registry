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
  query?: string
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

/**
 * response for create employee
 */
export interface ResponseCreateEmployee extends ResponseBaseSuccessful {
  code: 201
  data: { token: string }
}

export type ResponseEmployees = ResponseReadEmployees | ResponseBaseError

/**
 * update employee
 */
export interface RequestUpdateEmployee extends IEmployeeBase, RequestWithToken {
  password?: string
}

/**
 * delete employee
 */
export interface RequestDeleteEmployee extends RequestWithToken {
  username: string
}

// this type is not quite right, it is too generic
export type ResponseEmployee =
  | ResponseReadEmployee
  | ResponseBaseSuccessful
  | ResponseBaseFailure
  | ResponseBaseError
  | ResponseCreateEmployee
