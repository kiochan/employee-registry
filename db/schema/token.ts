import type { ObjectId, Document } from 'mongoose'

import { Schema, Types } from 'mongoose'
import { v4 as createUuid } from 'uuid'
/**
 * structure for document `token`
 */
export interface IToken extends Document {
  employee: ObjectId
  token: string
  expired: Date
}

/**
 * schema for document `token`
 */
export const TokenSchema = new Schema<IToken>({
  employee: { type: Types.ObjectId, required: true },
  token: { type: String, required: false, default: createUuid },
  expired: {
    type: Date,
    required: false,
    default: () => Date.now() + 1000 * 3600 * 24 * 7, // 7 days
  },
})
