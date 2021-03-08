const mongoose = require("mongoose");

// name, website, category, address, city, state, zip, latitude, longitude
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  rating: { type: String, required: true}
},{
  timestamps: true,
});

const restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = restaurant;