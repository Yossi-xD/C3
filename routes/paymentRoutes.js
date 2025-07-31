const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getPaymentsForUser,
  markPaymentAsPaid
} = require("../controllers/paymentController");

router.get("/", protect, getPaymentsForUser);

// ✅ This is the route you're missing 👇
router.patch("/:id/mark-paid", protect, markPaymentAsPaid);

module.exports = router;
