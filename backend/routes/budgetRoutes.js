const express = require("express");
const router = express.Router();

const {
  setBudget,
  getBudgets,
} = require("../controllers/budgetController");

const { protect } = require("../middleware/authMiddleware");

// Set or Update Budget
router.post("/", protect, setBudget);

// Get All Budgets
router.get("/", protect, getBudgets);

module.exports = router;