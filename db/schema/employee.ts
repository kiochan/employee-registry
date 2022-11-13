import { Schema } from 'mongoose'

/**
 * structure for document `employee`
 */
export interface IEmployeeBase {
  username: string
  email?: string
  lastName?: string
  firstName?: string
  address?: string
  role?: string
}

export interface IUserBase {
  username: string
  password?: string
  passwordSalt?: string
}

export interface IEmployee extends IEmployeeBase, IUserBase {}

/**
 * schema for document `employee`
 */
export const EmployeeSchema = new Schema<IEmployee>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false, default: undefined },
  passwordSalt: { type: String, required: false, default: undefined },
  email: { type: String, required: false },
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, required: false },
})
