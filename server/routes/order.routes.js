const express = require("express");
const orderController = require("../controllers/order.controller");

// Place order
const router = express.Router();
router.route("/api/order").post(orderController.placeOrder);
router.route("/api/orders").get(orderController.getOrders);
router.route("/api/order/:id").get(orderController.getOrderById);
router.route("/api/order/:id/deliver").put(orderController.deliverOrder);
router.route("/api/order/:id/pay").put(orderController.paidOrder);

module.exports = router;
