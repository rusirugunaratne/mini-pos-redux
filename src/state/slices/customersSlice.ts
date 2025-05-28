import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { customersData } from "../../data/data"
import type { Customer, CustomerFormData } from "../../types/Customer"

interface CustomerState {
  customers: Customer[]
}

const initialState: CustomerState = {
  customers: customersData,
}

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<CustomerFormData>) => {
      const newCustomer = {
        ...action.payload,
        id: Date.now(),
      }
      state.customers.push(newCustomer)
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex((customer) => customer.id === action.payload.id)
      if (index !== -1) {
        state.customers[index] = action.payload
      }
    },
    deleteCustomer: (state, action: PayloadAction<number>) => {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload)
    },
  },
})

export default customerSlice.reducer

export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions
