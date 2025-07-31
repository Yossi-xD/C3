const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
    console.log(`📦 Using Database: ${conn.connection.name}`);
  } catch (err) {
    console.error("❌ DB connect error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
