import { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, internalServerError } from '../../const/api/errors'
import { usernameNotFound, usernamePasswordMismatch } from '../../const/api/token'
import { useDb } from '../../db'
import { getHashedPassword } from '../../lib/hashed-password'
import { ResponseBaseError } from '../../types/api/common'
import { ResponseCreateToken } from '../../types/api/token'

type ApiTokenResponse = ResponseBaseError | ResponseCreateToken

export default async function tokenHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): Promise<void> {
  switch (req.method) {
    case 'POST': {
      const { model } = useDb()

      // get username and password from user input
      const { username, password } = req.query

      // check if they all exist
      if ([username, password].some((value) => typeof value !== 'string')) {
        // error => bad request
        return res.status(badRequest.code).json(badRequest)
      }

      // read userinfo from db
      const employeeData = await model.employee
        .findOne({ username }, { password: 1, passwordSalt: 1, _id: 1 })
        .exec()

      // check if user exist
      if (employeeData === null) {
        // error user not exist
        return res.status(usernameNotFound.code).json(usernameNotFound)
      }

      // check if password is correct
      // password is hashed for safety reasons
      if (password !== getHashedPassword(employeeData.password, employeeData.passwordSalt)) {
        // error => password not match
        return res.status(usernamePasswordMismatch.code).json(usernamePasswordMismatch)
      }

      const insertedId = (
        await model.token.collection.insertOne({
          employee: employeeData._id,
        })
      ).insertedId

      const tokenData = await model.token.findOne({ _id: insertedId })

      if (tokenData === null) {
        return res.status(internalServerError.code).json(internalServerError)
      }

      return res.status(201).json({
        code: 201,
        status: 'success',
        data: {
          token: tokenData.token,
        },
      })
    }
    default: {
      return res.status(badRequest.code).json(badRequest)
    }
  }
}
