import { createSlice } from '@reduxjs/toolkit'

const solutionsSlice = createSlice({
  name: 'solutions',
  initialState: {
    allSolutions:[]
  },
  reducers: {
    updateAllSolutions: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.allSolutions = action.payload
    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updateAllSolutions } = solutionsSlice.actions
export default solutionsSlice.reducer