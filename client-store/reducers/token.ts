import { createReducer } from '@reduxjs/toolkit'
import { token as action } from '../actions'
import { token as initial } from '../initial'

export const token = createReducer(initial, (builder) => {
  builder
    .addCase(action.create, (state, action) => {
      state.value = action.payload
    })
    .addCase(action.delete, (state, action) => {
      state.value = null
    })
})
