const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    phone: Number,
    address: String,
    city: String,
    products: [
      {
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: Number
      },
    ],
    status: {type: String, default: "In progress"},
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
