import { configureStore } from "@reduxjs/toolkit"
import customersReducer from "./slices/customersSlice"
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
