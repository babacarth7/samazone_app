const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.route("/api/users").get(userController.listUsers);
router.route("/api/user/:id").get(userController.getUserById);
router.route("/api/user/:id").put(userController.updateUser);

module.exports = router;
