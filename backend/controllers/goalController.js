const Goal = require("../models/Goal");

// Add Goal
const addGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, currentAmount } = req.body;

    const goal = await Goal.create({
      user: req.user._id,
      goalName,
      targetAmount,
      currentAmount,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Goal
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};