// models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Add this
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["traveler", "requester"], required: true }
});


// 🔒 Hash password before saving
// userSchema.pre("save", async function (next) {
//   // Only hash if password field was modified (e.g. during creation or change)
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
