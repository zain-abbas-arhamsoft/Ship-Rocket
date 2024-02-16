const express = require("express");
const userRoutes = require("./user.route");
const shipmentRoutes = require("./shipment.route");
const productRoutes = require("./product.route");
const router = express.Router();
/**
 * GET v1/status
 */
router.use("/users", userRoutes);
router.use("/shipments", shipmentRoutes);
router.use("/product", productRoutes);
module.exports = router;
