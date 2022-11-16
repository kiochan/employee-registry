import { Schema } from 'mongoose'
/**
 * structure for document `comment`
 */
export interface IComment {
  target: string
  author: string
  contents: string
  date: Date
}

/**
 * schema for document `comment`
 */
export const CommentSchema = new Schema<IComment>({
  target: { type: String, required: true },
  author: { type: String, required: true },
  contents: { type: String, required: true },
  date: {
    type: Date,
    required: false,
    default: (): Date => new Date(Date.now()),
  },
})
