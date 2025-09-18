# SalesHostel - Grocery Store Management System

A comprehensive grocery store inventory management system with e-commerce platform for SalesHostel at NDDC Hostel.

## 🚀 Phase 1: Foundation - COMPLETED

### Features Implemented

- ✅ SalesHostel branding and Nigerian market focus
- ✅ Public product browsing (Jumia-like experience)
- ✅ User authentication system
- ✅ Role-based access control
- ✅ Responsive design with Tailwind CSS
- ✅ Basic API structure
- ✅ Database models for Nigerian grocery business

## 🛠️ Tech Stack

### Frontend

- React.js with Vite
- Tailwind CSS
- Zustand (State Management)
- React Router
- Lucide React (Icons)

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io (Real-time features)

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Update with your values
npm run seed          # Seed sample data
npm run dev          # Start development server
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev          # Start development server
```

## 🌐 API Endpoints

### Public Endpoints (No Auth Required)

- `GET /api/public/categories` - Get all categories
- `GET /api/public/products` - Get all products with filters
- `GET /api/public/products/:id` - Get single product

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Protected Endpoints

- `GET /api/products` - Get products (authenticated)
- `GET /api/categories` - Get categories (authenticated)
- `GET /api/cart` - Get user cart
- `GET /api/orders` - Get user orders

## 🎯 User Roles

1. **Customer** (Default)

   - Browse products without login
   - Register and manage account
   - Place orders and track history

2. **Staff**

   - Assist with inventory management
   - Process customer orders

3. **Supplier**

   - Manage product supply
   - Update stock levels
   - View supply history

4. **Admin**
   - Full system access
   - User management
   - Reports and analytics

## 🏪 Business Model

SalesHostel serves NDDC Hostel with:

- **Staple Foods**: Rice, Garri, Beans, Semovita
- **Frozen Foods**: Chicken wings, Chicken lap
- **Convenience Foods**: Noodles, Pasta, Spaghetti
- **Household Items**: Cleaning agents, Personal care
- **Nigerian Unit Types**: Cup, Half Rubber, Black Rubber, Paint Rubber

## 🎨 Design System

### Colors

- Primary Green: #00B517
- Secondary Orange: #FF8C00
- Accent Blue: #0066CC

### Nigerian Features

- Currency: ₦ (Naira)
- Phone validation for Nigerian numbers
- Local unit measurements
- Delivery to hostel rooms

## 📱 Current Pages

### Frontend Routes

- `/` - Homepage with hero and features
- `/products` - Product catalog
- `/login` - User login
- `/register` - User registration
- `/categories/:slug` - Category pages (placeholder)
- `/product/:id` - Product details (placeholder)

## 🔄 Development Status

### ✅ Completed (Phase 1)

- Project structure and setup
- Authentication system
- Public product browsing
- Basic UI components
- Database models
- API foundation

### 🚧 Next Phase (Phase 2)

- Complete product management
- Shopping cart functionality
- Order processing
- Payment integration (PayStack)
- Inventory management
- Real-time features

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd saleshostel-supermart
```

2. **Start MongoDB** (if using local)

```bash
mongod
```

3. **Run Backend**

```bash
cd backend
npm install
npm run seed
npm run dev
```

4. **Run Frontend** (in new terminal)

```bash
cd frontend
npm install
npm run dev
```

5. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📞 Store Information

- **Location**: NDDC Hostel, Shop 12
- **Hours**: Monday - Sunday, 8:00 AM - 8:00 PM
- **Contact**: WhatsApp & Call numbers (to be updated)

## 🤝 Contributing

This is a private project for SalesHostel. For development questions or issues, contact the development team.

## 📄 License

Private - All rights reserved by SalesHostel
