const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  debugUsers,
  deleteUser,
  showDBName 
} = require("../controllers/authController");


router.get("/which-db", showDBName);



// ✅ Register user
router.post("/register", registerUser);

// ✅ Login user
router.post("/login", loginUser);

// 🐞 Debug: Show all users (DO NOT deploy to production)
router.get("/debug-users", debugUsers);

// delete users
router.delete("/delete/:email", deleteUser); 



module.exports = router;
