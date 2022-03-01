const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user_id: { type: Number, default: 1 },
    products: { type: Array, default: [] },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
