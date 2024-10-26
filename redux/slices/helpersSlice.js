import { createSlice } from '@reduxjs/toolkit'

const helpersSlice = createSlice({
  name: 'top helpers',
  initialState: {
    helpers:[],
  },
  reducers: {
    updateHelpers: (state,action) => {
      state.helpers = action.payload
    }
  }
})

export const { updateHelpers } = helpersSlice.actions
export default helpersSlice.reducer