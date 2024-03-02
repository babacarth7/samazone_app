const Product = require("../models/product.model");

const list = async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (err) {
    return res.status(400).json({ message: "Error retrieving products" });
  }
};

module.exports = { list };
