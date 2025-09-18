const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Supplier is required']
    },
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    quantity: {
        type: String,
        required: [true, 'Quantity type is required'],
        enum: [
            'Cup',
            'Half Rubber',
            'Black Rubber',
            'Paint Rubber',
            'Big Black Rubber',
            'Bag',
            'Piece',
            'Pack',
            'Bottle',
            'Sachet',
            'Carton',
            'Tin',
            'Tube',
            'Kg',
            'Gram',
            'Liter'
        ]
    },
    numberOfQuantity: {
        type: Number,
        required: [true, 'Number of quantity is required'],
        min: [1, 'Number of quantity must be at least 1']
    },
    pricePerUnit: {
        type: Number,
        required: [true, 'Price per unit is required'],
        min: [0, 'Price per unit cannot be negative']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative']
    },
    supplyDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'received', 'cancelled'],
        default: 'pending'
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receivedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt field before saving
supplySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Calculate total price before saving
supplySchema.pre('save', function (next) {
    if (this.numberOfQuantity && this.pricePerUnit) {
        this.totalPrice = this.numberOfQuantity * this.pricePerUnit;
    }
    next();
});

module.exports = mongoose.model('Supply', supplySchema);
