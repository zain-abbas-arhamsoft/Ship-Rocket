const mongoose = require("mongoose");
/**
 * Shipment Schema
 * @private
 */
const ShipmentSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true, // string - max length: 20
    maxlength: 20,
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["cod", "prepaid", "reverse"], // Valid Values - cod, prepaid & reverse
  },
  packageWeight: {
    type: Number,
    default: 0, // Weight in grams
  },
  packageLength: {
    type: Number, // Package length in cm.
  },
  packageBreadth: { type: Number }, // Package breadth in cm.
  packageHeight: {
    type: Number, // Package height in cm.
  },
  requestAutoPickup: {
    type: Boolean,
    default: true, // Use Yes to send auto pickup request to courier.
  },
  shippingCharges: {
    type: Number,
  },
  codCharges: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  orderAmount: {
    type: Number,
    required: true,
  },
  consignee: {
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    companyName: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    address2: {
      type: String,
    },
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
    pinCode: {
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

  pickUp: {
    wareHouseName: {
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
    address2: {
      type: String,
    },
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
    pinCode: {
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
    gstNumber: {
      type: String,
    },
  },

  isRtoDifferent: {
    type: String,
    enum: ["yes", "no"],
  },
  rto: {
    wareHouseName: {
      type: String,
      maxlength: 20,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    name: {
      type: String,
      maxlength: 200,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    address: {
      type: String,
      maxlength: 200,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    address2: {
      type: String,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    city: {
      type: String,
      maxlength: 40,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    state: {
      type: String,
      maxlength: 40,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    pinCode: {
      type: String,
      minlength: 6,
      maxlength: 6,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
    gstNumber: {
      type: String,
      required: function () {
        return this.isRtoDifferent === "yes"; // Require if RTO is different
      },
    },
  },

  courierId: {
    type: Number,
  },
  isInsurance: {
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
