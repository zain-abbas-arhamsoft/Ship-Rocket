const mongoose = require("mongoose");

/**
 * Parcel Schema
 * @private
 */
const ParcelSchema = new mongoose.Schema(
  {
    shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Parcel
 */

module.exports = mongoose.model("Parcel", ParcelSchema);
