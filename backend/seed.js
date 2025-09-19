const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { seedDatabase } = require("./src/utils/seedData");

// Load environment variables
dotenv.config();

const runSeed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    // Run seed function
    await seedDatabase();

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();