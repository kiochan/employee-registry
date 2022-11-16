import { CommentSchema } from '../schema'
import { createModel } from '../method/createModel'

/**
 * model for comment collection
 */
export const comment = createModel('Comment', CommentSchema)
