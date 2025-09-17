import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  FileText,
  User,
  LogOut,
  Bell,
  Clock,
} from "lucide-react";
import { useAuth } from "../../../shared/contexts/AuthContext";

const StaffLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/staff/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/staff/orders", icon: ShoppingCart },
    { name: "Inventory", href: "/staff/inventory", icon: Package },
    { name: "Customers", href: "/staff/customers", icon: Users },
    { name: "Reports", href: "/staff/reports", icon: FileText },
    { name: "Profile", href: "/staff/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-staff-primary/5 to-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-xl border-r border-staff-primary/20 shadow-xl z-40">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-staff-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-staff-primary">
                SalesHostel
              </h1>
              <p className="text-sm text-gray-600">Staff Portal</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2 px-4">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-staff-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-staff-primary/10 hover:text-staff-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-staff-primary/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-staff-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">Staff Member</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-xl border-b border-staff-primary/20 px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {navigation.find((item) =>
                  location.pathname.startsWith(item.href)
                )?.name || "Staff Portal"}
              </h2>
              <p className="text-gray-600">
                Manage orders and serve customers efficiently
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Shift: 8:00 AM - 6:00 PM</span>
              </div>
              <button className="relative p-2 text-gray-400 hover:text-staff-primary transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default StaffLayout;
