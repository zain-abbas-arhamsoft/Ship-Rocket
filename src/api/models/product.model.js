const mongoose = require("mongoose");

/**
 * Product Schema
 * @private
 */
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    qty: { type: Number },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Product
 */

module.exports = mongoose.model("Product", ProductSchema);
