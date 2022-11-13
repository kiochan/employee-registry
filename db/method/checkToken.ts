import { token as tokenModel } from '../model/token'

let timer: NodeJS.Timer

function startGlobalTokenExpireCheckTime(): void {
  timer = setInterval(() => {
    tokenModel
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
export async function checkToken(token: string): Promise<boolean> {
  if (timer === undefined) startGlobalTokenExpireCheckTime()

  const res = await tokenModel.findOne({ token }, { expired: 1, _id: 1 })

  if (res === null) {
    return false
  }

  // delete token if it expired
  if (res.expired.getTime() < Date.now()) {
    // no need for waiting it to be removed
    tokenModel.deleteOne({ _id: res._id }).catch(() => {
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
