import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, internalServerError, notFound } from '../../const/api/errors'
import { HttpStatusCode } from '../../const/api/http-status-code'
import { useDb } from '../../db'
import { isValidNextApiRequest } from '../../db/method'
import type { IEmployeeBase } from '../../db/schema'
import type { ResponseBaseSuccessful } from '../../types/api/common'

interface ResponseWhois extends ResponseBaseSuccessful {
  data: IEmployeeBase
}

type ApiTokenResponse =
  | ResponseWhois
  | typeof notFound
  | typeof badRequest
  | typeof internalServerError

export default async function whoisHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): Promise<void> {
  try {
    // check permissions
    if (!(await isValidNextApiRequest(req, res, false))) {
      return res.status(notFound.code).json(notFound)
    }

    switch (req.method) {
      case 'GET': {
        const { model } = useDb()

        const token = req.query.token

        const _token = await model.token.findOne({ token }, { employee: 1 })

        // this is not needed, because isValidNextApiRequest() already check the token
        // but i leave this code here prevent typing errors,
        // also it will prevent error if isValidNextApiRequest() removed
        if (_token === null) {
          return res.status(notFound.code).json(notFound)
        }

        const employee = await model.employee.findById(_token.employee, {
          username: 1,
          email: 1,
          lastName: 1,
          firstName: 1,
          address: 1,
          role: 1,
        })

        if (employee === null) {
          return res.status(notFound.code).json(notFound)
        }

        const { username, email, lastName, firstName, address, role } = employee

        const result: ResponseWhois = {
          code: HttpStatusCode.Ok,
          status: 'success',
          data: {
            username,
            email,
            lastName,
            firstName,
            address,
            role,
          },
        }

        return res.status(result.code).json(result)
      }

      default: {
        return res.status(badRequest.code).json(badRequest)
      }
    }
  } catch (e) {
    return res
      .status(internalServerError.code)
      .json({ ...internalServerError, message: String(e) } as unknown as typeof internalServerError)
  }
}
