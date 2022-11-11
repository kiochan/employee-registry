import { ResponseBaseSuccessful } from './common'

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

/**
 * return type of login option
 */
export interface ResponseCreateToken extends ResponseBaseSuccessful {
  /**
   * status
   *
   * 'ok' - if login successfully
   * 'failed' - if username and password mismatch
   */
  status: 'success'
  data: {
    /**
     * it must return a token as api key for other service if login successfully
     */
    token: string
  }
}

/**
 * logout option
 */
export interface RequestDeleteToken {
  token: string
}
