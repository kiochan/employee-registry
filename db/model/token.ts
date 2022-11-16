import { TokenSchema } from '../schema'
import { createModel } from '../method/createModel'

/**
 * model for token collection
 */
export const token = createModel('Token', TokenSchema)
