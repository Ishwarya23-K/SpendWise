const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/analytics", analyticsRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to SpendWise Backend 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});