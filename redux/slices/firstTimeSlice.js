import { createSlice } from '@reduxjs/toolkit'

const firstTimeSlice = createSlice({
  name: 'first time updater',
  initialState: {
    isAgreed:null,
    isChosen:null
  },
  reducers: {
    updateIsAgreed: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAgreed = action.payload
    },
    updateIsChosen: (state,action) => {
      state.isChosen = action.payload
    }
  }
})

export const { updateIsAgreed, updateIsChosen } = firstTimeSlice.actions
export default firstTimeSlice.reducer

