const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  measurement: {
    type: String,
    enum: ['teaspoon', 'tablespoon', 'cup', 'ounce', 'grams'],
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  directions: [String],
  ingredients: [ingredientSchema]
});

module.exports = mongoose.model('Recipe', schema);
