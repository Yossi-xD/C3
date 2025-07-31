const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
