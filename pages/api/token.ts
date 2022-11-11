import { NextApiRequest, NextApiResponse } from 'next'
import { badRequest } from '../../const/api/errors'
import { ResponseBaseFailure } from '../../types/api/common'
import { ResponseCreateToken } from '../../types/api/token'

type ApiTokenResponse = ResponseBaseFailure | ResponseCreateToken

export default function tokenHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): void {
  switch (req.method) {
    case 'POST': {
      // TODO: generate a token and save it into mongodb
      res.status(201).json({
        code: 201,
        status: 'success',
        data: {
          token: '<This should return a token>',
        },
      })
      break
    }
    default: {
      res.status(badRequest.code).json(badRequest)
    }
  }
}
