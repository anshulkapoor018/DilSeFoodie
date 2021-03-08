const mongoose = require("mongoose");

// name, website, category, address, city, state, zip, latitude, longitude
const reviewSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  userId: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: String, required: true }
},{
    timestamps: true,
  });

const review = mongoose.model("Review", reviewSchema);
module.exports = review;