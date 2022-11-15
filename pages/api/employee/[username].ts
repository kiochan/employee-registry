import type { NextApiRequest, NextApiResponse } from 'next'
import { usernameAlreadyExist } from '../../../const/api/employee'
import { badRequest, internalServerError, notFound } from '../../../const/api/errors'
import { HttpStatusCode } from '../../../const/api/http-status-code'
import { useDb } from '../../../db'
import { isValidNextApiRequest } from '../../../db/method'
import type { IEmployee } from '../../../db/schema'
import { generateSalt, getHashedPassword } from '../../../lib/hashed-password'
import type {
  ResponseEmployee,
  ResponseReadEmployee,
  ResponseCreateEmployee,
} from '../../../types/api/employee'

type ApiTokenResponse = ResponseEmployee

export default async function employeeHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): Promise<void> {
  try {
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
        // check permissions
        if (!(await isValidNextApiRequest(req, res))) return

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

        const insertedIdForNewEmployee = (await model.employee.collection.insertOne(newObj))
          .insertedId

        const Token = model.token

        const insertedTokenId = (
          await model.token.collection.insertOne(
            new Token({
              employee: insertedIdForNewEmployee,
            }),
          )
        ).insertedId

        const tokenDocument = await model.token.findById(insertedTokenId, { token: 1 })

        if (tokenDocument !== null) {
          const result: ResponseCreateEmployee = {
            code: HttpStatusCode.Created,
            status: 'success',
            data: {
              token: tokenDocument.token,
            },
          }
          return res.status(result.code).json(result)
        }

        return res.status(internalServerError.code).json(internalServerError)
      }
    }
  } catch (e) {
    return res.status(internalServerError.code).json({ ...internalServerError, message: String(e) })
  }
}
