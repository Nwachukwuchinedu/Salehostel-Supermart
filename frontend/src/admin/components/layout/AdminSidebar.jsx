import React from 'react'
import { 
  LayoutDashboard, 
  Package, 
  Building2, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Building2, label: 'Inventory', path: '/admin/inventory' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      <div className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white/90 backdrop-blur-xl border-r border-admin-gray-200/50 shadow-glass-lg z-50">
        <div className="p-6">
          <h1 className="text-xl font-bold text-admin-gray-900">Admin Panel</h1>
        </div>
        <nav className="space-y-1 px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link 
                key={index}
                to={item.path}
                className={`admin-sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <button className="admin-sidebar-item w-full mt-4">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block admin-sidebar">
        <div className="p-6">
          <h1 className="text-xl font-bold text-admin-gray-900">Admin Panel</h1>
        </div>
        <nav className="space-y-1 px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link 
                key={index}
                to={item.path}
                className={`admin-sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <button className="admin-sidebar-item w-full mt-4">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar