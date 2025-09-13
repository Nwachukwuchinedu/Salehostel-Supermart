import React from 'react'
import { Bell, User } from 'lucide-react'

const AdminHeader = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-admin-gray-200/50 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-gray-900">Dashboard Overview</h1>
          <p className="text-admin-gray-600">Welcome back, Admin</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="admin-btn-glass">
            <Bell className="w-5 h-5" />
          </button>
          <div className="admin-glass-card px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-admin-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-admin-gray-700">John Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader