import type { IEmployee } from '../schema/employee'

import { model, models } from 'mongoose'
import { EmployeeSchema } from '../schema/employee'

/**
 * model for employee collection
 */
export const EmployeeModel = models.Employee ?? model<IEmployee>('Employee', EmployeeSchema)
