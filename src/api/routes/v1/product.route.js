const express = require("express");
const controller = require("../../controllers/product.controller");
const router = express.Router();
router.route("/create").post(controller.create);
module.exports = router;
