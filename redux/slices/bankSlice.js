import { createSlice } from '@reduxjs/toolkit'

const bankSlice = createSlice({
  name: 'banking details',
  initialState: {
    accountHolder:'',
    accountNumber:'', 
    accountType:'', 
    branchCode:'', 
    bankName:'', 
    cellNumber:''
  },
  reducers: {
    updateBankingDetails: (state,action) => {
     
      state.accountHolder = action.payload.accountHolder
      state.accountNumber = action.payload.accountNumber
      state.accountType = action.payload.accountType
      state.branchCode = action.payload.branchCode
      state.bankName = action.payload.bankName
      state.cellNumber = action.payload.cellNumber
    }
  }
})

export const { updateBankingDetails } = bankSlice.actions
export default bankSlice.reducer

