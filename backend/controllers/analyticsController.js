const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const Goal = require("../models/Goal");

const getAnalytics = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });

    const budgets = await Budget.find({ user: req.user._id });

    const goals = await Goal.find({ user: req.user._id });

    // ===============================
    // Dashboard Cards
    // ===============================

    const totalSpending = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalBudget = budgets.reduce(
      (sum, budget) => sum + budget.monthlyBudget,
      0
    );

    const remainingBudget = totalBudget - totalSpending;

    const totalTarget = goals.reduce(
      (sum, goal) => sum + goal.targetAmount,
      0
    );

    const totalSaved = goals.reduce(
      (sum, goal) => sum + goal.currentAmount,
      0
    );

    // ===============================
    // Budget Adherence
    // ===============================

    const budgetAdherence =
      totalBudget > 0
        ? Number(((remainingBudget / totalBudget) * 100).toFixed(2))
        : 0;

    // ===============================
    // Savings Rate
    // ===============================

    const savingsRate =
      totalTarget > 0
        ? Number(((totalSaved / totalTarget) * 100).toFixed(2))
        : 0;

    // ===============================
    // Burn Rate
    // ===============================

    const uniqueDates = [
      ...new Set(
        expenses.map((expense) =>
          expense.date.toISOString().split("T")[0]
        )
      ),
    ];

    const burnRate =
      uniqueDates.length > 0
        ? Number((totalSpending / uniqueDates.length).toFixed(2))
        : 0;

    // ===============================
    // Month-over-Month Change
    // ===============================

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonth =
      currentMonth === 0 ? 11 : currentMonth - 1;

    const previousYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthTotal = expenses
      .filter((expense) => {
        const d = new Date(expense.date);

        return (
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    const previousMonthTotal = expenses
      .filter((expense) => {
        const d = new Date(expense.date);

        return (
          d.getMonth() === previousMonth &&
          d.getFullYear() === previousYear
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    const monthChange =
      previousMonthTotal > 0
        ? Number(
            (
              ((currentMonthTotal - previousMonthTotal) /
                previousMonthTotal) *
              100
            ).toFixed(2)
          )
        : 0;

    // ===============================
    // Pie Chart Data
    // ===============================

    const categoryMap = {};

    expenses.forEach((expense) => {
      categoryMap[expense.category] =
        (categoryMap[expense.category] || 0) +
        expense.amount;
    });

    const categoryWiseExpense = Object.keys(categoryMap).map(
      (category) => ({
        category,
        total: categoryMap[category],
      })
    );

    // ===============================
    // Top Categories
    // ===============================

    const topCategories = [...categoryWiseExpense]
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);

    // ===============================
    // Line Chart Data
    // ===============================

    const lineChartMap = {};

    expenses.forEach((expense) => {
      const date = expense.date.toISOString().split("T")[0];

      if (lineChartMap[date]) {
        lineChartMap[date] += expense.amount;
      } else {
        lineChartMap[date] = expense.amount;
      }
    });

    const lineChartData = Object.keys(lineChartMap)
      .sort()
      .map((date) => ({
        date,
        amount: lineChartMap[date],
      }));

    // ===============================
    // Bar Chart Data
    // ===============================

    const barChartData = budgets.map((budget) => {
      const spent = expenses
        .filter(
          (expense) =>
            expense.category === budget.category
        )
        .reduce((sum, expense) => sum + expense.amount, 0);

      return {
        category: budget.category,
        budget: budget.monthlyBudget,
        spent,
      };
    });

    // ===============================
    // Recent Expenses
    // ===============================

    const recentExpenses = expenses.slice(0, 5);

    // ===============================
    // Recommendation Engine
    // ===============================

    const alerts = [];

    budgets.forEach((budget) => {
      const spent = expenses
        .filter(
          (expense) =>
            expense.category === budget.category
        )
        .reduce((sum, expense) => sum + expense.amount, 0);

      const percentage =
        budget.monthlyBudget > 0
          ? (spent / budget.monthlyBudget) * 100
          : 0;

      if (percentage >= 100) {
        alerts.push({
          type: "danger",
          message: `${budget.category} budget exceeded!`,
        });
      } else if (percentage >= 90) {
        alerts.push({
          type: "warning",
          message: `${budget.category} budget is ${percentage.toFixed(
            0
          )}% used.`,
        });
      }
    });

    // Savings Rate Alert

    if (savingsRate < 10) {
      alerts.push({
        type: "warning",
        message:
          "Your savings rate is below 10%. Consider increasing your savings.",
      });
    }

    // Savings Goal Alert

    goals.forEach((goal) => {
      const progress =
        goal.targetAmount > 0
          ? (goal.currentAmount / goal.targetAmount) * 100
          : 0;

      if (progress < 50) {
        alerts.push({
          type: "warning",
          message: `${goal.goalName} is less than 50% completed.`,
        });
      }
    });

    // Category Spending Alert

    topCategories.forEach((category) => {
      const percentage =
        totalSpending > 0
          ? (category.total / totalSpending) * 100
          : 0;

      if (percentage > 30) {
        alerts.push({
          type: "warning",
          message: `${category.category} contributes more than 30% of your spending.`,
        });
      }
    });

    // ===============================
    // Response
    // ===============================

    res.json({
      totalSpending,
      totalBudget,
      remainingBudget,

      totalTarget,
      totalSaved,

      budgetAdherence,
      savingsRate,
      burnRate,
      monthChange,

      topCategories,

      categoryWiseExpense,
      lineChartData,
      barChartData,

      recentExpenses,

      alerts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAnalytics,
};