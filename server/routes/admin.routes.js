const express = require("express");
const adminController = require("../controllers/admin.controller");
const authCtrl = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/api/admin/summary").get(authCtrl, adminController.summary);
router.route("/api/admin/orders").get(authCtrl, adminController.orders);
router.route("/api/admin/users").get(authCtrl, adminController.users);
router.route("/api/admin/products").get(authCtrl, adminController.products);

module.exports = router;
