import { Schema, Document } from 'mongoose'

/**
 * structure for document `employee`
 */
export interface IEmployee extends Document {
  username: string
  email?: string
  lastName?: string
  firstName?: string
  address?: string
  role?: string
}

export interface IUserBase extends Document {
  username: string
  password?: string
  passwordSalt?: string
}

export interface IEmployeeWithPassword extends IEmployee, IUserBase {}

/**
 * schema for document `employee`
 */
export const EmployeeSchema = new Schema<IEmployeeWithPassword>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false, default: undefined },
  passwordSalt: { type: String, required: false, default: undefined },
  email: { type: String, required: false },
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, required: false },
})
