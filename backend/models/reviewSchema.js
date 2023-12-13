const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    rating: Number,
    opinion: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  },
  { timestamps: true }
);

const Reveiw = mongoose.model("Review", reviewSchema);
module.exports = Reveiw;
