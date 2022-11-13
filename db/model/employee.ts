import type { IEmployee } from '../schema/employee'

import { model, models } from 'mongoose'
import { EmployeeSchema } from '../schema/employee'

export const _model = model<IEmployee>('Employee', EmployeeSchema)

/**
 * model for employee collection
 */
export const EmployeeModel = (models.Employee as typeof _model) ?? _model
