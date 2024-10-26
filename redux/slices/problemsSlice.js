import { createSlice } from '@reduxjs/toolkit'

const problemsSlice = createSlice({
  name: 'problems',
  initialState: {
    allProblems:[]
  },
  reducers: {
    updateAllProblems: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.allProblems = action.payload
    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updateAllProblems } = problemsSlice.actions
export default problemsSlice.reducer