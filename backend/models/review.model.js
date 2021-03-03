const mongoose = require("mongoose");

// name, website, category, address, city, state, zip, latitude, longitude
const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  userId: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true }
},{
    timestamps: true,
  });

const review = mongoose.model("Review", reviewSchema);
module.exports = review;