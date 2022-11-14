import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, internalServerError } from '../../../const/api/errors'
import { useDb } from '../../../db'
import { isValidNextApiRequest } from '../../../db/method'

import type { ResponseEmployees, ResponseReadEmployees } from '../../../types/api/employee'

type ApiTokenResponse = ResponseEmployees

export default async function employeeHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): Promise<void> {
  try {
    // check permissions
    if (!(await isValidNextApiRequest(req, res))) return

    switch (req.method) {
      // READ
      case 'GET': {
        const { model } = useDb()

        // check query
        const offset = parseInt(String(req.query.offset ?? 0))
        const limit = parseInt(String(req.query.limit ?? 20))
        const total = await model.employee.count()

        const employees = await model.employee
          .find({}, { _id: 0, password: 0, passwordSalt: 0 })
          .skip(offset)
          .limit(limit)

        const result: ResponseReadEmployees = {
          code: 200,
          status: 'success',
          offset,
          limit,
          total,
          data: employees,
        }

        return res.status(result.code).json(result)
      }
      default: {
        return res.status(badRequest.code).json(badRequest)
      }
    }
  } catch (e) {
    return res.status(internalServerError.code).json({ ...internalServerError, message: String(e) })
  }
}
