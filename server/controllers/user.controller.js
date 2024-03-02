const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
require("../models/order.model");

const listUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (err) {
    return res.status(400).json({ message: "Error retrieving orders" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);
    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { listUsers, updateUser, getUserById };
