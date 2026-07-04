import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalSpending: 0,
    totalBudget: 0,
    remainingBudget: 0,

    totalTarget: 0,
    totalSaved: 0,

    budgetAdherence: 0,
    savingsRate: 0,
    burnRate: 0,
    monthChange: 0,

    topCategories: [],
    categoryWiseExpense: [],
    lineChartData: [],
    barChartData: [],
    recentExpenses: [],
    alerts: [],
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
  ];

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        SpendWise Analytics Dashboard
      </h2>

      {/* KPI Cards */}

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Spending</h6>
              <h3>₹{analytics.totalSpending}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Budget</h6>
              <h3>₹{analytics.totalBudget}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Remaining Budget</h6>
              <h3>₹{analytics.remainingBudget}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Budget Adherence</h6>
              <h3>{analytics.budgetAdherence}%</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Savings Target</h6>
              <h3>₹{analytics.totalTarget}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Saved</h6>
              <h3>₹{analytics.totalSaved}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Savings Rate</h6>
              <h3>{analytics.savingsRate}%</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Burn Rate</h6>
              <h3>₹{analytics.burnRate}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Month-over-Month Change</h6>
              <h3>{analytics.monthChange}%</h3>
            </div>
          </div>
        </div>

      </div>
            {/* ================= Pie Chart ================= */}

      <div className="card shadow mt-4">
        <div className="card-body">

          <h4 className="text-center mb-3">
            Spending by Category
          </h4>

          {analytics.categoryWiseExpense.length === 0 ? (
            <p className="text-center">
              No expense data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>

              <PieChart>

                <Pie
                  data={analytics.categoryWiseExpense}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={120}
                  label
                >
                  {analytics.categoryWiseExpense.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>
          )}

        </div>
      </div>

      {/* ================= Line Chart ================= */}

      <div className="card shadow mt-4">

        <div className="card-body">

          <h4 className="text-center mb-3">
            Daily Spending Trend
          </h4>

          {analytics.lineChartData.length === 0 ? (
            <p className="text-center">
              No data available.
            </p>
          ) : (

            <ResponsiveContainer width="100%" height={350}>

              <LineChart data={analytics.lineChartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

      {/* ================= Bar Chart ================= */}

      <div className="card shadow mt-4">

        <div className="card-body">

          <h4 className="text-center mb-3">
            Budget vs Spending
          </h4>

          {analytics.barChartData.length === 0 ? (
            <p className="text-center">
              No budget data available.
            </p>
          ) : (

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={analytics.barChartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="budget"
                  fill="#82ca9d"
                />

                <Bar
                  dataKey="spent"
                  fill="#8884d8"
                />

              </BarChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>
            {/* ================= Top Categories ================= */}

      <div className="card shadow mt-4">
        <div className="card-body">

          <h4 className="mb-3">
            Top Spending Categories
          </h4>

          {analytics.topCategories.length === 0 ? (
            <p className="text-center">
              No category data available.
            </p>
          ) : (
            <table className="table table-bordered table-hover">

              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Category</th>
                  <th>Total Spent</th>
                </tr>
              </thead>

              <tbody>

                {analytics.topCategories.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.category}</td>
                    <td>₹{category.total}</td>
                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>
      </div>

      {/* ================= Recent Expenses ================= */}

      <div className="card shadow mt-4">

        <div className="card-body">

          <h4 className="mb-3">
            Recent Expenses
          </h4>

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {analytics.recentExpenses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Expenses Found
                  </td>
                </tr>
              ) : (
                analytics.recentExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>{expense.category}</td>
                    <td>₹{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>{expense.date.substring(0, 10)}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= Recommendations ================= */}

      <div className="card shadow mt-4 mb-5">

        <div className="card-body">

          <h4 className="mb-3">
            Personalized Recommendations
          </h4>

          {analytics.alerts.length === 0 ? (

            <div className="alert alert-success">
              🎉 Excellent! No financial risks detected.
            </div>

          ) : (

            analytics.alerts.map((alert, index) => (
              <div
                key={index}
                className={`alert alert-${alert.type}`}
              >
                {alert.message}
              </div>
            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;