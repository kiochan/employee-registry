import { TokenSchema } from '../schema'
import { createModel } from '../method/createModel'

/**
 * model for employee collection
 */
export const TokenModel = createModel('Token', TokenSchema)
