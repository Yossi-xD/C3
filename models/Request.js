const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  imageUrls: [String],
  payment: Number,
  productLocation: String,
  userLocation: String,
  region: String,
  requestedTime: String,
  requestedDate: String,
  status: {
    type: String,
    enum: ["new", "pending", "accepted", "delivered", "done"],
    default: "new"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
