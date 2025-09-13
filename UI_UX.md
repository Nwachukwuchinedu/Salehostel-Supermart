# Inventory Management System - UI/UX Design Guide 2025

## 🎨 Design Philosophy

### Vision Statement
Create a cutting-edge, role-based inventory management and e-commerce platform that delivers distinct yet cohesive experiences for Admin/Managers and Customers. The design combines modern glassmorphism effects, micro-interactions, and accessibility-first principles using Tailwind CSS for rapid development and consistent styling.

### Design Principles
- **Role-Specific Design**: Distinct visual languages for admin and customer interfaces
- **Tailwind-First**: Utility-first approach with custom component classes
- **Performance-Optimized**: Beautiful effects that maintain 60fps
- **Accessibility-Focused**: WCAG AA compliance across all interfaces
- **Mobile-First**: Responsive design with touch-optimized interactions

---

## 🌈 Role-Based Design System

### Admin Theme (Professional & Efficient)
```css
/* Admin Color Palette */
:root {
  /* Primary Colors */
  --admin-primary: #1e40af;        /* Blue-700 */
  --admin-primary-light: #3b82f6;  /* Blue-500 */
  --admin-primary-dark: #1e3a8a;   /* Blue-800 */
  
  /* Secondary Colors */
  --admin-secondary: #64748b;      /* Slate-500 */
  --admin-accent: #059669;         /* Emerald-600 */
  --admin-warning: #d97706;        /* Amber-600 */
  --admin-danger: #dc2626;         /* Red-600 */
  
  /* Neutral Scale */
  --admin-gray-50: #f8fafc;
  --admin-gray-100: #f1f5f9;
  --admin-gray-200: #e2e8f0;
  --admin-gray-300: #cbd5e1;
  --admin-gray-400: #94a3b8;
  --admin-gray-500: #64748b;
  --admin-gray-600: #475569;
  --admin-gray-700: #334155;
  --admin-gray-800: #1e293b;
  --admin-gray-900: #0f172a;
  
  /* Glassmorphism */
  --admin-glass: rgba(248, 250, 252, 0.8);
  --admin-glass-border: rgba(30, 64, 175, 0.2);
  --admin-glass-shadow: rgba(30, 64, 175, 0.1);
}

/* Admin Dark Mode */
[data-theme="dark"] {
  --admin-primary: #3b82f6;
  --admin-gray-50: #0f172a;
  --admin-gray-100: #1e293b;
  --admin-gray-900: #f8fafc;
  --admin-glass: rgba(30, 41, 59, 0.8);
}
```

### Customer Theme (Engaging & Modern)
```css
/* Customer Color Palette */
:root {
  /* Primary Colors */
  --customer-primary: #7c3aed;        /* Violet-600 */
  --customer-primary-light: #8b5cf6;  /* Violet-500 */
  --customer-primary-dark: #6d28d9;   /* Violet-700 */
  
  /* Secondary Colors */
  --customer-secondary: #ec4899;      /* Pink-500 */
  --customer-accent: #f59e0b;         /* Amber-500 */
  --customer-success: #10b981;        /* Emerald-500 */
  --customer-warning: #f59e0b;        /* Amber-500 */
  --customer-danger: #ef4444;         /* Red-500 */
  
  /* Gradient Combinations */
  --customer-gradient-primary: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  --customer-gradient-accent: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
  --customer-gradient-success: linear-gradient(135deg, #10b981 0%, #7c3aed 100%);
  
  /* Glassmorphism */
  --customer-glass: rgba(255, 255, 255, 0.1);
  --customer-glass-border: rgba(124, 58, 237, 0.2);
  --customer-glass-shadow: rgba(124, 58, 237, 0.15);
}
```

### Typography System
```css
/* Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  /* Font Families */
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-display: 'Poppins', system-ui, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

---

## 🎨 Tailwind CSS Configuration

### Updated Tailwind Config
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
        // Admin Theme Colors
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
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        },
        
        // Customer Theme Colors
        customer: {
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
          secondary: '#ec4899',
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
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      boxShadow: {
        'glass-sm': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'glass-md': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'glass-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'admin-glow': '0 0 20px rgba(30, 64, 175, 0.3)',
        'customer-glow': '0 0 20px rgba(124, 58, 237, 0.3)',
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.8)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@headlessui/tailwindcss'),
  ],
}
```

### Custom Component Classes
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  * {
    @apply border-border;
  }
  
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply bg-gray-50 text-gray-900 font-primary antialiased;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    @apply w-2;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-gray-100;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-full;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400;
  }
}

