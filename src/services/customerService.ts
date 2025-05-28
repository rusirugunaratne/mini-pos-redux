import type { Customer } from "../types/Customer"
import apiClient from "./apiClient"

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient.get("/customers")
  return response.data
}

export const deleteCustomer = async (id: number): Promise<void> => {
  await apiClient.delete(`/customers/${id}`)
}

export const addCustomer = async (customerData: Omit<Customer, "id">): Promise<Customer> => {
  const response = await apiClient.post("/customers", customerData)
  return response.data
}

export const updateCustomer = async (id: number, customerData: Omit<Customer, "id">) => {
  const response = await apiClient.put(`/customers/${id}`, customerData)
  return response.data
}
