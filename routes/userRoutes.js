const express = require("express");
const { getProfile } = require("../controllers/userController");
const { loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

// 🔑 Login
router.post("/login", loginUser);

// 🔒 Profile
router.get("/profile", protect, getProfile);

module.exports = router;