@layer components {
  /* ===== ADMIN COMPONENTS ===== */
  
  /* Admin Glass Card */
  .admin-glass-card {
    @apply bg-white/80 backdrop-blur-md border border-admin-gray-200/50 rounded-xl shadow-glass-md;
  }
  
  .admin-glass-card-dark {
    @apply bg-admin-gray-800/80 backdrop-blur-md border border-admin-gray-700/50;
  }
  
  /* Admin Buttons */
  .admin-btn-primary {
    @apply bg-admin-primary hover:bg-admin-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95;
  }
  
  .admin-btn-secondary {
    @apply bg-admin-secondary hover:bg-admin-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200;
  }
  
  .admin-btn-glass {
    @apply bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-admin-gray-700 font-medium px-6 py-3 rounded-lg transition-all duration-200;
  }
  
  .admin-btn-danger {
    @apply bg-admin-danger hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200;
  }
  
  /* Admin Form Elements */
  .admin-input {
    @apply bg-white/50 backdrop-blur-sm border border-admin-gray-300 rounded-lg px-4 py-3 text-admin-gray-900 placeholder:text-admin-gray-500 focus:ring-2 focus:ring-admin-primary focus:border-transparent transition-all duration-200;
  }
  
  .admin-select {
    @apply bg-white/50 backdrop-blur-sm border border-admin-gray-300 rounded-lg px-4 py-3 text-admin-gray-900 focus:ring-2 focus:ring-admin-primary focus:border-transparent transition-all duration-200;
  }
  
  .admin-textarea {
    @apply bg-white/50 backdrop-blur-sm border border-admin-gray-300 rounded-lg px-4 py-3 text-admin-gray-900 placeholder:text-admin-gray-500 focus:ring-2 focus:ring-admin-primary focus:border-transparent resize-none transition-all duration-200;
  }
  
  /* Admin Sidebar */
  .admin-sidebar {
    @apply fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-xl border-r border-admin-gray-200/50 shadow-glass-lg transform transition-transform duration-300 ease-in-out z-40;
  }
  
  .admin-sidebar-item {
    @apply flex items-center px-6 py-3 text-admin-gray-700 hover:bg-admin-primary/10 hover:text-admin-primary transition-all duration-200 group;
  }
  
  .admin-sidebar-item.active {
    @apply bg-admin-primary text-white shadow-md;
  }
  
  /* Admin Table */
  .admin-table {
    @apply w-full bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-glass-md;
  }
  
  .admin-table-header {
    @apply bg-admin-gray-50/80 backdrop-blur-sm;
  }
  
  .admin-table-row {
    @apply border-b border-admin-gray-200/50 hover:bg-admin-gray-50/50 transition-colors duration-200;
  }
  
  .admin-table-cell {
    @apply px-6 py-4 text-admin-gray-900;
  }
  
  /* Admin Stats Card */
  .admin-stats-card {
    @apply bg-white/80 backdrop-blur-md border border-admin-gray-200/50 rounded-xl p-6 shadow-glass-md hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1;
  }
  
  .admin-stats-icon {
    @apply w-12 h-12 rounded-lg flex items-center justify-center;
  }
  
  .admin-stats-number {
    @apply text-2xl font-bold text-admin-gray-900 font-display;
  }
  
  .admin-stats-label {
    @apply text-admin-gray-600 text-sm font-medium;
  }
  
  /* ===== CUSTOMER COMPONENTS ===== */
  
  /* Customer Glass Card */
  .customer-glass-card {
    @apply bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-glass-lg;
  }
  
  .customer-glass-card-solid {
    @apply bg-white backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-glass-md;
  }
  
  /* Customer Buttons */
  .customer-btn-primary {
    @apply bg-gradient-to-r from-customer-primary to-customer-secondary hover:from-customer-primary-dark hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-customer-glow active:scale-95;
  }
  
  .customer-btn-secondary {
    @apply bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg;
  }
  
  .customer-btn-glass {
    @apply bg-customer-glass hover:bg-white/20 backdrop-blur-xl border border-customer-glass-border text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-customer-glow;
  }
  
  .customer-btn-icon {
    @apply bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110;
  }
  
  /* Customer Product Cards */
  .customer-product-card {
    @apply bg-white backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-glass-md hover:shadow-glass-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group;
  }
  
  .customer-product-image {
    @apply aspect-square overflow-hidden relative;
  }
  
  .customer-product-overlay {
    @apply absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2;
  }
  
  .customer-product-info {
    @apply p-6;
  }
  
  .customer-product-title {
    @apply font-display font-semibold text-lg text-gray-900 mb-2;
  }
  
  .customer-product-price {
    @apply font-display font-bold text-xl text-customer-primary;
  }
  
  /* Customer Navigation */
  .customer-nav {
    @apply fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-glass-sm z-50;
  }
  
  .customer-nav-item {
    @apply text-gray-700 hover:text-customer-primary font-medium px-4 py-2 rounded-lg transition-colors duration-200;
  }
  
  .customer-nav-item.active {
    @apply text-customer-primary bg-customer-primary/10;
  }
  
  /* Customer Cart */
  .customer-cart-sidebar {
    @apply fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-glass-lg transform transition-transform duration-300 ease-in-out z-50;
  }
  
  .customer-cart-item {
    @apply flex items-center gap-4 p-4 border-b border-gray-200/50 last:border-b-0;
  }
  
  .customer-cart-badge {
    @apply absolute -top-2 -right-2 bg-customer-secondary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce;
  }
  
  /* ===== SHARED COMPONENTS ===== */
  
  /* Form Components */
  .form-group {
    @apply space-y-2;
  }
  
  .form-label {
    @apply block text-sm font-semibold text-gray-700;
  }
  
  .form-error {
    @apply text-sm text-red-600 mt-1;
  }
  
  .form-success {
    @apply text-sm text-green-600 mt-1;
  }
  
  /* Loading Components */
  .loading-spinner {
    @apply animate-spin rounded-full border-2 border-gray-300 border-t-current;
  }
  
  .loading-skeleton {
    @apply bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded;
  }
  
  /* Status Badges */
  .status-badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold;
  }
  
  .status-success {
    @apply bg-green-100 text-green-800;
  }
  
  .status-warning {
    @apply bg-yellow-100 text-yellow-800;
  }
  
  .status-danger {
    @apply bg-red-100 text-red-800;
  }
  
  .status-info {
    @apply bg-blue-100 text-blue-800;
  }
  
  /* Modal Components */
  .modal-backdrop {
    @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4;
  }
  
  .modal-content {
    @apply bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-glass-lg max-w-md w-full max-h-[90vh] overflow-y-auto;
  }
  
  .modal-header {
    @apply flex items-center justify-between p-6 border-b border-gray-200/50;
  }
  
  .modal-body {
    @apply p-6;
  }
  
  .modal-footer {
    @apply flex items-center justify-end gap-3 p-6 border-t border-gray-200/50;
  }
}

