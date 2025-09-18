const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },

  // Multiple unit types and prices (Nigerian grocery measurements)
  units: [
    {
      unitType: {
        type: String,
        required: true,
        enum: [
          "Cup",
          "Half Rubber",
          "Black Rubber",
          "Paint Rubber",
          "Big Black Rubber",
          "Bag",
          "Piece",
          "Pack",
          "Bottle",
          "Sachet",
          "Carton",
          "Tin",
          "Tube",
          "Kg",
          "Gram",
          "Liter",
        ],
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
      },
      stockQuantity: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
        default: 0,
      },
      minStockLevel: {
        type: Number,
        default: 5,
        min: [0, "Minimum stock level cannot be negative"],
      },
      costPrice: {
        type: Number,
        min: [0, "Cost price cannot be negative"],
      },
    },
  ],

  // Product images
  images: [
    {
      type: String,
    },
  ],

  // Product tags for search
  tags: [
    {
      type: String,
      trim: true,
    },
  ],

  // Status flags
  isActive: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },

  // Tracking
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search
productSchema.index({ name: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Product", productSchema);
