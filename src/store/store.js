import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from "./Reducers/CounterReducer"
import fetchSidebarReducer from "./Reducers/NavlinkReducer"
import  AuthUserReducer  from './Reducers/AuthUserReducer'
export const store = configureStore({
  reducer: {
    sidebar : CounterReducer,
    fetchSidebarReducer : fetchSidebarReducer,
    AuthUserReducer : AuthUserReducer
  },
})