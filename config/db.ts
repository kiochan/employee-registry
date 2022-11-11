import type { DbConfig } from '../types/db'

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DBNAME } = process.env as Record<
  string,
  string
>

if (
  [MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DBNAME].some(
    (value) => value === undefined,
  )
) {
  console.error('you must create a proper ".env" file. (see README.md)')
  process.exit(1)
}

/**
 * settings of database
 */
export const db: DbConfig = {
  /**
   * uri for connect to database
   *
   * You can hardcode this, but we RECOMMEND you to use a dotenv file.
   */
  uri: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DBNAME}/?retryWrites=true&w=majority`,
}
