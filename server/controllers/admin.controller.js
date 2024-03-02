const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

const summary = async (req, res) => {
  try {
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersPriceGroup = await Order.aggregate([
      {
        $group: {
          _id: null,
          sales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const ordersPrice = ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.send({
      ordersCount,
      productsCount,
      usersCount,
      ordersPrice,
      salesData,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const orders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "name").sort({ createdAt: -1 });
  res.send(orders);
};

const users = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const products = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};
module.exports = { summary, orders, users, products };
