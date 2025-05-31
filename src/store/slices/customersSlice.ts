import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { customersData } from "../../data/data";
import type { Customer } from "../../types/Customer";

interface CustomerState {
    customers: Customer[]
}

const initialState: CustomerState = {
    customers: customersData
}

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload)
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const index = state.customers
            .findIndex((customer)=> customer.id === action.payload.id)
            if(index !== -1){
                state.customers[index] = action.payload
            }
        },
        deleteCustomer: (state, action: PayloadAction<number>) => {
            state.customers = state.customers.filter((customer) => customer.id !== action.payload)
        }
    }
})

export default customerSlice.reducer
export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions