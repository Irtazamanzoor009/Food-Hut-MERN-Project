const mongoose = require("mongoose");

const { Schema } = mongoose;

// const optionsSchema = new mongoose.Schema({
//     half: String,
//     full: String,
//     regular: String,
//     medium: String,
//     large: String,
//   });

const FoodItemSchema = new Schema({
  CategoryName: { type: String, required: true},
  name: { type: String, required: true},
  img: { type: String, required: true},
  options: {type: Array, required:true},
  description: { type: String, required: true },
});

module.exports = mongoose.model("food_items", FoodItemSchema);
