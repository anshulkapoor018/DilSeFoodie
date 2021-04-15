const mongoose = require("mongoose");

// name, website, category, address, city, state, zip, latitude, longitude
const orderSchema = new mongoose.Schema({
  restaurantId: { type: String, required: false },
  userId: { type: String, required: false },
  payment: { type: String, required: true },
  typeOfOrder: { type: String, required: true },
  timeOfOrder: { type: String, required: true },
  orderStatus: { type: String, required: true },
  orderItems: {type: Object, required: false}
}, {
    timestamps: true,
  });

const order = mongoose.model("Order", orderSchema);
module.exports = order;