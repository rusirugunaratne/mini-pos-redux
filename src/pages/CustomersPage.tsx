import React, { useState } from "react"
import { MdAdd } from "react-icons/md"
import Dialog from "../components/Dialog"
import type { Customer } from "../types/Customer"
import CustomersTable from "../components/tables/CustomersTable"
import CustomerForm from "../components/forms/CustomerForm"
import { customersData } from "../data/data"

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(customersData)

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleAddCustomer = () => {
    setSelectedCustomer(null)
    setIsAddDialogOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  const handleFormSubmit = (customerData: Omit<Customer, "id">) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === selectedCustomer.id ? { ...customerData, id: selectedCustomer.id } : customer
        )
      )
      setIsEditDialogOpen(false)
      console.log("Customer updated:", { ...customerData, id: selectedCustomer.id })
    } else {
      // Add new customer
      const newCustomer = { ...customerData, id: Date.now() }
      setCustomers((prev) => [...prev, newCustomer])
      setIsAddDialogOpen(false)
      console.log("Customer added:", newCustomer)
    }
    setSelectedCustomer(null)
  }

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers((prev) => prev.filter((customer) => customer.id !== selectedCustomer.id))
      console.log("Customer deleted:", selectedCustomer)
      setIsDeleteDialogOpen(false)
      setSelectedCustomer(null)
    }
  }

  const cancelDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedCustomer(null)
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Customers</h1>
          <button
            onClick={handleAddCustomer}
            className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150'
          >
            <MdAdd className='w-5 h-5' />
            <span>Add Customer</span>
          </button>
        </div>

        {/* Customers Table */}
        <CustomersTable customers={customers} onEdit={handleEditCustomer} onDelete={handleDeleteCustomer} />

        {/* Add Customer Dialog */}
        <Dialog
          isOpen={isAddDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            // This will be handled by the form submission
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Add New Customer'
        >
          <CustomerForm onSubmit={handleFormSubmit} />
        </Dialog>

        {/* Edit Customer Dialog */}
        <Dialog
          isOpen={isEditDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Edit Customer'
        >
          <CustomerForm customer={selectedCustomer} onSubmit={handleFormSubmit} />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog isOpen={isDeleteDialogOpen} onCancel={cancelDialog} onConfirm={confirmDelete} title='Delete Customer'>
          <p className='text-gray-700'>
            Are you sure you want to delete <strong>{selectedCustomer?.name}</strong>? This action cannot be undone.
          </p>
        </Dialog>
      </div>
    </div>
  )
}

export default CustomersPage
