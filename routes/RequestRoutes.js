const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createRequest,
  getAllRequests,
  deleteRequest,
  updateRequest,
  acceptRequest,
  markDelivered
} = require("../controllers/requestController");

router.post("/", protect, createRequest);
router.get("/", protect, getAllRequests);
router.delete("/:id", protect, deleteRequest);
router.put("/:id", protect, updateRequest);
router.patch("/:id/accept", protect, acceptRequest);
router.patch("/:id/deliver", protect, markDelivered);

module.exports = router;
