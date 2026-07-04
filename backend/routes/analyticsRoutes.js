const express = require("express");
const router = express.Router();

const { getAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

// Get Dashboard Analytics
router.get("/", protect, getAnalytics);

module.exports = router;