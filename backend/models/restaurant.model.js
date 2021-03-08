const mongoose = require("mongoose");

// name, website, category, address, city, state, zip, latitude, longitude
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: false },
  category: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  latitude: { type: String, required: false },
  longitude: { type: String, required: false },
  rating: { type: String, required: false}
},{
  timestamps: true,
});

const restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = restaurant;