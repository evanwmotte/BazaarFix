const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: Array,

  category: {
    type: String,
  }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;