import { createAction } from '@reduxjs/toolkit'

export const redirect = {
  set: createAction<string, 'redirect/set'>('redirect/set'),
}
