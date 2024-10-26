import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites:[]
  },
  reducers: {
    updateFavorites: (state,action) => {
      state.favorites = action.payload
    }
  }
})

export const { updateFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer