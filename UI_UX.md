# SalesHostel - UI/UX Design Guide for Grocery Store System

## 🎯 Design Vision

### Brand Identity
SalesHostel is a modern grocery provision store serving the NDDC hostel community. The design should reflect:
- **Trust & Reliability**: Clean, professional interface that builds customer confidence
- **Local Appeal**: Nigerian market-focused with familiar shopping patterns
- **Accessibility**: Easy navigation for diverse user technical skills
- **Efficiency**: Quick product discovery and streamlined checkout process

### Design Principles
- **Jumia-Inspired**: Familiar e-commerce patterns for Nigerian users
- **Mobile-First**: Optimized for smartphone shopping
- **Role-Specific**: Distinct interfaces for different user types
- **Performance-Focused**: Fast loading for limited internet connectivity

---

## 🎨 Visual Design System

### Color Palette

#### Primary Brand Colors
```css
:root {
  /* Brand Primary - Trust & Reliability */
  --primary-green: #00B517;        /* Nigerian marketplace green */
  --primary-green-light: #E6F7E6;
  --primary-green-dark: #008F13;
  
  /* Secondary - Energy & Freshness */
  --secondary-orange: #FF8C00;     /* Fresh produce orange */
  --secondary-orange-light: #FFF4E6;
  
  /* Accent Colors */
  --accent-blue: #0066CC;          /* Trust and technology */
  --accent-red: #FF4444;           /* Alerts and promotions */
  
  /* Neutral Scale */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Status Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

#### Role-Specific Color Themes
```css
/* Admin Theme - Professional */
.admin-theme {
  --role-primary: #1E40AF;         /* Blue-700 */
  --role-secondary: #64748B;       /* Slate-500 */
  --role-accent: #059669;          /* Emerald-600 */
}

/* Supplier Theme - Growth */
.supplier-theme {
  --role-primary: #059669;         /* Green-600 */
  --role-secondary: #0891B2;       /* Cyan-600 */
  --role-accent: #7C3AED;          /* Violet-600 */
}

/* Staff Theme - Efficiency */
.staff-theme {
  --role-primary: #7C3AED;         /* Violet-600 */
  --role-secondary: #DB2777;       /* Pink-600 */
  --role-accent: #059669;          /* Green-600 */
}

/* Customer Theme - Friendly */
.customer-theme {
  --role-primary: var(--primary-green);
  --role-secondary: var(--secondary-orange);
  --role-accent: var(--accent-blue);
}
```

### Typography
```css
/* Font Stack */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Raleway:wght@300;400;500;600;700;800&display=swap');

