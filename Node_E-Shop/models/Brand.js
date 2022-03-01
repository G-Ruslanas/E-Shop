const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    img: { type: String },
    brand: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
