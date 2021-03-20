const mongoose = require("mongoose");

// name, website, category, address, city, state, zip, latitude, longitude
const reviewSchema = new mongoose.Schema({
  restaurantId: { type: String, required: false },
  userId: { type: String, required: false },
  payment: { type: String, required: true },
  typeOfOrder: { type: String, required: true },
  timeOfOrder: { type: String, required: true },
  orderStatus: { type: String, required: true }
}, {
    timestamps: true,
  });

const review = mongoose.model("Order", reviewSchema);
module.exports = review;