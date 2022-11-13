import type { ResponseBaseFailure, ResponseBaseSuccessful } from './common'

/**
 * login option
 *
 * use employee username and password to create a token
 */
export interface RequestCreateToken {
  /**
   * username of a employee
   */
  username: string
  /**
   * password of this employee
   */
  password: string
}

export type ResponseCreateToken = ResponseCreateTokenSuccessful | ResponseCreateTokenFailure

/**
 * return type of login option if successful
 */
export interface ResponseCreateTokenSuccessful extends ResponseBaseSuccessful {
  status: 'success'
  data: {
    /**
     * it must return a token as api key for other service if login successfully
     */
    token: string
  }
}

/**
 * return type of login option if unsuccessful
 */
export interface ResponseCreateTokenFailure extends ResponseBaseFailure {
  status: 'fail'
  message: string
}

/**
 * logout option
 */
export interface RequestDeleteToken {
  token: string
}
