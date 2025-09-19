import React, { useState } from 'react'
import {
  Bell,
  User,
  Search,
  Menu,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  HelpCircle
} from 'lucide-react'
import { useLocation } from 'react-router-dom'

const AdminHeader = ({ onOpenSidebar }) => {
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/dashboard')) return 'Dashboard'
    if (path.includes('/products')) return 'Products'
    if (path.includes('/inventory')) return 'Inventory'
    if (path.includes('/orders')) return 'Orders'
    if (path.includes('/reports')) return 'Reports'
    if (path.includes('/users')) return 'Users'
    if (path.includes('/settings')) return 'Settings'
    return 'Dashboard'
  }

  const getBreadcrumbs = () => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Admin', path: '/admin' }]

    segments.forEach((segment, index) => {
      if (segment !== 'admin') {
        const path = '/' + segments.slice(0, index + 1).join('/')
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
        breadcrumbs.push({ label, path })
      }
    })

    return breadcrumbs
  }

  const notifications = [
    { id: 1, title: 'Low Stock Alert', message: 'Rice is running low (5 units left)', time: '2 min ago', type: 'warning' },
    { id: 2, title: 'New Order', message: 'Order #1234 has been placed', time: '5 min ago', type: 'info' },
    { id: 3, title: 'Stock Update', message: 'Beans stock has been updated', time: '10 min ago', type: 'success' },
  ]

  return (
    <header className="admin-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button onClick={onOpenSidebar} className="lg:hidden p-2 text-admin-gray-600 hover:text-admin-primary hover:bg-admin-gray-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title and Breadcrumbs */}
          <div>
            <h1 className="text-2xl font-bold text-admin-gray-900">{getPageTitle()}</h1>
            <nav className="admin-breadcrumb">
              {getBreadcrumbs().map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="admin-breadcrumb-separator">/</span>}
                  <span className="admin-breadcrumb-item">{crumb.label}</span>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="admin-search-box">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="admin-search-input w-64"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-admin-gray-600 hover:text-admin-primary hover:bg-admin-gray-100 rounded-lg transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Help */}
          <button className="p-2 text-admin-gray-600 hover:text-admin-primary hover:bg-admin-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-admin-gray-600 hover:text-admin-primary hover:bg-admin-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="admin-dropdown-menu w-80 right-0">
                <div className="px-4 py-3 border-b border-admin-gray-200">
                  <h3 className="text-sm font-medium text-admin-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-admin-gray-50 border-b border-admin-gray-100">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                          }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-admin-gray-900">{notification.title}</p>
                          <p className="text-sm text-admin-gray-600">{notification.message}</p>
                          <p className="text-xs text-admin-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-admin-gray-200">
                  <button className="text-sm text-admin-primary hover:text-admin-primary/80">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 hover:bg-admin-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-admin-primary flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-admin-gray-900">John Admin</p>
                <p className="text-xs text-admin-gray-500">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-admin-gray-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="admin-dropdown-menu w-56 right-0">
                <div className="px-4 py-3 border-b border-admin-gray-200">
                  <p className="text-sm font-medium text-admin-gray-900">John Admin</p>
                  <p className="text-sm text-admin-gray-500">john@admin.com</p>
                </div>
                <div className="py-1">
                  <button className="admin-dropdown-item w-full text-left">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  <button className="admin-dropdown-item w-full text-left">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <button className="admin-dropdown-item w-full text-left">
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                  </button>
                </div>
                <div className="py-1 border-t border-admin-gray-200">
                  <button className="admin-dropdown-item w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader