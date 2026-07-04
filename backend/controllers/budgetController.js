const Budget = require("../models/Budget");

// Set Budget
const setBudget = async (req, res) => {
  try {
    const { category, monthlyBudget } = req.body;

    // Check if budget already exists for this category
    let budget = await Budget.findOne({
      user: req.user._id,
      category,
    });

    if (budget) {
      budget.monthlyBudget = monthlyBudget;
      await budget.save();

      return res.status(200).json(budget);
    }

    budget = await Budget.create({
      user: req.user._id,
      category,
      monthlyBudget,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user._id,
    });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  setBudget,
  getBudgets,
};