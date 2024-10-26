import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    themeName:'light mode pink',
    textColor:'#3c3c3c', 
    headingColor:'#292525',
    themeColor:'#cd17d4',
    iconColor:'#3c3c3c',
    placeholderColor:'#f0baf2',
    btnTextColor:'#fefefe',
    borderColor:'#40153a',
    viewProbBackground:'#e9e9e9',
    viewSolBackground:'#f6f6f6',
    btnIconCol:"#fefcfe",
    inputTextCol:'#4c4949',
    placeholderCol:"#e2dce1",
    backgroundColor:'#fefcfe'
  },
  reducers: {
    updateTheme: (state,action) => {
      state.themeName = action.payload.themeName
      state.textColor = action.payload.textColor
      state.headingColor = action.payload.headingColor
      state.themeColor = action.payload.themeColor
      state.backgroundColor = action.payload.backgroundColor
      state.iconColor = action.payload.iconColor
      state.placeholderColor = action.payload.placeholderColor
      state.btnTextColor = action.payload.btnTextColor
      state.borderColor = action.payload.borderColor
      state.viewProbBackground = action.payload.viewProbBackground
      state.viewSolBackground = action.payload.viewSolBackground
      state.btnIconCol = action.payload.btnIconCol
      state.inputTextCol = action.payload.inputTextCol
      state.placeholderCol = action.payload.placeholderCol
    }
  }
})

export const { updateTheme } = themeSlice.actions
export default themeSlice.reducer

