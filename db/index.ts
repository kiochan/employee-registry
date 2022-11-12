import { connect, connection } from 'mongoose'
import { db as dbConfig } from '../config/db'
import { EmployeeModel } from './model/employee'
import { TokenModel } from './model/token'

interface Models {
  employee: typeof EmployeeModel
  token: typeof TokenModel
}

interface DbController {
  model: Models
}

export function useDb(): DbController {
  // if mongoose not connected then connect it
  if (connection.readyState !== 1) {
    connect(dbConfig.uri).catch((err) => {
      // mongoose will automatically try to reconnect if it fails.
      // so we didn't handle the error manually
      // we only print it to the console
      console.error(err)
    })
  }

  return {
    model: {
      employee: EmployeeModel,
      token: TokenModel,
    },
  }
}
