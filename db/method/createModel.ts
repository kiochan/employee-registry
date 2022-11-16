import type { Model, Schema } from 'mongoose'
import { model, models } from 'mongoose'

/**
 * create model from schema
 *
 * this function will create a new model only if it not exists
 * @param modelName name of model
 * @param schema schema for model
 * @returns model
 */
export function createModel<T>(modelName: string, schema: Schema<T>): Model<T> {
  return models[modelName] ?? model<T>(modelName, schema)
}
