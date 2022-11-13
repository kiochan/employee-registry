import { TokenSchema } from '../schema'
import { createModel } from '../method/createModel'

/**
 * model for employee collection
 */
export const token = createModel('Token', TokenSchema)
