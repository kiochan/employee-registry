import type { IDatabaseConstructor, IDatabase, DbMode } from '../types/db'

class _Database implements IDatabase {
  protected static mode: DbMode = 'low'

  /**
   * set database mode
   * @param mode database mode
   * @returns class itself
   */
  static use(mode: DbMode): typeof _Database {
    if (mode === 'low') return _Database

    throw new TypeError('non-supported database mode')
  }

  static get(databaseName: string): IDatabase {
    return new _Database(databaseName)
  }

  protected _name: string

  /**
   * name of database
   */
  get name(): string {
    return this._name
  }

  /**
   * constructor to create a new database
   * @param name name of database
   */
  protected constructor(name: string) {
    this._name = name
  }

  async connect(): Promise<this> {
    // TODO: connect database

    return this
  }
}

export const Database: IDatabaseConstructor = _Database
