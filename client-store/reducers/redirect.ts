import { createReducer } from '@reduxjs/toolkit'
import { redirect as action } from '../actions'
import { redirect as initial } from '../initial'

export const redirect = createReducer(initial, (builder) => {
  builder.addCase(action.set, (state, action) => {
    state.path = action.payload
  })
})
