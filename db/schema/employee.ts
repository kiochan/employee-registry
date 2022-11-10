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

/**
 * schema for document `employee`
 */
export const EmployeeSchema = new Schema<IEmployee>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, required: false },
})
