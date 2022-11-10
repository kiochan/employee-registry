import type { IToken } from '../schema/token'

import { model } from 'mongoose'
import { TokenSchema } from '../schema/token'
/**
 * model for employee collection
 */
export const TokenModel = model<IToken>('Token', TokenSchema)
