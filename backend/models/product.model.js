const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    catagory: String,
    price: Number,
    rating: Number,
    quantity: Number,
    image: String,
    description: String,
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
