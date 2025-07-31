const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");



const mongoose = require("mongoose");

exports.showDBName = async (req, res) => {
  res.json({ currentDatabase: mongoose.connection.name });
};



// REGISTER USER
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;


  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: pwd, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      message: "User created",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials (email)" });
    }

    console.log("🔍 Incoming Password:", password);
    console.log("🔐 Stored Hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password Match?", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials (password)" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// authController.js
exports.debugUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};



// 🧹 DELETE user by email
exports.deleteUser = async (req, res) => {
  try {
    const raw = req.params.email || "";
    const email = decodeURIComponent(raw).toLowerCase().trim();

    console.log("Attempting to delete:", email); // debug

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", email });
    }

    res.json({ message: "User deleted successfully", deleted: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message || err });
  }
};




