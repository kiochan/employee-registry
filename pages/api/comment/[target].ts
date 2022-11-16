import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, internalServerError, unauthorized } from '../../../const/api/errors'
import { useDb } from '../../../db'

type ApiTokenResponse =
  | typeof unauthorized
  | typeof badRequest
  | typeof internalServerError
  | {
      code: 201
      status: 'success'
    }
  | {
      code: 200
      status: 'success'
      data: Array<{
        author: string
        date: Date
        contents: string
      }>
    }

export default async function tokenHandle(
  req: NextApiRequest,
  res: NextApiResponse<ApiTokenResponse>,
): Promise<void> {
  const { model } = useDb()

  try {
    switch (req.method) {
      // create a new comment
      case 'POST': {
        const { token, target, contents } = req.query

        const tokenDocument = await model.token.findOne({ token }, { employee: 1 })
        if (tokenDocument === null) return res.status(unauthorized.code).json(unauthorized)

        const employeeDocument = await model.employee.findOne(
          { _id: tokenDocument.employee },
          { username: 1 },
        )
        if (employeeDocument === null) return res.status(unauthorized.code).json(unauthorized)

        const Comment = model.comment

        await model.comment.collection.insertOne(
          new Comment({
            target,
            contents,
            author: employeeDocument.username,
          }),
        )

        return res.status(201).json({
          code: 201,
          status: 'success',
        })
      }

      // read comments
      case 'GET': {
        const { token, target } = req.query

        const tokenDocument = await model.token.findOne({ token }, { employee: 1 })
        if (tokenDocument === null) return res.status(unauthorized.code).json(unauthorized)

        const commentDocuments = await model.comment
          .find({ target }, { date: 1, author: 1, contents: 1 })
          .sort({ date: -1 })

        return res.status(200).json({
          code: 200,
          status: 'success',
          data: commentDocuments,
        })
      }

      default: {
        return res.status(badRequest.code).json(badRequest)
      }
    }
  } catch (e) {
    return res.status(internalServerError.code).json(internalServerError)
  }
}
