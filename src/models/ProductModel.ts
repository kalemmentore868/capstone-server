import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
