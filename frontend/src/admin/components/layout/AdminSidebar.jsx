import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck, 
  ShoppingCart, 
  FileText, 
  BarChart3, 
  Warehouse,
  X
} from 'lucide-react'

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Suppliers', href: '/admin/suppliers', icon: Truck },
    { name: 'Purchase Orders', href: '/admin/purchases', icon: FileText },
    { name: 'Customer Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Inventory', href: '/admin/inventory', icon: Warehouse },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  ]

  const isActive = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-admin-primary">SalesHostel</h1>
            <p className="text-xs text-gray-600">Admin Panel</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    admin-sidebar-item
                    ${active ? 'active' : ''}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">SalesHostel Admin v1.0</p>
            <p className="text-xs text-gray-500">NDDC Hostel - Shop 12</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar