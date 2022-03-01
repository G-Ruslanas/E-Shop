const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    img: { type: String },
    title: { type: String },
    desc: { type: String },
    tag: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slide", SlideSchema);
