import { createSlice } from '@reduxjs/toolkit'

const solversSlice = createSlice({
  name: 'solvers',
  initialState: {
    solvers:[],
  },
  reducers: {
    updateSolvers: (state,action) => {
      state.solvers = action.payload
    }
  }
})

export const { updateSolvers } = solversSlice.actions
export default solversSlice.reducer

