import type { NextApiRequest, NextApiResponse } from 'next'
import { unauthorized } from '../../const/api/errors'
import * as model from '../model'

let timer: NodeJS.Timer

/**
 * this function will remove expired token every hour
 */
function startGlobalTokenExpireCheckTime(): void {
  timer = setInterval(() => {
    model.token
      .deleteMany({
        expired: {
          $gt: new Date(),
        },
      })
      .catch(() => {
        console.error('lastGlobalTokenCheckTime: error')
      })
  }, 1000 * 3600) // 1 hour
}

/**
 * check if a token is valid
 *
 * @param token token that need to be check
 * @returns if it is a valid token
 */
export async function isValidToken(token: string): Promise<boolean> {
  // this is for testing
  if (process.env.MAGIC_TOKEN !== undefined && process.env.MAGIC_TOKEN === token) {
    return true
  }
  if (timer === undefined) startGlobalTokenExpireCheckTime()

  const res = await model.token.findOne({ token }, { expired: 1, _id: 1 })

  if (res === null) {
    return false
  }

  // delete token if it expired
  if (res.expired.getTime() < Date.now()) {
    // no need for waiting it to be removed
    model.token.deleteOne({ _id: res._id }).catch(() => {
      console.error('checkToken delete expired token: error')
    })

    return false
  }

  // extend expiration time
  res.expired = new Date(Date.now() + 1000 * 3600 * 24 * 7) // 7 days

  // no need for waiting new date to be set
  res.save().catch(() => {
    console.error('checkToken update token expire: error')
  })

  return true
}

/**
 * check if api request with a valid token
 *
 * @param req next api request
 * @param res next api response
 * @returns true if value, otherwise false
 */
export async function isValidNextApiRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  sendResponse: boolean = true,
): Promise<boolean> {
  const token = String(req.query.token ?? '')
  if (await isValidToken(token)) {
    return true
  }
  if (sendResponse) res.status(unauthorized.code).json(unauthorized)
  return false
}
