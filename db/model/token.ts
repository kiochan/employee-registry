import type { IToken } from '../schema/token'

import { model, models } from 'mongoose'
import { TokenSchema } from '../schema/token'

const _model = model<IToken>('Token', TokenSchema)

/**
 * model for employee collection
 */
export const TokenModel = (models.Token as typeof _model) ?? _model