:root {
  --font-primary: 'Montserrat', system-ui, sans-serif;    /* UI text and body */
  --font-secondary: 'Poppins', system-ui, sans-serif;     /* Headings and buttons */
  --font-display: 'Raleway', system-ui, sans-serif;       /* Display text and hero titles */
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px - Captions */
  --text-sm: 0.875rem;     /* 14px - Small text */
  --text-base: 1rem;       /* 16px - Body text */
  --text-lg: 1.125rem;     /* 18px - Large text */
  --text-xl: 1.25rem;      /* 20px - Small headings */
  --text-2xl: 1.5rem;      /* 24px - Section headers */
  --text-3xl: 1.875rem;    /* 30px - Page titles */
  --text-4xl: 2.25rem;     /* 36px - Hero titles */
  --text-5xl: 3rem;        /* 48px - Large hero titles */
  --text-6xl: 3.75rem;     /* 60px - Extra large hero titles */
  --text-7xl: 4.5rem;      /* 72px - Massive hero titles */
}
```

---

## 🏠 Public Interface Design (Jumia-like Experience)

### Homepage Layout
```jsx
// Homepage - No Authentication Required
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.png" alt="SalesHostel" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-green">
                SalesHostel
              </span>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for groceries, foods, and more..."
                  className="w-full px-4 py-2 pl-10 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green text-white px-4 py-1 rounded text-sm">
                  Search
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-primary-green">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-secondary-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <Link
                to="/login"
                className="px-4 py-2 border border-primary-green text-primary-green rounded-lg hover:bg-primary-green hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-dark transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-primary-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            <Link to="/categories/staple-foods" className="whitespace-nowrap hover:text-gray-200">
              Staple Foods
            </Link>
            <Link to="/categories/frozen-foods" className="whitespace-nowrap hover:text-gray-200">
              Frozen Foods
            </Link>
            <Link to="/categories/convenience-foods" className="whitespace-nowrap hover:text-gray-200">
              Convenience Foods
            </Link>
            <Link to="/categories/sauces-spices" className="whitespace-nowrap hover:text-gray-200">
              Sauces & Spices
            </Link>
            <Link to="/categories/cooking-oils" className="whitespace-nowrap hover:text-gray-200">
              Cooking Oils
            </Link>
            <Link to="/categories/groceries" className="whitespace-nowrap hover:text-gray-200">
              Groceries
            </Link>
            <Link to="/categories/cleaning-agents" className="whitespace-nowrap hover:text-gray-200">
              Cleaning Agents
            </Link>
            <Link to="/categories/personal-care" className="whitespace-nowrap hover:text-gray-200">
              Personal Care
            </Link>
            <Link to="/categories/stationery" className="whitespace-nowrap hover:text-gray-200">
              Stationery
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold font-secondary mb-4">
                Fresh Groceries Delivered to NDDC Hostel
              </h1>
              <p className="text-xl mb-6 opacity-90">
                Shop from our wide selection of staple foods, groceries, and household items. 
                Fast delivery to your hostel room!
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="bg-secondary-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center"
                >
                  Shop Now
                </Link>
                <Link
                  to="/categories"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-green transition-colors text-center"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/hero-groceries.jpg"
                alt="Fresh Groceries"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-secondary text-center text-gray-900 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-green-light rounded-full flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-green">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {category.productCount} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-secondary text-gray-900">
              Popular Products
            </h2>
            <Link
              to="/products"
              className="text-primary-green font-semibold hover:text-primary-green-dark"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="py-12 bg-primary-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="opacity-90">
                NDDC Hostel, Shop 12<br />
                Left side, through the door labeled SHOP 12
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
              <p className="opacity-90">
                Monday - Sunday<br />
                8:00 AM - 8:00 PM
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="opacity-90">
                WhatsApp: +234 xxx xxx xxxx<br />
                Call: +234 xxx xxx xxxx
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
```

### Product Card Component (Jumia-inspired)
```jsx
const ProductCard = ({ product }) => {
  const [selectedUnit, setSelectedUnit] = useState(product.units[0]);
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.units.some(unit => unit.stockQuantity <= 5) && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Low Stock
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Unit Selection */}
        <div className="mb-3">
          <select
            value={selectedUnit.unitType}
            onChange={(e) => {
              const unit = product.units.find(u => u.unitType === e.target.value);
              setSelectedUnit(unit);
            }}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary-green focus:border-primary-green"
          >
            {product.units.map(unit => (
              <option key={unit.unitType} value={unit.unitType}>
                {unit.unitType} - ₦{unit.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary-green">
            ₦{selectedUnit.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600">
            {selectedUnit.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        {/* Add to Cart Button */}
        <button
          disabled={selectedUnit.stockQuantity === 0}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            selectedUnit.stockQuantity > 0
              ? 'bg-primary-green text-white hover:bg-primary-green-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedUnit.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};
```

### Product Catalog Page
```jsx
const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary-green hover:text-primary-green-dark">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            {/* Categories Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-primary-green focus:ring-primary-green"
                  />
                  <span className="ml-3 text-gray-700">All Categories</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-primary-green focus:ring-primary-green"
                    />
                    <span className="ml-3 text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-green focus:border-primary-green"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
                <button className="w-full bg-primary-green text-white py-2 rounded-lg hover:bg-primary-green-dark transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                <p className="text-gray-600 mt-1">
                  Showing {products.length} products
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-green focus:border-primary-green"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                    <div className="aspect-square bg-gray-300"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-primary-green-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
```

---

## 🛡️ Admin Interface Design

### Admin Dashboard
```jsx
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r admin-theme">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-primary-green">SalesHostel Admin</h1>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center px-4 py-3 text-gray-700 bg-blue-50 text-blue-700 rounded-lg">
            <BarChart3 className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/inventory" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Warehouse className="w-5 h-5 mr-3" />
            Inventory
          </Link>
          <Link to="/admin/orders" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <ShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link to="/admin/users" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Users className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link to="/admin/reports" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FileText className="w-5 h-5 mr-3" />
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="/admin-avatar.jpg"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">847</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">+3 from yesterday</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₦48,392</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15% from yesterday</span>
              </div>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Sales Chart Component</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
              <div className="space-y-4">
                {[
                  { name: 'Staple Foods', value: '₦125,000', percentage: 85 },
                  { name: 'Groceries', value: '₦85,000', percentage: 65 },
                  { name: 'Personal Care', value: '₦45,000', percentage: 45 },
                  { name: 'Cleaning Agents', value: '₦25,000', percentage: 25 },
                ].map(category => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-green h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link
                  to="/admin/orders"
                  className="text-primary-green hover:text-primary-green-dark text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Sample rows */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #ORD-001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      John Doe
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₦15,500
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Aug 30, 2025
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
```

---

## 📱 Mobile Optimization

### Tailwind CSS Configuration for SalesHostel
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': {
          DEFAULT: '#00B517',
          50: '#E6F7E6',
          100: '#CCEFCC',
          200: '#99DF99',
          300: '#66CF66',
          400: '#33BF33',
          500: '#00B517',
          600: '#009113',
          700: '#006D0F',
          800: '#00490A',
          900: '#002505',
          950: '#001203',
        },
        'secondary-orange': {
          DEFAULT: '#FF8C00',
          50: '#FFF4E6',
          100: '#FFE9CC',
          200: '#FFD399',
          300: '#FFBD66',
          400: '#FFA733',
          500: '#FF8C00',
          600: '#CC7000',
          700: '#995400',
          800: '#663800',
          900: '#331C00',
        },
        'accent-blue': {
          DEFAULT: '#0066CC',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B1FF',
          400: '#3397FF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        }
      },
      fontFamily: {
        'primary': ['Montserrat', 'system-ui', 'sans-serif'],
        'secondary': ['Poppins', 'system-ui', 'sans-serif'],
        'display': ['Raleway', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
```

### Mobile Navigation Component
```jsx
const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold text-primary-green">SalesHostel</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-gray-600 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-secondary-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed left-0 top-0 bottom-0 w-80 bg-white transform transition-transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-green">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <nav className="p-4 space-y-4">
            <Link to="/" className="block py-2 text-gray-900 font-medium">Home</Link>
            <Link to="/products" className="block py-2 text-gray-900 font-medium">All Products</Link>
            <Link to="/categories/staple-foods" className="block py-2 text-gray-700">Staple Foods</Link>
            <Link to="/categories/frozen-foods" className="block py-2 text-gray-700">Frozen Foods</Link>
            <Link to="/categories/convenience-foods" className="block py-2 text-gray-700">Convenience Foods</Link>
            <Link to="/categories/groceries" className="block py-2 text-gray-700">Groceries</Link>
            <Link to="/categories/personal-care" className="block py-2 text-gray-700">Personal Care</Link>
            
            <div className="pt-4 border-t">
              <Link to="/login" className="block py-2 text-primary-green font-medium">Login</Link>
              <Link to="/register" className="block py-2 text-primary-green font-medium">Register</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transition-opacity ${
        isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['Rice', 'Beans', 'Noodles', 'Palm Oil', 'Detergent'].map(term => (
                <button
                  key={term}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-green hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
```

---

## 🏪 Supplier Interface Design

### Supplier Dashboard
```jsx
const SupplierDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supplier Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your product supplies and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 supplier-theme">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Supplies</p>
                <p className="text-3xl font-bold text-gray-900">127</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products Managed</p>
                <p className="text-3xl font-bold text-gray-900">45</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month Value</p>
                <p className="text-3xl font-bold text-gray-900">₦125K</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Supply Entry</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rice"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green">
                    <option>Black Rubber</option>
                    <option>Half Rubber</option>
                    <option>Cup</option>
                    <option>Paint Rubber</option>
                    <option>Big Black Rubber</option>
                    <option>Bag</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Unit (₦)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 3650"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-primary-green-dark transition-colors"
              >
                Add Supply
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Supplies</h3>
            <div className="space-y-4">
              {[
                { product: 'Rice - Black Rubber', quantity: 25, date: 'Aug 30, 2025', status: 'Received' },
                { product: 'Beans - Half Rubber', quantity: 40, date: 'Aug 29, 2025', status: 'Pending' },
                { product: 'Garri - Paint Rubber', quantity: 15, date: 'Aug 28, 2025', status: 'Received' },
              ].map((supply, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{supply.product}</p>
                    <p className="text-sm text-gray-600">Qty: {supply.quantity} • {supply.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    supply.status === 'Received' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {supply.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 🛒 Shopping Cart & Checkout Design

### Shopping Cart Component
```jsx
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 hover:text-primary-green"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black transition-opacity ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`} onClick={() => setIsOpen(false)} />
        
        <div className={`absolute right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
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
                  onClick={() => setIsOpen(false)}
                  className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-primary-green-dark"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.unitType}`} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.unitType}</p>
                      <p className="text-sm font-medium text-primary-green">₦{item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.unitType, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.unitType, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id, item.unitType)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-primary-green">
                  ₦{calculateTotal().toLocaleString()}
                </span>
              </div>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to checkout
                }}
                className="w-full bg-primary-green text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-green-dark transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
```

### Checkout Page
```jsx
const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    whatsappNumber: '',
    callNumber: '',
    email: '',
    deliveryAddress: '',
    landmark: '',
    paymentMethod: 'paystack'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Call Number
                </label>
                <input
                  type="tel"
                  value={formData.callNumber}
                  onChange={(e) => setFormData({...formData, callNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address (Room Number/Block)
                </label>
                <textarea
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  placeholder="e.g., Room 205, Block A, NDDC Hostel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                  placeholder="e.g., Near the staircase, opposite the notice board"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paystack"
                      checked={formData.paymentMethod === 'paystack'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="text-primary-green focus:ring-primary-green"
                    />
                    <span className="ml-3 text-gray-700">Pay with Card (Paystack)</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="text-primary-green focus:ring-primary-green"
                    />
                    <span className="ml-3 text-gray-700">Bank Transfer</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="delivery"
                      checked={formData.paymentMethod === 'delivery'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="text-primary-green focus:ring-primary-green"
                    />
                    <span className="ml-3 text-gray-700">Pay on Delivery</span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.unitType}`} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.unitType} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₦500</span>
              </div>
              
              <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-primary-green">₦{(subtotal + 500).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-primary-green text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-green-dark transition-colors"
            >
              Place Order
            </button>

            {formData.paymentMethod === 'transfer' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Bank Transfer Details</h4>
                <p className="text-sm text-blue-800">
                  <strong>Account Name:</strong> Saleshostel/Ehiozibue Samuel<br />
                  <strong>Account Number:</strong> 7039921258<br />
                  <strong>Bank:</strong> PalmPay
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 📊 Performance & Accessibility

### Loading States
```jsx
// Skeleton Loading for Product Cards
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm animate-pulse">
    <div className="aspect-square bg-gray-300"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// Loading Component
const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-green ${sizeClasses[size]}`} />
  );
};
```

### Error Handling
```jsx
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-primary-green-dark"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return children;
};
```

This comprehensive UI/UX design guide provides a complete foundation for the SalesHostel grocery store system, featuring:

1. **Jumia-inspired public browsing** without authentication
2. **Role-specific interfaces** for Admin, Supplier, Staff, and Customers
3. **Mobile-first responsive design** optimized for Nigerian users
4. **Complete shopping experience** from browsing to checkout
5. **Nigerian payment integration** with Paystack and bank transfer
6. **Comprehensive product management** with multiple unit types
7. **Performance optimization** with loading states and error handling
8. **Accessibility features** following WCAG guidelines

The design maintains consistency across all interfaces while providing distinct experiences for each user role, ensuring efficient operations for the SalesHostel business model.