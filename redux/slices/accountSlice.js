import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'my account',
  initialState: {
    username:'',
    profilePic:'',
    bio:'',
    problemsSolved:0,
    problemsCreated:0,
    points:0,
    notification:true
  },
  reducers: {
    updateAccountDetails: (state,action) => {
     
      state.username = action.payload.username
      state.profilePic = action.payload.profilePic
      state.bio = action.payload.bio
      state.problemsSolved = action.payload.problemsSolved
      state.problemsCreated = action.payload.problemsCreated
      state.points = action.payload.points
      state.notification = action.payload.notification
    }
  }
})

export const { updateAccountDetails } = accountSlice.actions
export default accountSlice.reducer

