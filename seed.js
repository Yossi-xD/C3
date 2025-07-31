const mongoose = require("mongoose");
const User = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/c3db").then(async () => {
  await User.deleteMany();
  await User.create([
    { username: "admin", password: "1234", role: "admin" },
    { username: "user", password: "1234", role: "user" }
  ]);
  console.log("✅ Users seeded");
  process.exit();
});