@layer utilities {
  /* Glass Effect Utilities */
  .glass-light {
    @apply bg-white/10 backdrop-blur-md;
  }
  
  .glass-medium {
    @apply bg-white/20 backdrop-blur-lg;
  }
  
  .glass-heavy {
    @apply bg-white/30 backdrop-blur-xl;
  }
  
  .glass-border {
    @apply border border-white/20;
  }
  
  /* Animation Utilities */
  .animate-float {
    @apply animate-float;
  }
  
  .animate-glow {
    @apply animate-pulse-glow;
  }
  
  .animate-gradient {
    @apply bg-gradient-to-r from-customer-primary via-customer-secondary to-customer-accent bg-[length:200%_100%] animate-gradient-shift;
  }
  
  /* Responsive Utilities */
  .responsive-padding {
    @apply px-4 sm:px-6 lg:px-8;
  }
  
  .responsive-margin {
    @apply mx-4 sm:mx-6 lg:mx-8;
  }
  
  /* Focus States */
  .focus-ring {
    @apply focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none;
  }
  
  .focus-ring-admin {
    @apply focus:ring-2 focus:ring-offset-2 focus:ring-admin-primary focus:outline-none;
  }
  
  .focus-ring-customer {
    @apply focus:ring-2 focus:ring-offset-2 focus:ring-customer-primary focus:outline-none;
  }
}
```

---

## 🎭 Role-Specific Interface Design

### Admin Interface Design

#### 1. Admin Dashboard Layout
```jsx
// AdminLayout Component Structure
<div className="min-h-screen bg-admin-gray-50">
  {/* Fixed Sidebar */}
  <aside className="admin-sidebar">
    <div className="p-6">
      <h1 className="text-xl font-bold text-admin-gray-900">Admin Panel</h1>
    </div>
    
    <nav className="space-y-1">
      <Link to="/admin/dashboard" className="admin-sidebar-item">
        <LayoutDashboard className="w-5 h-5 mr-3" />
        <span>Dashboard</span>
      </Link>
      <Link to="/admin/products" className="admin-sidebar-item">
        <Package className="w-5 h-5 mr-3" />
        <span>Products</span>
      </Link>
      <Link to="/admin/inventory" className="admin-sidebar-item">
        <Warehouse className="w-5 h-5 mr-3" />
        <span>Inventory</span>
      </Link>
      <Link to="/admin/orders" className="admin-sidebar-item">
        <ShoppingCart className="w-5 h-5 mr-3" />
        <span>Orders</span>
      </Link>
      <Link to="/admin/reports" className="admin-sidebar-item">
        <BarChart3 className="w-5 h-5 mr-3" />
        <span>Reports</span>
      </Link>
    </nav>
  </aside>
  
  {/* Main Content Area */}
  <div className="ml-64">
    {/* Top Header */}
    <header className="bg-white/80 backdrop-blur-md border-b border-admin-gray-200/50 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-gray-900">Dashboard Overview</h1>
          <p className="text-admin-gray-600">Welcome back, Admin</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="admin-btn-glass">
            <Bell className="w-5 h-5" />
          </button>
          <div className="admin-glass-card px-4 py-2">
            <span className="text-sm text-admin-gray-700">John Admin</span>
          </div>
        </div>
      </div>
    </header>
    
    {/* Dashboard Content */}
    <main className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <Package className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">2,547</div>
          <div className="admin-stats-label">Total Products</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-success/10 text-admin-success">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">1,248</div>
          <div className="admin-stats-label">Orders Today</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-warning/10 text-admin-warning">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div className="admin-stats-number">23</div>
          <div className="admin-stats-label">Low Stock Items</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">$48,392</div>
          <div className="admin-stats-label">Revenue Today</div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Sales Overview</h3>
          <div className="h-64 bg-admin-gray-50/50 rounded-lg flex items-center justify-center">
            <span className="text-admin-gray-500">Sales Chart Component</span>
          </div>
        </div>
        
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Inventory Status</h3>
          <div className="h-64 bg-admin-gray-50/50 rounded-lg flex items-center justify-center">
            <span className="text-admin-gray-500">Inventory Chart Component</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="admin-glass-card p-6">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-admin-gray-50/50 rounded-lg">
            <div className="w-10 h-10 bg-admin-primary/10 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-admin-primary" />
            </div>
            <div className="flex-1">
              <p className="text-admin-gray-900 font-medium">New product added</p>
              <p className="text-admin-gray-600 text-sm">iPhone 15 Pro Max added to inventory</p>
            </div>
            <span className="text-admin-gray-500 text-sm">2 mins ago</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

