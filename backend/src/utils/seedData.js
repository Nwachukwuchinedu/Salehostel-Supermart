const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

const categories = [
  {
    name: 'Staple Foods',
    slug: 'staple-foods',
    description: 'Essential food items like rice, beans, garri, and semovita',
    image: '/images/categories/staple-foods.jpg'
  },
  {
    name: 'Frozen Foods',
    slug: 'frozen-foods',
    description: 'Frozen chicken, fish, and other frozen food items',
    image: '/images/categories/frozen-foods.jpg'
  },
  {
    name: 'Convenience Foods',
    slug: 'convenience-foods',
    description: 'Quick meal solutions like noodles, spaghetti, and pasta',
    image: '/images/categories/convenience-foods.jpg'
  },
  {
    name: 'Sauces & Spices',
    slug: 'sauces-spices',
    description: 'Cooking ingredients like tomato paste, maggi, curry, and thyme',
    image: '/images/categories/sauces-spices.jpg'
  },
  {
    name: 'Cooking Oils',
    slug: 'cooking-oils',
    description: 'Various cooking oils including palm oil, groundnut oil, and power oil',
    image: '/images/categories/cooking-oils.jpg'
  },
  {
    name: 'Groceries',
    slug: 'groceries',
    description: 'Daily grocery items like milk, sugar, flour, and cereals',
    image: '/images/categories/groceries.jpg'
  },
  {
    name: 'Cleaning Agents',
    slug: 'cleaning-agents',
    description: 'Household cleaning products like detergents, soaps, and liquid soap',
    image: '/images/categories/cleaning-agents.jpg'
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Personal hygiene products like toothpaste, sanitary pads, and body spray',
    image: '/images/categories/personal-care.jpg'
  },
  {
    name: 'Stationery',
    slug: 'stationery',
    description: 'Office and school supplies like notebooks, biros, and writing materials',
    image: '/images/categories/stationery.jpg'
  }
];

