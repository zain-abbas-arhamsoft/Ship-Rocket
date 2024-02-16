const Shipment = require("../models/shipment.model");
const Parcel = require("../models/parcel.model");
const randomatic = require("randomatic");

exports.create = async (req, res, next) => {
  try {
    const {
      orderNumber,
      shippingCharges,
      discount,
      codCharges,
      paymentType,
      orderAmount,
      packageWeight,
      packageLength,
      packageBreadth,
      packageHeight,
      consignee,
      pickUp,
      orderItems,
      productId,
      quantity,
      isRtoDifferent,
      rto,
    } = req.body;

    // Generate random IDs and numbers
    const orderId = randomatic("0", 7);
    const shipmentId = randomatic("0", 7);
    const awbNumber = randomatic("0", 11);
    const courierId = randomatic("0", 1);

    // Create shipment data
    const data = {
      orderId,
      orderNumber,
      orderAmount,
      shippingCharges,
      packageWeight,
      packageBreadth,
      packageLength,
      packageHeight,
      discount,
      codCharges,
      shipmentId,
      awbNumber,
      courierId,
      consignee,
      pickUp,
      orderItems,
      courierName: "Bluedart",
      additionalInfo: "BOM / TEC",
      paymentType,
      isRtoDifferent,
      rto,
    };

    // Create new shipment
    const shipment = await Shipment.create(data);

    // Create new parcel
    const parcelPayload = {
      shipmentId: shipment?._id,
      productId,
      quantity,
    };
    await Parcel.create(parcelPayload);

    // Send response
    return res.send({
      status: true,
      data: shipment,
      message: "Shipment created successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    return next(error);
  }
};
