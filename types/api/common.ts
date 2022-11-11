/**
 * base interface for response
 */
export interface ResponseBase {
  /**
   * HTTP status code
   */
  code: number
  /**
   * status either `success` or `error`
   */
  status: 'success' | 'error'
}

/**
 * base interface for succeed response
 */
export interface ResponseBaseSuccessful extends ResponseBase {
  status: 'success'
  /**
   * payload data
   */
  data: any
}

/**
 * base interface for failed response
 */
export interface ResponseBaseFailure extends ResponseBase {
  status: 'error'
  message: string
}
