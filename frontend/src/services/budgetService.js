import api from "./api";

const getToken = () => localStorage.getItem("token");

// Set Budget
export const setBudget = async (budgetData) => {
  const response = await api.post("/budgets", budgetData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get Budgets
export const getBudgets = async () => {
  const response = await api.get("/budgets", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};