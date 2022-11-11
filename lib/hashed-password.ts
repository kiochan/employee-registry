import crypto from 'crypto'

/**
 *  get hashed password
 *
 * @param password non-hashed password
 * @param salt salt for password hashing
 * @returns hashed password
 */
export function getHashedPassword(password: string, salt?: string): string {
  const hash = crypto.createHash('md5')
  hash.update(password)
  if (salt !== undefined) {
    hash.update(salt)
  }

  return hash.digest('hex')
}

/**
 * Generate a salt string for password hashing
 *
 * @returns a random string
 */
export function generateSalt(): string {
  return crypto.createHash('md5').update(String(Math.random())).digest('hex')
}
