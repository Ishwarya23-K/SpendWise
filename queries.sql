-- ==========================================
-- SpendWise SQL Analytics Queries
-- ==========================================

-- 1. Top Spending Categories

SELECT
    category,
    SUM(amount) AS total_spending
FROM expenses
GROUP BY category
ORDER BY total_spending DESC;

-------------------------------------------------

-- 2. Monthly Spending

SELECT
    strftime('%Y-%m', date) AS month,
    SUM(amount) AS total_spending
FROM expenses
GROUP BY month
ORDER BY month;

-------------------------------------------------

-- 3. Daily Spending Trend

SELECT
    date(date) AS expense_date,
    SUM(amount) AS total_spending
FROM expenses
GROUP BY expense_date
ORDER BY expense_date;

-------------------------------------------------

-- 4. Highest Expense

SELECT *
FROM expenses
ORDER BY amount DESC
LIMIT 1;

-------------------------------------------------

-- 5. Average Expense by Category

SELECT
    category,
    ROUND(AVG(amount),2) AS average_expense
FROM expenses
GROUP BY category
ORDER BY average_expense DESC;
SELECT
    b.category,
    b.monthlyBudget,
    SUM(e.amount) AS totalSpent,
    (SUM(e.amount) - b.monthlyBudget) AS difference
FROM budgets b
JOIN expenses e
ON b.category = e.category
GROUP BY b.category
HAVING totalSpent > b.monthlyBudget;

SELECT
    b.category,
    b.monthlyBudget,
    SUM(e.amount) AS totalSpent,
    ROUND((SUM(e.amount) * 100.0) / b.monthlyBudget,2) AS budgetUsedPercentage
FROM budgets b
JOIN expenses e
ON b.category = e.category
GROUP BY b.category;

SELECT
    goalName,
    targetAmount,
    currentAmount,
    ROUND((currentAmount*100.0)/targetAmount,2) AS savingsRate,
    RANK() OVER(
        ORDER BY
        (currentAmount*100.0)/targetAmount DESC
    ) AS goalRank
FROM goals;