// controllers/paymentController.js

const Payment = require("../models/paymentModel");  // adjust if named differently

// GET /api/payments
const getPaymentsForUser = async (req, res) => {
  try {
    const payments = await Payment.find({ email: req.user.email });
    res.json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPaymentsForUser
};

// PATCH /api/payments/:id/mark-paid
const markPaymentAsPaid = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Optionally: restrict only owners to update
    if (payment.email !== req.user.email) {
      return res.status(403).json({ message: "Not authorized to update this payment" });
    }

    payment.status = "Paid";
    await payment.save();

    res.json({ message: "Payment marked as Paid", payment });
  } catch (err) {
    console.error("Error marking payment as paid:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPaymentsForUser,
  markPaymentAsPaid
};
