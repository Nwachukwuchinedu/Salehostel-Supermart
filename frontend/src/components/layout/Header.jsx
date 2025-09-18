import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import useCartStore from "../../stores/cartStore";
import useAuthStore from "../../stores/authStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { items: cartItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [
    { name: "Staple Foods", slug: "staple-foods", icon: "🌾" },
    { name: "Frozen Foods", slug: "frozen-foods", icon: "❄️" },
    { name: "Convenience Foods", slug: "convenience-foods", icon: "🍜" },
    { name: "Sauces & Spices", slug: "sauces-spices", icon: "🌶️" },
    { name: "Cooking Oils", slug: "cooking-oils", icon: "🫒" },
    { name: "Groceries", slug: "groceries", icon: "🥛" },
    { name: "Cleaning Agents", slug: "cleaning-agents", icon: "🧽" },
    { name: "Personal Care", slug: "personal-care", icon: "🧴" },
    { name: "Stationery", slug: "stationery", icon: "📝" },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">SH</span>
                </div>
                <span className="text-xl font-bold text-primary-green font-display">
                  SalesHostel
                </span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for groceries, foods, and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent font-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green text-white px-4 py-1 rounded text-sm hover:bg-primary-green-dark transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-gray-700 hover:text-primary-green"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-primary-green"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-green">
                    <User className="w-6 h-6" />
                    <span className="hidden sm:block text-sm font-medium font-primary">
                      {user?.firstName || "Account"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/account/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-primary"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-primary"
                    >
                      Order History
                    </Link>
                    <Link
                      to="/account/addresses"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-primary"
                    >
                      Addresses
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-primary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-primary-green text-primary-green rounded-lg hover:bg-primary-green hover:text-white transition-colors font-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-dark transition-colors font-primary"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-gray-700 hover:text-primary-green"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="bg-primary-green text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-3">
              <div className="relative group" ref={dropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center space-x-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-medium font-secondary"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Category Dropdown */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${isCategoryDropdownOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
                  }`}>
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/categories/${category.slug}`}
                          onClick={() => setIsCategoryDropdownOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-green-light transition-all duration-200 group"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <span className="text-gray-900 font-medium group-hover:text-primary-green transition-colors font-primary">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-80 bg-white transform transition-transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-green font-display">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-gray-900 font-medium font-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-900 font-medium font-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider font-primary">
                Categories
              </h3>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/categories/${category.slug}`}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-primary-green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-primary">{category.name}</span>
                </Link>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="pt-4 border-t space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-primary-green font-medium font-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-primary-green font-medium font-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-opacity md:hidden ${isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green font-primary"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 font-primary">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Rice", "Beans", "Noodles", "Palm Oil", "Detergent"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/search?q=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-green hover:text-white transition-colors font-primary"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
