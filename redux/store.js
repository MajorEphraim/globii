import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

import firstTimeReducer from './slices/firstTimeSlice'
import accountReducer from './slices/accountSlice'
import problemsReducer from './slices/problemsSlice'
import solutionsReducer from './slices/solutionsSlice'
import themeReducer from './slices/themeSlice'
import solversReducer from './slices/solversSlices'
import favoritesReducer from './slices/favoritesSlice'
import helpersReducer from './slices/helpersSlice'
import bankReducer from './slices/bankSlice'
import commentsReducer from './slices/commentsSlice'

export default configureStore({
  reducer: {
    authState: authReducer,
    firstTimeState:firstTimeReducer,
    accountState:accountReducer,
    problemsState:problemsReducer,
    solutionsState:solutionsReducer,
    themeState:themeReducer,
    solversState:solversReducer,
    favoritesState:favoritesReducer,
    helpersState:helpersReducer,
    bankState:bankReducer,
    commentsState:commentsReducer
  },
})