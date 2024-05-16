const mongoose = require('mongoose');

// Define the person scheme
const menuItemScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }, 
    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
    },
      is_drink: {
        type: Boolean,
        default: false,
      },
      ingredients: {
        type: [String],
        default: [],
      },
      num_sales: {
        type: Number,
        default: 0,
    }
})


// Create Person Model
const MenuItem = mongoose.model('Menu',menuItemScheme);
module.exports = MenuItem;