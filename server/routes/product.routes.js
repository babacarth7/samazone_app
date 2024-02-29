const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.route("/api/products").get(productController.list);

module.exports = router;
