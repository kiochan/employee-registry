import axios from 'axios'

/**
 * use api connection
 *
 * @param method http method
 * @param path path
 * @param payload request
 * @param callback callback with response
 */
export function api<Request = any, Response = any>(
  method: string,
  path: string,
  payload: Request,
  callback: (res: Response) => void,
): void {
  ;(async () => {
    const response = await axios({
      url: path,
      method,
      params: payload,
      validateStatus: (s) => s < 500,
    })

    if (response.data !== undefined) {
      callback(response.data)
    }
  })().catch(console.error)
}
