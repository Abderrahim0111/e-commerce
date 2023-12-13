const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    detail: String,
    category: String,
    brand: String,
    price: Number,
    quantity: Number,
    freeShipping: Boolean,
    shippingPrice: Number,
    images: Array,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
