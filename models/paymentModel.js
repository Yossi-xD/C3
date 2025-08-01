const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  email: { type: String, required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true }, // ✅ NEW
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);

