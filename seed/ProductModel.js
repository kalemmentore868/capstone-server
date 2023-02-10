const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  is_digital: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
