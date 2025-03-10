const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String },
});

module.exports = mongoose.model("Cart", CartSchema);