#### 2. Admin Product Management
```jsx
// Product List Page
<div className="p-8">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold text-admin-gray-900">Products</h1>
      <p className="text-admin-gray-600">Manage your product inventory</p>
    </div>
    <button className="admin-btn-primary">
      <Plus className="w-5 h-5 mr-2" />
      Add Product
    </button>
  </div>
  
  {/* Filters & Search */}
  <div className="admin-glass-card p-6 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search products..."
          className="admin-input pl-10 w-full"
        />
      </div>
      <select className="admin-select">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Clothing</option>
        <option>Books</option>
      </select>
      <select className="admin-select">
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Low Stock</option>
      </select>
      <button className="admin-btn-secondary">
        <Filter className="w-5 h-5 mr-2" />
        Apply Filters
      </button>
    </div>
  </div>
  
  {/* Products Table */}
  <div className="admin-table">
    <div className="admin-table-header">
      <div className="admin-table-row">
        <div className="admin-table-cell font-semibold">Product</div>
        <div className="admin-table-cell font-semibold">Category</div>
        <div className="admin-table-cell font-semibold">Stock</div>
        <div className="admin-table-cell font-semibold">Price</div>
        <div className="admin-table-cell font-semibold">Status</div>
        <div className="admin-table-cell font-semibold">Actions</div>
      </div>
    </div>
    <div>
      {products.map(product => (
        <div key={product.id} className="admin-table-row">
          <div className="admin-table-cell">
            <div className="flex items-center gap-3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-admin-gray-900">{product.name}</p>
                <p className="text-sm text-admin-gray-600">{product.sku}</p>
              </div>
            </div>
          </div>
          <div className="admin-table-cell">
            <span className="status-badge status-info">{product.category}</span>
          </div>
          <div className="admin-table-cell">
            <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
              {product.stock}
            </span>
          </div>
          <div className="admin-table-cell font-semibold">
            ${product.price}
          </div>
          <div className="admin-table-cell">
            <span className={`status-badge ${product.active ? 'status-success' : 'status-danger'}`}>
              {product.active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="admin-table-cell">
            <div className="flex items-center gap-2">
              <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-admin-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

### Customer Interface Design

#### 1. Customer Homepage
```jsx
// Customer Layout with Modern Header
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  {/* Navigation Header */}
  <header className="customer-nav">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent">
            ShopFlow
          </h1>
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="customer-nav-item">Home</Link>
          <Link to="/products" className="customer-nav-item">Products</Link>
          <Link to="/categories" className="customer-nav-item">Categories</Link>
          <Link to="/about" className="customer-nav-item">About</Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Search products..."
              className="hidden lg:block w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 pl-10 text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-customer-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          {/* Cart */}
          <button className="customer-btn-icon relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="customer-cart-badge">3</span>
          </button>
          
          {/* User Menu */}
          <button className="customer-btn-icon">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
  
  {/* Hero Section */}
  <section className="relative overflow-hidden py-20 lg:py-32">
    <div className="absolute inset-0 bg-gradient-to-br from-customer-primary/10 via-transparent to-customer-secondary/10"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent">
              Discover
            </span>
            <br />
            Amazing Products
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Explore our curated collection of premium products with real-time inventory and lightning-fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="customer-btn-primary">
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="customer-btn-glass">
              <Play className="w-5 h-5 mr-2" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        
        <div className="relative animate-fade-in">
          <div className="customer-glass-card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/hero-product.jpg" 
              alt="Featured Product"
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900">Premium Headphones</h3>
              <p className="text-customer-primary font-bold text-2xl mt-2">$299.99</p>
              <button className="customer-btn-primary w-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  {/* Featured Products */}
  <section className="py-20 bg-white/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hand-picked products that our customers love most
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="customer-product-card animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="customer-product-image">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="customer-product-overlay">
                <button className="customer-btn-icon">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="customer-btn-icon">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="customer-product-info">
              <h3 className="customer-product-title">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="customer-product-price">${product.price}</span>
                <button className="customer-btn-icon">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</div>
```

#### 2. Product Catalog Page
```jsx
// Product Catalog with Advanced Filtering
<div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:w-80">
        <div className="customer-glass-card-solid p-6 sticky top-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-customer-primary focus:ring-customer-primary"
                  />
                  <span className="ml-3 text-gray-700">{category.name}</span>
                  <span className="ml-auto text-gray-500 text-sm">({category.count})</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
          
          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-customer-primary focus:ring-customer-primary"
                  />
                  <div className="ml-3 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-gray-700">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <button className="customer-btn-primary w-full">
            Apply Filters
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Showing 1-24 of 156 products</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Best Rated</option>
            </select>
            
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button className="p-2 hover:bg-gray-100">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="customer-product-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="customer-product-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Quick Actions Overlay */}
                <div className="customer-product-overlay">
                  <button className="customer-btn-icon" title="Add to Wishlist">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="customer-btn-icon" title="Quick View">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="customer-btn-icon" title="Compare">
                    <GitCompare className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Product Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.isNew && (
                    <span className="bg-customer-secondary text-white px-2 py-1 rounded-full text-xs font-semibold">
                      New
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className="customer-product-info">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <h3 className="customer-product-title line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="customer-product-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <button className="customer-btn-icon group relative overflow-hidden">
                    <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </button>
                </div>
                
                {/* Stock Indicator */}
                <div className="mt-3">
                  {product.stock > 10 ? (
                    <span className="text-green-600 text-sm font-medium">In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className="text-amber-600 text-sm font-medium">Only {product.stock} left</span>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center mt-12">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[1, 2, 3, 4, 5].map(page => (
              <button 
                key={page}
                className={`px-4 py-2 rounded-lg font-medium ${
                  page === 1 
                    ? 'bg-customer-primary text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  </div>
</div>
```

#### 3. Shopping Cart Sidebar
```jsx
// Shopping Cart Sidebar Component
<div className={`customer-cart-sidebar ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
  {/* Header */}
  <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
    <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
    <button 
      onClick={onClose}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <X className="w-6 h-6" />
    </button>
  </div>
  
  {/* Cart Items */}
  <div className="flex-1 overflow-y-auto p-6">
    {cartItems.length === 0 ? (
      <div className="text-center py-12">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-6">Add some products to get started</p>
        <button 
          onClick={onClose}
          className="customer-btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    ) : (
      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item.id} className="customer-cart-item">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
              <p className="text-sm text-gray-600">${item.price}</p>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  {/* Cart Summary */}
  {cartItems.length > 0 && (
    <div className="border-t border-gray-200/50 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Shipping</span>
        <span className="font-semibold text-gray-900">Free</span>
      </div>
      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-customer-primary">${total.toFixed(2)}</span>
      </div>
      
      <div className="space-y-3">
        <button className="customer-btn-primary w-full">
          <CreditCard className="w-5 h-5 mr-2" />
          Checkout
        </button>
        <button 
          onClick={onClose}
          className="customer-btn-secondary w-full"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )}
</div>
```

---

## 🎨 Advanced Tailwind Components

### Custom Animation Classes
```css
@layer utilities {
  /* Stagger Animation */
  .animate-stagger-1 { animation-delay: 0.1s; }
  .animate-stagger-2 { animation-delay: 0.2s; }
  .animate-stagger-3 { animation-delay: 0.3s; }
  .animate-stagger-4 { animation-delay: 0.4s; }
  .animate-stagger-5 { animation-delay: 0.5s; }
  
  /* Text Animations */
  .animate-text-focus-in {
    animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }
  
  @keyframes text-focus-in {
    0% {
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      filter: blur(0px);
      opacity: 1;
    }
  }
  
  /* Card Hover Effects */
  .hover-lift {
    @apply transition-all duration-300 hover:-translate-y-2 hover:shadow-xl;
  }
  
  .hover-glow {
    @apply transition-all duration-300 hover:shadow-2xl;
  }
  
  .hover-scale {
    @apply transition-transform duration-300 hover:scale-105;
  }
  
  /* Glassmorphism Variants */
  .glass-ultra-light {
    @apply bg-white/5 backdrop-blur-sm border border-white/10;
  }
  
  .glass-light {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }
  
  .glass-medium {
    @apply bg-white/20 backdrop-blur-lg border border-white/30;
  }
  
  .glass-heavy {
    @apply bg-white/30 backdrop-blur-xl border border-white/40;
  }
  
  /* Gradient Text */
  .text-gradient-primary {
    @apply bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent;
  }
  
  .text-gradient-admin {
    @apply bg-gradient-to-r from-admin-primary to-admin-success bg-clip-text text-transparent;
  }
  
  /* Interactive Elements */
  .interactive-scale {
    @apply transition-transform duration-200 active:scale-95;
  }
  
  .interactive-opacity {
    @apply transition-opacity duration-200 hover:opacity-80;
  }
}
```

### Responsive Utilities
```css
/* Mobile-First Responsive Design */
@layer utilities {
  /* Container Utilities */
  .container-fluid {
    @apply w-full px-4 sm:px-6 lg:px-8 xl:px-12;
  }
  
  .container-narrow {
    @apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .container-wide {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  /* Grid Utilities */
  .grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .grid-auto-fill {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  /* Spacing Utilities */
  .space-y-fluid > * + * {
    @apply mt-4 sm:mt-6 lg:mt-8;
  }
  
  .space-x-fluid > * + * {
    @apply ml-4 sm:ml-6 lg:ml-8;
  }
  
  /* Typography Utilities */
  .text-responsive {
    @apply text-sm sm:text-base lg:text-lg;
  }
  
  .heading-responsive {
    @apply text-2xl sm:text-3xl lg:text-4xl xl:text-5xl;
  }
}
```

---

## 🎭 Interactive Component Examples

### 1. Product Card with Advanced Interactions
```jsx
import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, Compare } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Add cart animation
    const button = e.currentTarget;
    button.classList.add('animate-pulse');
    setTimeout(() => button.classList.remove('animate-pulse'), 300);
    // Add to cart logic
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    // Wishlist animation
  };

  return (
    <div 
      className="customer-product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="customer-product-image">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Actions */}
        <div className={`customer-product-overlay transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={toggleWishlist}
            className={`customer-btn-icon transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/20 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="customer-btn-icon bg-white/20 text-gray-700 hover:bg-blue-500 hover:text-white">
            <Eye className="w-5 h-5" />
          </button>
          
          <button className="customer-btn-icon bg-white/20 text-gray-700 hover:bg-green-500 hover:text-white">
            <Compare className="w-5 h-5" />
          </button>
        </div>
        
        {/* Product Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.isNew && (
            <span className="animate-bounce bg-customer-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="animate-pulse bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Only {product.stock} left!
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="customer-product-info">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 transition-colors ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviewCount})</span>
        </div>
        
        {/* Title */}
        <h3 className="customer-product-title group-hover:text-customer-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="customer-product-price">${product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-500 line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mt-3">
          {product.stock > 10 ? (
            <div className="flex items-center text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              In Stock
            </div>
          ) : product.stock > 0 ? (
            <div className="flex items-center text-amber-600 text-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
              Low Stock ({product.stock} left)
            </div>
          ) : (
            <div className="flex items-center text-red-600 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Out of Stock
            </div>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
            product.stock > 0
              ? 'customer-btn-primary hover:shadow-lg active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};
```

### 2. Advanced Admin Dashboard Stats Card
```jsx
import { TrendingUp, TrendingDown, Package, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminStatsCard = ({ 
  title, 
  value, 
  previousValue, 
  icon: Icon, 
  color = 'admin-primary',
  format = 'number' 
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const percentage = previousValue ? 
    ((value - previousValue) / previousValue * 100) : 0;
  const isPositive = percentage >= 0;
  
  // Animate number counting
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);
  
  const formatValue = (val) => {
    switch (format) {
      case 'currency':
        return `${val.toLocaleString()}`;
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className={`admin-stats-card animate-fade-in-up ${isVisible ? 'animate-in' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`admin-stats-icon bg-${color}/10 text-${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {previousValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            isPositive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(percentage).toFixed(1)}%
          </div>
        )}
      </div>
      
      {/* Value */}
      <div className="mb-2">
        <div className="admin-stats-number">
          {formatValue(animatedValue)}
        </div>
        <div className="admin-stats-label">{title}</div>
      </div>
      
      {/* Progress Bar */}
      {previousValue && (
        <div className="relative">
          <div className="w-full bg-admin-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-${color} to-${color}-light rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: isVisible ? `${Math.min(100, Math.abs(percentage) * 2)}%` : '0%' 
              }}
            />
          </div>
          
          <div className="mt-2 text-xs text-admin-gray-600">
            vs previous period: {formatValue(previousValue)}
          </div>
        </div>
      )}
      
      {/* Quick Action */}
      <div className="mt-4 pt-4 border-t border-admin-gray-200/50">
        <button className="text-admin-primary hover:text-admin-primary-dark text-sm font-medium flex items-center gap-2 group">
          <Eye className="w-4 h-4" />
          <span>View Details</span>
          <div className="w-0 group-hover:w-4 transition-all duration-200">
            <div className="h-px bg-admin-primary"></div>
          </div>
        </button>
      </div>
    </div>
  );
};
```

### 3. Interactive Search Component
```jsx
import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

const SearchComponent = ({ placeholder = "Search products...", onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'iPhone 15', 'MacBook Pro', 'AirPods', 'iPad'
  ]);
  const [trendingSearches] = useState([
    'Black Friday Deals', 'Gaming Laptops', 'Wireless Headphones', 'Smart Watches'
  ]);
  const [loading, setLoading] = useState(false);
  
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      
      // Debounce search
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        // Simulate API call
        setTimeout(() => {
          setResults([
            { id: 1, name: `Product matching "${query}"`, category: 'Electronics', price: 299 },
            { id: 2, name: `Another ${query} item`, category: 'Accessories', price: 199 },
            { id: 3, name: `${query} Pro version`, category: 'Premium', price: 599 },
          ]);
          setLoading(false);
        }, 300);
      }, 300);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      setRecentSearches(prev => [
        searchQuery,
        ...prev.filter(s => s !== searchQuery).slice(0, 3)
      ]);
      onSearch?.(searchQuery);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-200 ${
            isOpen ? 'text-customer-primary' : 'text-gray-400'
          }`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full bg-white/10 backdrop-blur-md border-2 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder:text-gray-600 transition-all duration-300 ${
            isOpen 
              ? 'border-customer-primary shadow-lg shadow-customer-primary/20' 
              : 'border-white/20 hover:border-white/30'
          } focus:outline-none focus:border-customer-primary`}
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center">
              <div className="loading-spinner w-6 h-6 mx-auto mb-2"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          ) : query.length > 0 ? (
            results.length > 0 ? (
              <div className="p-2">
                <div className="text-sm text-gray-500 px-4 py-2 font-medium">
                  Search Results
                </div>
                {results.map(result => (
                  <button
                    key={result.id}
                    onClick={() => handleSearch(result.name)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{result.name}</p>
                      <p className="text-sm text-gray-600">{result.category} • ${result.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600">No results found for "{query}"</p>
              </div>
            )
          ) : (
            <div className="p-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 font-medium">
                    <Clock className="w-4 h-4" />
                    Recent Searches
                  </div>
                  {recentSearches.map(search => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Trending Now
                </div>
                {trendingSearches.map(search => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                  >
                    <TrendingUp className="w-4 h-4 text-customer-primary" />
                    <span className="text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

---

## 📱 Mobile-First Responsive Design

### Mobile Navigation Component
```jsx
import { useState } from 'react';
import { Menu, X, Search, User, ShoppingCart, Heart } from 'lucide-react';

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo */}
          <h1 className="text-xl font-bold text-gradient-primary">ShopFlow</h1>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-customer-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed left-0 top-0 bottom-0 w-80 bg-white transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gradient-primary">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="p-6 space-y-4">
            <a href="/" className="block text-lg font-medium text-gray-900 py-2">
              Home
            </a>
            <a href="/products" className="block text-lg font-medium text-gray-900 py-2">
              Products
            </a>
            <a href="/categories" className="block text-lg font-medium text-gray-900 py-2">
              Categories
            </a>
            <a href="/deals" className="block text-lg font-medium text-gray-900 py-2">
              Deals
            </a>
            <a href="/about" className="block text-lg font-medium text-gray-900 py-2">
              About
            </a>
            
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <button className="flex items-center gap-3 text-gray-700 py-2">
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>
              
              <button className="flex items-center gap-3 text-gray-700 py-2">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transition-opacity duration-300 ${
        isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-customer-primary"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search suggestions could go here */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['iPhone', 'MacBook', 'AirPods', 'iPad'].map(term => (
                  <button
                    key={term}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-customer-primary hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
```

### Touch-Optimized Components
```css
/* Touch-friendly sizing */
@media (max-width: 768px) {
  .touch-target {
    @apply min-h-[44px] min-w-[44px]; /* iOS guidelines */
  }
  
  .touch-button {
    @apply px-6 py-4 text-base; /* Larger touch targets */
  }
  
  .touch-input {
    @apply px-4 py-4 text-base; /* Comfortable input size */
  }
  
  /* Swipe gestures */
  .swipe-container {
    touch-action: pan-y;
    overflow-x: hidden;
  }
  
  .swipe-item {
    transform: translateX(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .swipe-item.swiping {
    transition: none;
  }
  
  /* Pull to refresh */
  .pull-to-refresh {
    transform: translateY(0);
    transition: transform 0.3s ease-out;
  }
  
  .pull-to-refresh.pulling {
    transform: translateY(60px);
  }
}
```

---

## 🎨 Performance Optimization

### CSS Optimization
```css
/* Critical CSS (inline in HTML head) */
.above-fold-critical {
  /* Only essential styles for above-fold content */
  font-display: swap;
  contain: layout style paint;
}

/* Non-critical animations (load after critical CSS) */
@media (prefers-reduced-motion: no-preference) {
  .animation-enhanced {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .parallax-element {
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  
  .hover-animations {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

/* GPU acceleration for smooth animations */
.gpu-accelerated {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000;
}

/* Optimize for mobile performance */
@media (max-width: 768px) {
  .mobile-optimized {
    transform: none !important;
    animation: none !important;
  }
  
  .mobile-optimized:hover {
    transform: none !important;
  }
}
```

### JavaScript Performance Patterns
```javascript
// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }
    );
  }

  observe(elements) {
    elements.forEach(el => this.observer.observe(el));
  }
}

// Lazy loading images
const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Virtual scrolling for large lists
const VirtualizedProductList = ({ products, itemHeight = 300 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    products.length
  );
  
  const visibleItems = products.slice(startIndex, endIndex);
  
  return (
    <div 
      className="virtual-scroll-container"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: products.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((product, index) => (
          <div
            key={product.id}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              width: '100%',
              height: itemHeight
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🎯 Accessibility Implementation

### Screen Reader Support
```jsx
// Accessible Product Card
const AccessibleProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardId = `product-${product.id}`;
  const descId = `product-desc-${product.id}`;

  return (
    <article 
      className="customer-product-card"
      role="article"
      aria-labelledby={cardId}
      aria-describedby={descId}
    >
      <div className="customer-product-image">
        <img 
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        
        {/* Screen reader only stock info */}
        <div className="sr-only">
          Stock status: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
        </div>
      </div>

      <div className="customer-product-info">
        <h3 id={cardId} className="customer-product-title">
          {product.name}
        </h3>

        <div id={descId} className="space-y-2">
          <div 
            role="img" 
            aria-label={`Rated ${product.rating} out of 5 stars`}
            className="flex items-center"
          >
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                aria-hidden="true"
              />
            ))}
            <span className="sr-only">
              {product.rating} stars, {product.reviewCount} reviews
            </span>
          </div>

          <div className="text-2xl font-bold text-customer-primary">
            <span className="sr-only">Price: </span>
            ${product.price}
          </div>
        </div>

        <button
          className="customer-btn-primary w-full mt-4"
          disabled={product.stock === 0}
          aria-describedby={`stock-${product.id}`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>

        <div id={`stock-${product.id}`} className="sr-only">
          {product.stock > 0 
            ? `${product.stock} items available for purchase`
            : 'This item is currently out of stock'
          }
        </div>
      </div>
    </article>
  );
};
```

### Keyboard Navigation
```css
/* Focus management */
.focus-trap {
  outline: none;
}

.focus-trap:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #2563eb;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Keyboard navigation indicators */
.keyboard-user .interactive-element:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.mouse-user .interactive-element:focus {
  outline: none;
}
```

### ARIA Patterns
```jsx
// Accessible Modal Component
const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      modalRef.current?.focus();
      
      // Trap focus
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
```

---

## 🎨 Dark Mode Implementation

### Dark Mode Toggle
```jsx
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference and saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-customer-primary"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 flex items-center justify-center ${
        isDark ? 'translate-x-7' : 'translate-x-0'
      }`}>
        {isDark ? (
          <Moon className="w-4 h-4 text-gray-800" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </div>
    </button>
  );
};
```

### Dark Mode Color Scheme
```css
/* Dark mode variables */
[data-theme="dark"] {
  /* Admin Dark Colors */
  --admin-primary: #3b82f6;
  --admin-primary-light: #60a5fa;
  --admin-primary-dark: #2563eb;
  --admin-secondary: #94a3b8;
  --admin-success: #22c55e;
  --admin-warning: #f59e0b;
  --admin-danger: #ef4444;
  
  /* Gray scale (inverted) */
  --admin-gray-50: #0f172a;
  --admin-gray-100: #1e293b;
  --admin-gray-200: #334155;
  --admin-gray-300: #475569;
  --admin-gray-400: #64748b;
  --admin-gray-500: #94a3b8;
  --admin-gray-600: #cbd5e1;
  --admin-gray-700: #e2e8f0;
  --admin-gray-800: #f1f5f9;
  --admin-gray-900: #f8fafc;
  
  /* Customer Dark Colors */
  --customer-primary: #8b5cf6;
  --customer-secondary: #f472b6;
  --customer-accent: #fbbf24;
  
  /* Glass effects for dark mode */
  --admin-glass: rgba(30, 41, 59, 0.8);
  --admin-glass-border: rgba(59, 130, 246, 0.3);
  --customer-glass: rgba(15, 23, 42, 0.8);
  --customer-glass-border: rgba(139, 92, 246, 0.3);
}

/* Dark mode component adjustments */
[data-theme="dark"] .admin-glass-card {
  @apply bg-admin-gray-800/80 border-admin-gray-700/50;
}

[data-theme="dark"] .customer-glass-card {
  @apply bg-gray-800/80 border-gray-700/50;
}

[data-theme="dark"] .admin-stats-card {
  @apply bg-admin-gray-800/90 border-admin-gray-700/50;
}

[data-theme="dark"] .customer-product-card {
  @apply bg-gray-800 border-gray-700/50;
}

/* Dark mode text adjustments */
[data-theme="dark"] {
  color-scheme: dark;
}

[data-theme="dark"] body {
  @apply bg-admin-gray-50 text-admin-gray-900;
}
```

---

## 🚀 Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [x] Tailwind CSS configuration with custom color palette
- [x] Role-based design system (Admin/Customer themes)
- [x] Typography system with Inter and Poppins fonts
- [x] Base component library with glassmorphism effects
- [x] Responsive breakpoints and utilities
- [x] Dark mode implementation
- [ ] Animation system setup
- [ ] Accessibility foundation (ARIA, focus management)

### Phase 2: Admin Interface (Week 2-3)
- [x] Admin dashboard layout with sidebar navigation
- [x] Stats cards with animated counters
- [x] Data tables with sorting and filtering
- [x] Form components with validation states
- [x] Modal and dialog components
- [ ] Chart integration (Recharts)
- [ ] Advanced filtering and search
- [ ] Bulk actions interface

### Phase 3: Customer Interface (Week 3-4)
- [x] Customer homepage with hero section
- [x] Product catalog with grid layout
- [x] Advanced product cards with interactions
- [x] Shopping cart sidebar
- [x] Mobile navigation and search
- [ ] Product detail page
- [ ] Checkout process
- [ ] User account pages

### Phase 4: Interactive Features (Week 4-5)
- [x] Advanced search with autocomplete
- [x] Wishlist functionality with heart animations
- [x] Shopping cart animations
- [x] Product comparison features
- [x] Touch gestures for mobile
- [ ] Real-time notifications
- [ ] Live chat support
- [ ] Social sharing features

### Phase 5: Performance & Accessibility (Week 5-6)
- [x] Image lazy loading
- [x] Virtual scrolling for large lists
- [x] Animation performance optimization
- [x] Screen reader support
- [x] Keyboard navigation
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] PWA features

### Phase 6: Testing & Deployment (Week 6-7)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit (WAVE, axe)
- [ ] Performance testing (Lighthouse)
- [ ] User acceptance testing
- [ ] Production deployment
- [ ] Monitoring setup

---

## 📊 Design System Documentation

### Component Usage Guidelines

#### Admin Components
```jsx
// Usage: Dashboard stats
<AdminStatsCard 
  title="Total Products"
  value={2547}
  previousValue={2400}
  icon={Package}
  color="admin-primary"
  format="number"
/>

// Usage: Data table
<div className="admin-table">
  <div className="admin-table-header">
    <div className="admin-table-row">
      <div className="admin-table-cell">Product</div>
      <div className="admin-table-cell">Price</div>
    </div>
  </div>
</div>

// Usage: Form elements
<input 
  type="text"
  className="admin-input"
  placeholder="Product name"
/>
```

#### Customer Components
```jsx
// Usage: Product showcase
<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
  onToggleWishlist={handleWishlist}
/>

// Usage: Navigation
<header className="customer-nav">
  <nav>
    <Link className="customer-nav-item">Home</Link>
    <Link className="customer-nav-item active">Products</Link>
  </nav>
</header>

// Usage: Call-to-action
<button className="customer-btn-primary">
  <ShoppingCart className="w-5 h-5 mr-2" />
  Add to Cart
</button>
```

### Design Tokens Reference

#### Colors
- **Admin Primary**: `#1e40af` (Blue-700)
- **Customer Primary**: `#7c3aed` (Violet-600)
- **Success**: `#059669` (Emerald-600)
- **Warning**: `#d97706` (Amber-600)
- **Danger**: `#dc2626` (Red-600)

#### Typography
- **Primary Font**: Inter (UI text, body content)
- **Display Font**: Poppins (headings, brand elements)
- **Font Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px

#### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px

#### Shadows
- **Glass Light**: `0 4px 6px rgba(0,0,0,0.05)`
- **Glass Medium**: `0 10px 15px rgba(0,0,0,0.08)`
- **Glass Heavy**: `0 20px 25px rgba(0,0,0,0.08)`

---

## 🎯 Success Metrics

### Performance Targets
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Accessibility Targets
- **WCAG AA Compliance**: 100%
- **Keyboard Navigation**: Full support
- **Screen Reader Compatible**: All content
- **Color Contrast Ratio**: 4.5:1 minimum
- **Focus Indicators**: Visible on all interactive elements

### User Experience Targets
- **Mobile Optimization**: 100% responsive
- **Cross-browser Support**: 95%+ compatibility
- **Animation Frame Rate**: 60fps sustained
- **Touch Target Size**: 44px minimum
- **Error Recovery**: Clear messaging and actions

---

This comprehensive UI/UX design guide provides a complete foundation for building a modern, role-based inventory management system. The design system combines cutting-edge visual effects with practical usability, ensuring both admin and customer interfaces deliver exceptional user experiences while maintaining high performance and accessibility standards using Tailwind CSS. 
          