400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          secondary: '#6b7280',
          accent: '#2563eb',
          warning: '#f59e0b',
          danger: '#ef4444',
        },
        
        // Staff Theme
        staff: {
          primary: {
            DEFAULT: '#7c3aed',
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
          },
          secondary: '#6b7280',
          accent: '#f59e0b',
          warning: '#f97316',
          danger: '#ef4444',
        },
        
        // Customer Theme
        customer: {
          primary: {
            DEFAULT: '#ec4899',
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          secondary: '#8b5cf6',
          accent: '#f59e0b',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        }
      },
      
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      animation: {
        'package-select': 'packageSelect 0.3s ease-out',
        'cart-bounce': 'cartBounce 0.6s ease-out',
        'order-status': 'orderStatus 1s ease-in-out',
        'supply-flow': 'supplyFlow 2s ease-in-out infinite',
      },
      
      keyframes: {
        packageSelect: {
          '0%': { transform: 'scale(1)', borderColor: 'transparent' },
          '50%': { transform: 'scale(1.05)', borderColor: 'currentColor' },
          '100%': { transform: 'scale(1)', borderColor: 'currentColor' },
        },
        cartBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        orderStatus: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        supplyFlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### Custom Component Classes for SalesHostel
```css
@layer components {
  /* ===== ADMIN COMPONENTS ===== */
  
  .admin-dashboard-card {
    @apply bg-white/90 backdrop-blur-md border border-admin-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300;
  }
  
  .admin-revenue-card {
    @apply admin-dashboard-card relative overflow-hidden;
  }
  
  .admin-revenue-card::before {
    @apply absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-admin-primary to-admin-success;
    content: '';
  }
  
  .admin-supplier-card {
    @apply bg-supplier-primary/5 border border-supplier-primary/20 rounded-xl p-6 hover:bg-supplier-primary/10 transition-colors duration-300;
  }
  
  .admin-order-table {
    @apply bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg;
  }
  
  /* ===== SUPPLIER COMPONENTS ===== */
  
  .supplier-dashboard-card {
    @apply bg-white/90 backdrop-blur-md border border-supplier-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300;
  }
  
  .supplier-supply-form {
    @apply bg-supplier-glass backdrop-blur-xl border border-supplier-glass-border rounded-2xl p-8;
  }
  
  .supplier-product-card {
    @apply bg-white border border-supplier-primary/20 rounded-xl p-4 hover:border-supplier-primary/40 transition-all duration-300 hover:-translate-y-1;
  }
  
  .supplier-payment-status {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold;
  }
  
  .supplier-payment-pending {
    @apply supplier-payment-status bg-amber-100 text-amber-800;
  }
  
  .supplier-payment-paid {
    @apply supplier-payment-status bg-supplier-primary/10 text-supplier-primary-dark;
  }
  
  /* ===== STAFF COMPONENTS ===== */
  
  .staff-dashboard-card {
    @apply bg-white/90 backdrop-blur-md border border-staff-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300;
  }
  
  .staff-order-card {
    @apply bg-white border border-staff-primary/20 rounded-xl p-4 hover:shadow-lg transition-all duration-300;
  }
  
  .staff-order-urgent {
    @apply staff-order-card border-staff-warning bg-staff-warning/5;
  }
  
  .staff-quick-action {
    @apply bg-staff-primary hover:bg-staff-primary-dark text-white px-4 py-2 rounded-lg transition-colors duration-200 active:scale-95;
  }
  
  .staff-inventory-alert {
    @apply bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3;
  }
  
  /* ===== CUSTOMER COMPONENTS ===== */
  
  .customer-product-card {
    @apply bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105;
  }
  
  .customer-package-option {
    @apply border-2 border-gray-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:border-customer-primary/50;
  }
  
  .customer-package-selected {
    @apply border-customer-primary bg-customer-primary/10 text-customer-primary-dark;
  }
  
  .customer-cart-item {
    @apply flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl;
  }
  
  .customer-order-status {
    @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
  }
  
  .customer-order-pending {
    @apply customer-order-status bg-amber-100 text-amber-800;
  }
  
  .customer-order-confirmed {
    @apply customer-order-status bg-blue-100 text-blue-800;
  }
  
  .customer-order-ready {
    @apply customer-order-status bg-customer-primary/10 text-customer-primary-dark;
  }
  
  /* ===== SHARED COMPONENTS ===== */
  
  .category-badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800;
  }
  
  .category-staple-foods {
    @apply bg-green-100 text-green-800;
  }
  
  .category-frozen-foods {
    @apply bg-blue-100 text-blue-800;
  }
  
  .category-convenience-foods {
    @apply bg-purple-100 text-purple-800;
  }
  
  .category-cleaning-agents {
    @apply bg-indigo-100 text-indigo-800;
  }
  
  .category-personal-care {
    @apply bg-pink-100 text-pink-800;
  }
  
  .mobile-nav-item {
    @apply flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-100 transition-colors duration-200;
  }
  
  .whatsapp-button {
    @apply bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 hover:scale-105;
  }
}
```

---

## 🎭 Role-Specific Interface Design

### 1. Admin Interface

#### Dashboard Overview
```jsx
// Admin Dashboard with Revenue & Inventory Focus
<div className="min-h-screen bg-gray-50">
  <aside className="fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-xl border-r border-admin-primary/20 shadow-xl">
    <div className="p-6">
      <h1 className="text-xl font-bold text-admin-primary">SalesHostel Admin</h1>
      <p className="text-sm text-gray-600">NDDC Hostel - Shop 12</p>
    </div>
    
    <nav className="space-y-2 px-4">
      <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-admin-primary text-white rounded-lg">
        <LayoutDashboard className="w-5 h-5" />
        <span>Dashboard</span>
      </Link>
      <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-admin-primary/10 rounded-lg">
        <Package className="w-5 h-5" />
        <span>Products</span>
      </Link>
      <Link to="/admin/suppliers" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-admin-primary/10 rounded-lg">
        <Truck className="w-5 h-5" />
        <span>Suppliers</span>
      </Link>
      <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-admin-primary/10 rounded-lg">
        <ShoppingCart className="w-5 h-5" />
        <span>Customer Orders</span>
      </Link>
      <Link to="/admin/purchases" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-admin-primary/10 rounded-lg">
        <FileText className="w-5 h-5" />
        <span>Purchase Orders</span>
      </Link>
      <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-admin-primary/10 rounded-lg">
        <Users className="w-5 h-5" />
        <span>User Management</span>
      </Link>
    </nav>
  </aside>
  
  <div className="ml-64 p-8">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-600">Today's business performance</p>
    </div>
    
    {/* Revenue & Sales Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="admin-revenue-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-admin-primary/10 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-admin-primary" />
          </div>
          <span className="text-green-600 text-sm font-semibold">+12%</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">₦48,500</div>
        <div className="text-gray-600 text-sm">Today's Revenue</div>
      </div>
      
      <div className="admin-dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-green-600 text-sm font-semibold">+8</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">47</div>
        <div className="text-gray-600 text-sm">Orders Today</div>
      </div>
      
      <div className="admin-dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <span className="text-red-600 text-sm font-semibold">-3</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">12</div>
        <div className="text-gray-600 text-sm">Low Stock Items</div>
      </div>
      
      <div className="admin-dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-supplier-primary/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-supplier-primary" />
          </div>
          <span className="text-blue-600 text-sm font-semibold">2 active</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">5</div>
        <div className="text-gray-600 text-sm">Suppliers</div>
      </div>
    </div>
    
    {/* Quick Actions */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2">
        <div className="admin-order-table">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.number}</p>
                    <p className="text-sm text-gray-600">{order.customerName} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₦{order.total}</p>
                    <span className={`customer-order-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="admin-dashboard-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-admin-primary hover:bg-admin-primary-dark text-white px-4 py-3 rounded-lg transition-colors">
              Add New Product
            </button>
            <button className="w-full bg-supplier-primary hover:bg-supplier-primary-dark text-white px-4 py-3 rounded-lg transition-colors">
              Create Purchase Order
            </button>
            <button className="w-full bg-staff-primary hover:bg-staff-primary-dark text-white px-4 py-3 rounded-lg transition-colors">
              Assign Staff Role
            </button>
          </div>
        </div>
        
        <div className="admin-dashboard-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Rice (Black Rubber)</p>
                <p className="text-sm text-red-600">Only 2 left</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-900">Indomie Noodles</p>
                <p className="text-sm text-amber-600">5 cartons left</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Product Management with Variants
```jsx
// Admin Product Management with Package Variants
<div className="p-8">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
      <p className="text-gray-600">Manage products and their package variants</p>
    </div>
    <button className="bg-admin-primary hover:bg-admin-primary-dark text-white px-6 py-3 rounded-lg flex items-center gap-2">
      <Plus className="w-5 h-5" />
      Add New Product
    </button>
  </div>
  
  {/* Category Filter */}
  <div className="admin-dashboard-card mb-8">
    <div className="flex flex-wrap gap-3">
      <button className="category-badge category-staple-foods">Staple Foods</button>
      <button className="category-badge category-frozen-foods">Frozen Foods</button>
      <button className="category-badge category-convenience-foods">Convenience Foods</button>
      <button className="category-badge">Sauces/Spices</button>
      <button className="category-badge">Cooking Oils</button>
      <button className="category-badge">Groceries</button>
      <button className="category-badge category-cleaning-agents">Cleaning Agents</button>
      <button className="category-badge category-personal-care">Personal Care</button>
    </div>
  </div>
  
  {/* Products Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map(product => (
      <div key={product.id} className="admin-dashboard-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <span className="category-badge">{product.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-admin-primary">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Package Variants:</h4>
          {product.variants.map(variant => (
            <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{variant.packageType}</p>
                <p className="text-sm text-gray-600">Stock: {variant.stock}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₦{variant.price}</p>
                <p className="text-xs text-gray-500">Cost: ₦{variant.costPrice}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-admin-primary/10 text-admin-primary px-4 py-2 rounded-lg hover:bg-admin-primary/20 transition-colors">
            Manage Variants
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
```

### 2. Supplier Interface

#### Supply Management Dashboard
```jsx
// Supplier Dashboard with Supply Focus
<div className="min-h-screen bg-gradient-to-br from-supplier-primary/5 to-white">
  <header className="bg-white/95 backdrop-blur-xl border-b border-supplier-primary/20 px-8 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-supplier-primary">Supplier Portal</h1>
        <p className="text-gray-600">Welcome back, Supplier Name</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="whatsapp-button">
          <MessageCircle className="w-5 h-5" />
          Contact Admin
        </button>
      </div>
    </div>
  </header>
  
  <main className="p-8">
    {/* Supply Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="supplier-dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-supplier-primary/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-supplier-primary" />
          </div>
          <span className="text-green-600 text-sm font-semibold">This month</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">₦127,500</div>
        <div className="text-gray-600 text-sm">Total Supplies</div>
      </div>
      
      <div className="supplier-dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-blue-600 text-sm font-semibold">Active</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">23</div>
        <div className="text-gray-600 text-sm">Products Supplied</div>
      </div>
      
      <div className="supplier-dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <span className="text-amber-600 text-sm font-semibold">Pending</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">₦15,000</div>
        <div className="text-gray-600 text-sm">Awaiting Payment</div>
      </div>
    </div>
    
    {/* New Supply Form */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="supplier-supply-form">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Record New Supply</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-supplier-primary focus:border-transparent">
              <option value="">Select Product</option>
              <option value="rice">Rice</option>
              <option value="garri">Garri</option>
              <option value="beans">Beans</option>
              <option value="noodles">Indomie Noodles</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-supplier-primary focus:border-transparent">
              <option value="">Select Package</option>
              <option value="black-rubber">Black Rubber</option>
              <option value="half-rubber">Half Rubber</option>
              <option value="cup">Cup</option>
              <option value="paint-rubber">Paint Rubber</option>
              <option value="carton">Carton</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-supplier-primary focus:border-transparent"
                placeholder="e.g., 50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price (₦)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-supplier-primary focus:border-transparent"
                placeholder="e.g., 3650"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
              placeholder="Auto-calculated"
              readOnly
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-supplier-primary hover:bg-supplier-primary-dark text-white px-6 py-3 rounded-lg transition-colors animate-supply-flow"
          >
            Record Supply
          </button>
        </form>
      </div>
      
      {/* Recent Supplies */}
      <div className="supplier-dashboard-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Supplies</h3>
        
        <div className="space-y-4">
          {recentSupplies.map(supply => (
            <div key={supply.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{supply.productName}</p>
                <p className="text-sm text-gray-600">{supply.packageType} • {supply.quantity} units</p>
                <p className="text-xs text-gray-500">{supply.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₦{supply.amount}</p>
                <span className={supply.paymentStatus === 'paid' ? 'supplier-payment-paid' : 'supplier-payment-pending'}>
                  {supply.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Purchase Orders from Admin */}
    <div className="supplier-dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Purchase Orders</h3>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">2 New</span>
      </div>
      
      <div className="space-y-4">
        {purchaseOrders.map(order => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">Order #{order.number}</h4>
                <p className="text-sm text-gray-600">Requested on {order.date}</p>
              </div>
              # SalesHostel UI/UX Design Guide 2025

## 🎨 Design Philosophy

### Vision Statement
Create a comprehensive, role-based inventory management and e-commerce platform for SalesHostel that delivers distinct yet cohesive experiences for Admin, Supplier, Staff, and Customer users. The design combines modern aesthetics with practical functionality, optimized for the hostel retail environment and mobile-first usage.

### Design Principles
- **Role-Differentiated**: Distinct visual languages for each user role
- **Mobile-First**: Optimized for smartphone usage in hostel environment
- **Quick Access**: Fast navigation for busy retail operations
- **Clear Hierarchy**: Easy product browsing with package variants
- **Trust Building**: Professional design for supplier relationships
- **Accessibility**: Inclusive design for all user types

---

## 🌈 Role-Based Design System

### Admin Theme (Authority & Control)
```css
/* Admin Color Palette */
:root {
  /* Primary Colors */
  --admin-primary: #1e40af;        /* Blue-700 - Authority */
  --admin-primary-light: #3b82f6;  /* Blue-500 */
  --admin-primary-dark: #1e3a8a;   /* Blue-800 */
  
  /* Secondary Colors */
  --admin-secondary: #64748b;      /* Slate-500 - Professional */
  --admin-accent: #059669;         /* Emerald-600 - Success */
  --admin-warning: #d97706;        /* Amber-600 - Alerts */
  --admin-danger: #dc2626;         /* Red-600 - Critical */
  
  /* Glassmorphism */
  --admin-glass: rgba(30, 64, 175, 0.1);
  --admin-glass-border: rgba(30, 64, 175, 0.2);
  --admin-glass-shadow: rgba(30, 64, 175, 0.15);
}
```

### Supplier Theme (Partnership & Growth)
```css
/* Supplier Color Palette */
:root {
  /* Primary Colors */
  --supplier-primary: #059669;        /* Emerald-600 - Growth */
  --supplier-primary-light: #10b981;  /* Emerald-500 */
  --supplier-primary-dark: #047857;   /* Emerald-700 */
  
  /* Secondary Colors */
  --supplier-secondary: #6b7280;      /* Gray-500 - Stability */
  --supplier-accent: #2563eb;         /* Blue-600 - Trust */
  --supplier-warning: #f59e0b;        /* Amber-500 */
  --supplier-danger: #ef4444;         /* Red-500 */
  
  /* Glassmorphism */
  --supplier-glass: rgba(5, 150, 105, 0.1);
  --supplier-glass-border: rgba(5, 150, 105, 0.2);
  --supplier-glass-shadow: rgba(5, 150, 105, 0.15);
}
```

### Staff Theme (Efficiency & Action)
```css
/* Staff Color Palette */
:root {
  /* Primary Colors */
  --staff-primary: #7c3aed;        /* Violet-600 - Efficiency */
  --staff-primary-light: #8b5cf6;  /* Violet-500 */
  --staff-primary-dark: #6d28d9;   /* Violet-700 */
  
  /* Secondary Colors */
  --staff-secondary: #6b7280;      /* Gray-500 */
  --staff-accent: #f59e0b;         /* Amber-500 - Energy */
  --staff-warning: #f97316;        /* Orange-500 */
  --staff-danger: #ef4444;         /* Red-500 */
  
  /* Glassmorphism */
  --staff-glass: rgba(124, 58, 237, 0.1);
  --staff-glass-border: rgba(124, 58, 237, 0.2);
  --staff-glass-shadow: rgba(124, 58, 237, 0.15);
}
```

### Customer Theme (Welcoming & Friendly)
```css
/* Customer Color Palette */
:root {
  /* Primary Colors */
  --customer-primary: #ec4899;        /* Pink-500 - Friendly */
  --customer-primary-light: #f472b6;  /* Pink-400 */
  --customer-primary-dark: #db2777;   /* Pink-600 */
  
  /* Secondary Colors */
  --customer-secondary: #8b5cf6;      /* Violet-500 - Modern */
  --customer-accent: #f59e0b;         /* Amber-500 - Warmth */
  --customer-success: #10b981;        /* Emerald-500 */
  --customer-warning: #f59e0b;        /* Amber-500 */
  --customer-danger: #ef4444;         /* Red-500 */
  
  /* Glassmorphism */
  --customer-glass: rgba(236, 72, 153, 0.1);
  --customer-glass-border: rgba(236, 72, 153, 0.2);
  --customer-glass-shadow: rgba(236, 72, 153, 0.15);
}
```

---

## 🎨 Tailwind CSS Configuration

### Updated Configuration for SalesHostel
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Admin Theme
        admin: {
          primary: {
            DEFAULT: '#1e40af',
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e3a8a',
            900: '#1e40af',
          },
          secondary: '#64748b',
          success: '#059669',
          warning: '#d97706',
          danger: '#dc2626',
        },
        
        // Supplier Theme
        supplier: {
          primary: {
            DEFAULT: '#059669',
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',