import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-admin-gray-50">
      <AdminSidebar />
      <div className="ml-0 lg:ml-64">
        <AdminHeader />
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout