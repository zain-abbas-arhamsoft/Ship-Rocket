const mongoose = require("mongoose");
/**
 * Shipment Schema
 * @private
 */
const ShipmentSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true,
    maxlength: 20,
  },
  payment_type: {
    type: String,
    required: true,
    enum: ["cod", "prepaid", "reverse"],
  },
  package_weight: {
    type: Number,
    default: 0,
  },
  package_length: Number,
  package_breadth: Number,
  package_height: Number,
  request_auto_pickup: String,
  shipping_charges: Number,
  cod_charges: Number,
  discount: Number,
  order_amount: {
    type: Number,
    required: true,
  },
  consignee: {
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    company_name: String,
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    address_2: String,
    city: {
      type: String,
      required: true,
      maxlength: 40,
    },
    state: {
      type: String,
      required: true,
      maxlength: 40,
    },
    pincode: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
  },
  pickup: {
    warehouse_name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    address_2: String,
    city: {
      type: String,
      required: true,
      maxlength: 40,
    },
    state: {
      type: String,
      required: true,
      maxlength: 40,
    },
    pincode: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    gst_number: String,
  },
  is_rto_different: String,
  rto: {
    warehouse_name: String,
    name: String,
    address: String,
    address_2: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
  },
  courier_id: Number,
  is_insurance: {
    type: Number,
    default: 0,
    enum: [0, 1],
  },
  tags: {
    type: String,
    maxlength: 200,
  },
});

/**
 * @typedef Shipment
 */

module.exports = mongoose.model("Shipment", ShipmentSchema);
