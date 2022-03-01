const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    img: { type: String },
    title: { type: String },
    desc: { type: String },
    price: { type: Number },
    colors: { type: Array },
    size: { type: Array },
    brand: { type: String },
    clicks: { type: Number, default: 0 },
    sale: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
