import React, { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  Building2,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Warehouse,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = ({ isOpen = false, onClose = () => { } }) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState(['inventory', 'reports'])

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
      badge: null
    },
    {
      icon: Package,
      label: 'Products',
      path: '/admin/products',
      badge: null
    },
    {
      icon: Building2,
      label: 'Inventory',
      path: '/admin/inventory',
      badge: '3',
      submenu: [
        { label: 'Overview', path: '/admin/inventory/overview' },
        { label: 'Low Stock Alerts', path: '/admin/inventory/alerts' },
        { label: 'Stock Movements', path: '/admin/inventory/movements' },
        { label: 'Adjustments', path: '/admin/inventory/adjustments' }
      ]
    },
    {
      icon: ShoppingCart,
      label: 'Orders',
      path: '/admin/orders',
      badge: '12'
    },
    {
      icon: BarChart3,
      label: 'Reports',
      path: '/admin/reports',
      badge: null,
      submenu: [
        { label: 'Sales Report', path: '/admin/reports/sales' },
        { label: 'Inventory Report', path: '/admin/reports/inventory' },
        { label: 'Customer Report', path: '/admin/reports/customers' },
        { label: 'Profit & Loss', path: '/admin/reports/profit-loss' }
      ]
    },
    {
      icon: Users,
      label: 'Users',
      path: '/admin/users',
      badge: null
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/admin/settings',
      badge: null
    },
  ]

  const toggleMenu = (menuLabel) => {
    setExpandedMenus(prev =>
      prev.includes(menuLabel)
        ? prev.filter(item => item !== menuLabel)
        : [...prev, menuLabel]
    )
  }

  const isMenuActive = (item) => {
    if (item.path === location.pathname) return true
    if (item.submenu) {
      return item.submenu.some(subItem => subItem.path === location.pathname)
    }
    return false
  }

  const isSubmenuActive = (subItem) => {
    return subItem.path === location.pathname
  }

  return (
    <>
      {/* Mobile Sidebar */}
      {isOpen && (
        <div onClick={onClose} className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}
      <div className={`lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white/95 backdrop-blur-xl border-r border-admin-gray-200 shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-admin-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-admin-primary rounded-lg flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-admin-gray-900">SalesHostel</h1>
              <p className="text-xs text-admin-gray-500">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-admin-gray-500 hover:text-admin-primary rounded-lg">
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = isMenuActive(item)
            const isExpanded = expandedMenus.includes(item.label.toLowerCase())

            return (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.label.toLowerCase())}
                      className={`admin-sidebar-item w-full justify-between ${isActive ? 'active' : ''}`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-admin-primary text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`block px-3 py-2 text-sm text-admin-gray-600 hover:text-admin-primary hover:bg-admin-gray-50 rounded-lg transition-colors duration-200 ${isSubmenuActive(subItem) ? 'text-admin-primary bg-admin-primary/10' : ''
                              }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`admin-sidebar-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-admin-primary text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            )
          })}
          <div className="pt-4 border-t border-admin-gray-200 mt-4">
            <button className="admin-sidebar-item w-full text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block admin-sidebar">
        <div className="p-6 border-b border-admin-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-admin-primary rounded-xl flex items-center justify-center mr-3">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-admin-gray-900">SalesHostel</h1>
              <p className="text-sm text-admin-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = isMenuActive(item)
            const isExpanded = expandedMenus.includes(item.label.toLowerCase())

            return (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.label.toLowerCase())}
                      className={`admin-sidebar-item w-full justify-between ${isActive ? 'active' : ''}`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-admin-primary text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`block px-3 py-2 text-sm text-admin-gray-600 hover:text-admin-primary hover:bg-admin-gray-50 rounded-lg transition-colors duration-200 ${isSubmenuActive(subItem) ? 'text-admin-primary bg-admin-primary/10' : ''
                              }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`admin-sidebar-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-admin-primary text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            )
          })}

          <div className="pt-4 border-t border-admin-gray-200 mt-4">
            <button className="admin-sidebar-item w-full text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar