import { EmployeeSchema } from '../schema'
import { createModel } from '../method/createModel'

/**
 * model for employee collection
 */
export const EmployeeModel = createModel('Employee', EmployeeSchema)
