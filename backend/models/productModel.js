const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please select category for this product"],
  },
  subcategory: {
    type: String,
    required: [true, "Please select subcategory for this product"],
  },
  sales: {
    type: Number,
    required: [true, "Please Enter Product Sales"],
    maxLength: [5, "Sales cannot exceed 5 characters"],
  },
  brand: {
    type: String,
    required: [true, "Please Enter product brand name"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
});

module.exports = mongoose.model("Product", productSchema);
