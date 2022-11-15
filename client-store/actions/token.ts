import { createAction } from '@reduxjs/toolkit'

export const token = {
  create: createAction<string, 'token/create'>('token/create'),
  delete: createAction('token/delete'),
}
