/**
 * base interface for response
 */
export interface ResponseBase {
  /**
   * HTTP status code
   */
  code: number
  /**
   * status either `success`, `fail` or `error`
   * `success` - a operation succeeded
   * `fail` - a operation reject by server
   * `error` - client sent what it should not be sent or
   *  server dose not know what client want to do
   */
  status: 'success' | 'fail' | 'error'
}

/**
 * base interface for succeed response
 */
export interface ResponseBaseSuccessful extends ResponseBase {
  status: 'success'
}

/**
 * base interface for failed response
 */
export interface ResponseBaseFailure extends ResponseBase {
  status: 'fail'
  message: string
}

/**
 * base interface for error response
 */
export interface ResponseBaseError extends ResponseBase {
  status: 'error'
  message: string
}
