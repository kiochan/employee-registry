/**
 * interface for database configuration
 */
export interface DbConfig {
  mode: DbMode
  settings?: DbSettings
}

export type DbMode = 'low' | 'mongo'

/**
 * settings for individual database mode
 */
export type DbSettings = LowDbSettings | {}

/**
 * settings of lowdb
 *
 * lowdb will be used under development stage
 */
export interface LowDbSettings {
  path: string
}

/**
 * type declaration for Database class itself
 */
export interface IDatabaseConstructor {
  use: (mode: DbMode) => IDatabaseConstructor
  get: (databaseName: string) => IDatabase
}

/**
 * adapter for database
 */
export interface IDatabase {
  readonly name: string
  connect: () => Promise<IDatabase>
}
