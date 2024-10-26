import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken:null,
    isSignedIn:false,
  },
  reducers: {
    signInUser: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userToken = action.payload.userToken
      state.isSignedIn = action.payload.isSignedIn
    },
    signOutUser: (state,action) => {
      state.userToken = action.payload.userToken
      state.isSignedIn = action.payload.isSignedIn
    }
  }
})

export const { signInUser,signOutUser } = authSlice.actions
export default authSlice.reducer