// Function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const products = [
  // Staple Foods
  {
    name: 'Rice',
    description: 'Premium quality rice for daily consumption',
    category: 'staple-foods',
    units: [
      { unitType: 'Cup', price: 50, stockQuantity: 100, minStockLevel: 10, costPrice: 40 },
      { unitType: 'Half Rubber', price: 1800, stockQuantity: 25, minStockLevel: 5, costPrice: 1500 },
      { unitType: 'Black Rubber', price: 3500, stockQuantity: 15, minStockLevel: 3, costPrice: 3000 },
      { unitType: 'Paint Rubber', price: 7000, stockQuantity: 8, minStockLevel: 2, costPrice: 6000 }
    ],
    tags: ['rice', 'staple', 'food', 'grain'],
    featured: true
  },
  {
    name: 'Beans',
    description: 'Fresh beans for protein-rich meals',
    category: 'staple-foods',
    units: [
      { unitType: 'Cup', price: 80, stockQuantity: 80, minStockLevel: 10, costPrice: 60 },
      { unitType: 'Half Rubber', price: 2500, stockQuantity: 20, minStockLevel: 5, costPrice: 2000 },
      { unitType: 'Black Rubber', price: 4800, stockQuantity: 12, minStockLevel: 3, costPrice: 4000 }
    ],
    tags: ['beans', 'protein', 'staple', 'food'],
    featured: true
  },
  {
    name: 'Garri',
    description: 'Fine garri for making eba and other dishes',
    category: 'staple-foods',
    units: [
      { unitType: 'Cup', price: 30, stockQuantity: 150, minStockLevel: 15, costPrice: 25 },
      { unitType: 'Half Rubber', price: 1200, stockQuantity: 30, minStockLevel: 5, costPrice: 1000 },
      { unitType: 'Black Rubber', price: 2200, stockQuantity: 18, minStockLevel: 3, costPrice: 1800 }
    ],
    tags: ['garri', 'cassava', 'staple', 'food'],
    featured: true
  },
  {
    name: 'Semovita',
    description: 'Quality semovita for making swallow',
    category: 'staple-foods',
    units: [
      { unitType: 'Cup', price: 40, stockQuantity: 120, minStockLevel: 12, costPrice: 30 },
      { unitType: 'Half Rubber', price: 1500, stockQuantity: 25, minStockLevel: 5, costPrice: 1200 },
      { unitType: 'Black Rubber', price: 2800, stockQuantity: 15, minStockLevel: 3, costPrice: 2200 }
    ],
    tags: ['semovita', 'swallow', 'staple', 'food'],
    featured: false
  },

  // Frozen Foods
  {
    name: 'Chicken Wings',
    description: 'Fresh frozen chicken wings',
    category: 'frozen-foods',
    units: [
      { unitType: 'Kg', price: 1200, stockQuantity: 20, minStockLevel: 5, costPrice: 1000 },
      { unitType: 'Pack', price: 600, stockQuantity: 40, minStockLevel: 10, costPrice: 500 }
    ],
    tags: ['chicken', 'wings', 'frozen', 'meat'],
    featured: true
  },
  {
    name: 'Chicken Lap',
    description: 'Fresh frozen chicken lap',
    category: 'frozen-foods',
    units: [
      { unitType: 'Kg', price: 1000, stockQuantity: 15, minStockLevel: 5, costPrice: 800 },
      { unitType: 'Pack', price: 500, stockQuantity: 30, minStockLevel: 8, costPrice: 400 }
    ],
    tags: ['chicken', 'lap', 'frozen', 'meat'],
    featured: false
  },

  // Convenience Foods
  {
    name: 'Spaghetti',
    description: 'Quality spaghetti for quick meals',
    category: 'convenience-foods',
    units: [
      { unitType: 'Pack', price: 200, stockQuantity: 100, minStockLevel: 20, costPrice: 150 },
      { unitType: 'Carton', price: 2400, stockQuantity: 10, minStockLevel: 2, costPrice: 2000 }
    ],
    tags: ['spaghetti', 'pasta', 'convenience', 'food'],
    featured: true
  },
  {
    name: 'Noodles',
    description: 'Instant noodles for quick meals',
    category: 'convenience-foods',
    units: [
      { unitType: 'Pack', price: 150, stockQuantity: 200, minStockLevel: 30, costPrice: 120 },
      { unitType: 'Carton', price: 1800, stockQuantity: 15, minStockLevel: 3, costPrice: 1500 }
    ],
    tags: ['noodles', 'instant', 'convenience', 'food'],
    featured: true
  },

  // Sauces & Spices
  {
    name: 'Tomato Paste',
    description: 'Rich tomato paste for cooking',
    category: 'sauces-spices',
    units: [
      { unitType: 'Sachet', price: 50, stockQuantity: 300, minStockLevel: 50, costPrice: 40 },
      { unitType: 'Tin', price: 300, stockQuantity: 50, minStockLevel: 10, costPrice: 250 }
    ],
    tags: ['tomato', 'paste', 'sauce', 'cooking'],
    featured: true
  },
  {
    name: 'Maggi',
    description: 'Seasoning cubes for enhanced flavor',
    category: 'sauces-spices',
    units: [
      { unitType: 'Sachet', price: 20, stockQuantity: 500, minStockLevel: 100, costPrice: 15 },
      { unitType: 'Pack', price: 200, stockQuantity: 100, minStockLevel: 20, costPrice: 150 }
    ],
    tags: ['maggi', 'seasoning', 'flavor', 'cooking'],
    featured: true
  },

  // Cooking Oils
  {
    name: 'Palm Oil',
    description: 'Pure palm oil for cooking',
    category: 'cooking-oils',
    units: [
      { unitType: 'Bottle', price: 800, stockQuantity: 30, minStockLevel: 5, costPrice: 600 },
      { unitType: 'Liter', price: 400, stockQuantity: 60, minStockLevel: 10, costPrice: 300 }
    ],
    tags: ['palm', 'oil', 'cooking', 'vegetable'],
    featured: true
  },
  {
    name: 'Groundnut Oil',
    description: 'Refined groundnut oil',
    category: 'cooking-oils',
    units: [
      { unitType: 'Bottle', price: 1200, stockQuantity: 25, minStockLevel: 5, costPrice: 1000 },
      { unitType: 'Liter', price: 600, stockQuantity: 50, minStockLevel: 10, costPrice: 500 }
    ],
    tags: ['groundnut', 'oil', 'cooking', 'vegetable'],
    featured: false
  },

  // Groceries
  {
    name: 'Milk',
    description: 'Fresh milk for daily consumption',
    category: 'groceries',
    units: [
      { unitType: 'Sachet', price: 30, stockQuantity: 200, minStockLevel: 30, costPrice: 25 },
      { unitType: 'Tin', price: 400, stockQuantity: 40, minStockLevel: 8, costPrice: 350 }
    ],
    tags: ['milk', 'dairy', 'fresh', 'nutrition'],
    featured: true
  },
  {
    name: 'Sugar',
    description: 'Granulated sugar for sweetening',
    category: 'groceries',
    units: [
      { unitType: 'Cup', price: 40, stockQuantity: 150, minStockLevel: 20, costPrice: 30 },
      { unitType: 'Kg', price: 600, stockQuantity: 25, minStockLevel: 5, costPrice: 500 }
    ],
    tags: ['sugar', 'sweetener', 'granulated', 'cooking'],
    featured: true
  },

  // Cleaning Agents
  {
    name: 'Detergent',
    description: 'Laundry detergent for clothes washing',
    category: 'cleaning-agents',
    units: [
      { unitType: 'Sachet', price: 100, stockQuantity: 100, minStockLevel: 20, costPrice: 80 },
      { unitType: 'Bottle', price: 800, stockQuantity: 20, minStockLevel: 5, costPrice: 600 }
    ],
    tags: ['detergent', 'laundry', 'cleaning', 'washing'],
    featured: true
  },
  {
    name: 'Liquid Soap',
    description: 'Hand and body liquid soap',
    category: 'cleaning-agents',
    units: [
      { unitType: 'Bottle', price: 300, stockQuantity: 50, minStockLevel: 10, costPrice: 250 },
      { unitType: 'Liter', price: 200, stockQuantity: 30, minStockLevel: 5, costPrice: 150 }
    ],
    tags: ['soap', 'liquid', 'hand', 'body', 'cleaning'],
    featured: false
  },

  // Personal Care
  {
    name: 'Toothpaste',
    description: 'Mint toothpaste for oral hygiene',
    category: 'personal-care',
    units: [
      { unitType: 'Tube', price: 400, stockQuantity: 40, minStockLevel: 8, costPrice: 300 },
      { unitType: 'Pack', price: 1200, stockQuantity: 15, minStockLevel: 3, costPrice: 1000 }
    ],
    tags: ['toothpaste', 'oral', 'hygiene', 'dental'],
    featured: true
  },
  {
    name: 'Sanitary Pads',
    description: 'Comfortable sanitary pads for women',
    category: 'personal-care',
    units: [
      { unitType: 'Pack', price: 500, stockQuantity: 30, minStockLevel: 5, costPrice: 400 },
      { unitType: 'Carton', price: 3000, stockQuantity: 8, minStockLevel: 2, costPrice: 2500 }
    ],
    tags: ['sanitary', 'pads', 'women', 'hygiene'],
    featured: false
  },

  // Stationery
  {
    name: 'Notebooks',
    description: 'Quality notebooks for writing',
    category: 'stationery',
    units: [
      { unitType: 'Piece', price: 200, stockQuantity: 50, minStockLevel: 10, costPrice: 150 },
      { unitType: 'Pack', price: 1000, stockQuantity: 20, minStockLevel: 5, costPrice: 800 }
    ],
    tags: ['notebook', 'writing', 'paper', 'stationery'],
    featured: true
  },
  {
    name: 'Biros',
    description: 'Blue ink ballpoint pens',
    category: 'stationery',
    units: [
      { unitType: 'Piece', price: 50, stockQuantity: 100, minStockLevel: 20, costPrice: 30 },
      { unitType: 'Pack', price: 400, stockQuantity: 25, minStockLevel: 5, costPrice: 300 }
    ],
    tags: ['biro', 'pen', 'writing', 'stationery'],
    featured: false
  }
];

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@salehostel.com',
    password: 'admin123',
    whatsappNumber: '+2348012345678',
    callNumber: '+2348012345678',
    role: 'admin'
  },
  {
    firstName: 'John',
    lastName: 'Supplier',
    email: 'supplier@salehostel.com',
    password: 'supplier123',
    whatsappNumber: '+2348023456789',
    callNumber: '+2348023456789',
    role: 'supplier'
  },
  {
    firstName: 'Jane',
    lastName: 'Staff',
    email: 'staff@salehostel.com',
    password: 'staff123',
    whatsappNumber: '+2348034567890',
    callNumber: '+2348034567890',
    role: 'staff'
  },
  {
    firstName: 'Customer',
    lastName: 'Test',
    email: 'customer@salehostel.com',
    password: 'customer123',
    whatsappNumber: '+2348045678901',
    callNumber: '+2348045678901',
    role: 'customer'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data and drop indexes
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Drop any existing indexes on products collection
    try {
      await mongoose.connection.db.collection('products').dropIndexes();
    } catch (error) {
      console.log('No indexes to drop or error dropping indexes:', error.message);
    }

    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create category map for products
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Update products with category IDs
    const productsWithCategories = products.map(product => ({
      ...product,
      category: categoryMap[product.category]
    }));

    // Create products
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`Created ${createdProducts.length} products`);

    // Hash passwords for users and create them
    const usersWithHashedPasswords = [];
    for (const user of users) {
      const hashedPassword = await hashPassword(user.password);
      usersWithHashedPasswords.push({
        ...user,
        password: hashedPassword
      });
    }

    // Create users with hashed passwords
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`Created ${createdUsers.length} users`);

    console.log('Database seeding completed successfully!');

    return {
      categories: createdCategories,
      products: createdProducts,
      users: createdUsers
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = {
  categories,
  products,
  users,
  seedDatabase
};