const express = require("express");
const controller = require("../../controllers/shipment.controller");
const router = express.Router();
router.route("/create").post(controller.create);
module.exports = router;
