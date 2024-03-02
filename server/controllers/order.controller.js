const User = require("../models/user.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const placeOrder = async (req, res) => {
  const { user, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    req.body;
  console.log(req.body);

  try {
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const savedOrder = await order.save();
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
};
const getOrders = async (req, res) => {
  try {
    let orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    return res.status(400).json({ message: "Error retrieving orders" });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deliverOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.isDelivered) {
        return res.status(400).json({ message: "Error: order is already delivered" });
      }

      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const deliveredOrder = await order.save();
      res.status(200).json({
        message: "Order delivered successfully",
        order: deliveredOrder,
      });
    }
  } catch (error) {
    console.error("Error making order delivered:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const paidOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.isPaid) {
        await db.disconnect();
        return res.status(400).json({ message: "Error: order is already paid" });
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      };
      const paidOrder = await order.save();
      return res.json({ message: "order paid successfully", order: paidOrder });
    } else {
      return res.status(404).json({ message: "Error: order not found" });
    }
  } catch (error) {
    console.error("Error making order paid:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { placeOrder, getOrderById, getOrders, deliverOrder, paidOrder };
