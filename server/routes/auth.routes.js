const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/auth/register").post(authController.register);
router.route("/api/auth/login").post(authController.login);
router.route("/api/auth/logout").get(authController.logout);

module.exports = router;
