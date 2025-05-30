import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 260,
}

export const counterSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    Toggle: (state,newValue) => {
        if(newValue == 0){
            state.value == 0
        }else{
            state.value == 260 ? state.value = 0 : state.value = 260
        }
     
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { Toggle, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer