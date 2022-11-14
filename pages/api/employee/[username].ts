import type { NextApiRequest, NextApiResponse } from 'next'
import { usernameAlreadyExist } from '../../../const/api/employee'
import { badRequest, internalServerError, notFound } from '../../../const/api/errors'
import { HttpStatusCode } from '../../../const/api/http-status-code'
import { useDb } from '../../../db'
import { isValidNextApiRequest } from '../../../db/method'
import type { IEmployee } from '../../../db/schema'
import { generateSalt, getHashedPassword } from '../../../lib/hashed-password'
import type { ResponseBaseSuccessful } from '../../../types/api/common'
import type { ResponseEmployee, ResponseReadEmployee } from '../../../types/api/employee'

type ApiTokenResponse = ResponseEmployee

export default async function employeeHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): Promise<void> {
  try {
    // check permissions
    if (!(await isValidNextApiRequest(req, res))) return

    const { model } = useDb()

    const username = String(req.query.username ?? '')

    const employee = await model.employee
      .findOne(
        {
          username,
        },
        { _id: 0, password: 0, passwordSalt: 0 },
      )
      .exec()

    switch (req.method) {
      // READ
      case 'GET': {
        if (employee === null) {
          return res.status(notFound.code).json(notFound)
        }

        const { username, email, lastName, firstName, address, role } = employee

        const result: ResponseReadEmployee = {
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

      // create new
      case 'POST': {
        if (employee !== null) {
          return res.status(usernameAlreadyExist.code).json(usernameAlreadyExist)
        }

        if (typeof req.query.password !== 'string') {
          return res.status(badRequest.code).json(badRequest)
        }

        // create new salt for password
        const passwordSalt = generateSalt()
        // hash it
        const password = getHashedPassword(req.query.password, passwordSalt)

        const newObj: IEmployee = {
          username,
          password,
          passwordSalt,
        }

        const fields = ['email', 'lastName', 'firstName', 'address', 'role'] as const

        for (const field of fields) {
          if (typeof req.query[field] === 'string') {
            newObj[field] = req.query[field] as string
          }
        }

        await model.employee.collection.insertOne(newObj)

        const result: ResponseBaseSuccessful = {
          code: HttpStatusCode.Created,
          status: 'success',
        }

        return res.status(result.code).json(result)
      }
    }
  } catch (e) {
    return res.status(internalServerError.code).json({ ...internalServerError, message: String(e) })
  }
}
