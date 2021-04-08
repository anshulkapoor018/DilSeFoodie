const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true }
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;