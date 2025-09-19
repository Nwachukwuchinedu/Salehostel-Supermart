import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Phone,
  Package,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const categories = [
    { name: "Staple Foods", slug: "staple-foods", icon: "🌾", description: "Rice, Garri, Beans, Semovita, Melon" },
    { name: "Frozen Foods", slug: "frozen-foods", icon: "❄️", description: "Chicken wings, Chicken lap" },
    { name: "Convenience Foods", slug: "convenience-foods", icon: "🍜", description: "Spaghetti, Noodles, Pasta" },
    { name: "Sauces & Spices", slug: "sauces-spices", icon: "🌶️", description: "Tomato paste, Maggi, Curry, Thyme" },
    { name: "Cooking Oils", slug: "cooking-oils", icon: "🫒", description: "Palm oil, Groundnut oil, Power oil" },
    { name: "Groceries", slug: "groceries", icon: "🥛", description: "Milk, Milo, Cornflakes, Sugar, Flour" },
    { name: "Cleaning Agents", slug: "cleaning-agents", icon: "🧽", description: "Detergents, Soaps, Liquid soap" },
    { name: "Personal Care", slug: "personal-care", icon: "🧴", description: "Toothpaste, Sanitary pads, Body spray" },
    { name: "Stationery", slug: "stationery", icon: "📝", description: "Notebooks, Biros" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-green via-primary-green-dark to-primary-green text-white py-16 lg:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full float-animation"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full float-animation" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up">
              Fresh Groceries
            </h1>
            <h2 className="text-3xl lg:text-4xl font-secondary font-semibold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Delivered to NDDC Hostel
            </h2>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Shop from our wide selection of staple foods, groceries, and household items.
              Fast delivery to your hostel room!
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 animate-fade-in-up">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Explore our wide range of products organized by category for easy shopping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-green-light to-primary-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">{category.icon}</span>
                    </div>
                    <h3 className="text-2xl font-secondary font-bold text-gray-900 mb-3 group-hover:text-primary-green transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center text-primary-green font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span>Explore Products</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 animate-fade-in-up">
              Why Choose SalesHostel?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              We provide the best shopping experience for NDDC hostel residents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-green-light to-primary-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-10 h-10 text-primary-green" />
              </div>
              <h3 className="text-xl font-secondary font-bold text-gray-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quick delivery to your hostel room within 30 minutes
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-green-light to-primary-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-primary-green" />
              </div>
              <h3 className="text-xl font-secondary font-bold text-gray-900 mb-3">
                Quality Products
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fresh and high-quality groceries and household items
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-green-light to-primary-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-10 h-10 text-primary-green" />
              </div>
              <h3 className="text-xl font-secondary font-bold text-gray-900 mb-3">
                Wide Selection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Everything you need from staple foods to personal care
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-green-light to-primary-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-10 h-10 text-primary-green" />
              </div>
              <h3 className="text-xl font-secondary font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Always here to help with your orders and questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="py-16 bg-gradient-to-br from-primary-green via-primary-green-dark to-primary-green text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-24 h-24 bg-white rounded-full float-animation"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-white rounded-full float-animation" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4 animate-fade-in-up">
              Visit Our Store
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Located conveniently in NDDC Hostel for easy access
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-secondary font-bold mb-4">Our Location</h3>
              <p className="opacity-90 leading-relaxed">
                NDDC Hostel, Shop 12<br />
                Left side, through the door labeled SHOP 12
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-secondary font-bold mb-4">Opening Hours</h3>
              <p className="opacity-90 leading-relaxed">
                Monday - Sunday<br />
                8:00 AM - 8:00 PM
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-secondary font-bold mb-4">Contact Us</h3>
              <p className="opacity-90 leading-relaxed">
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

export default Home;