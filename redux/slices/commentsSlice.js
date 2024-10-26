import { createSlice } from '@reduxjs/toolkit'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    allComments:[]
  },
  reducers: {
    updateAllComments: (state,action) => {
      state.allComments = action.payload
    },
  }
})

export const { updateAllComments } = commentsSlice.actions
export default commentsSlice.reducer