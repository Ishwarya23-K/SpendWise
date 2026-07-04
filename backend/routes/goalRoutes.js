const express = require("express");
const router = express.Router();

const {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

// Add Goal
router.post("/", protect, addGoal);

// Get All Goals
router.get("/", protect, getGoals);

// Update Goal
router.put("/:id", protect, updateGoal);

// Delete Goal
router.delete("/:id", protect, deleteGoal);

module.exports = router;