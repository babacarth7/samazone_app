const express = require("express");
const adminController = require("../controllers/admin.controller");
const authCtrl = require("../middleware/auth.middleware")


const router = express.Router()



router.route("/api/admin/summary", authCtrl.requireAdmin).get(adminController.summary);
router.route("/api/admin/orders").get(adminController.orders);
router.route("/api/admin/users").get(adminController.users);
router.route("/api/admin/products").get(adminController.products);

module.exports = router;