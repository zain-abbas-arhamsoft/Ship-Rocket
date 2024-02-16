const Product = require("../models/product.model");

exports.create = async (req, res, next) => {
  try {
    const { name, qty, price, sku } = req.body;

    if ((!name || !qty || !price, !sku)) {
      return res.send({
        status: false,
        message: "Please fill all required fields",
      });
    }

    const payload = req.body;

    const product = await Product.create(payload);

    await product.save();
    return res.send({
      status: true,
      data: product,
      message: "Product created successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
