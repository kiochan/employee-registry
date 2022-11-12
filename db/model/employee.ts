import type { IEmployee } from '../schema/employee'

import { model } from 'mongoose'
import { EmployeeSchema } from '../schema/employee'

/**
 * model for employee collection
 */
export const EmployeeModel = model<IEmployee>('Employee', EmployeeSchema)
