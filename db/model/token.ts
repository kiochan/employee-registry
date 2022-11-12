import type { IToken } from '../schema/token'

import { model, models } from 'mongoose'
import { TokenSchema } from '../schema/token'
/**
 * model for employee collection
 */
export const TokenModel = models.Token ?? model<IToken>('Token', TokenSchema)
