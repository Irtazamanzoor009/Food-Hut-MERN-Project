// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  CategoryName: { type: String, required: true},
  options: {type:Array, required: true  }
});

module.exports = mongoose.model("food_categories", categorySchema);
