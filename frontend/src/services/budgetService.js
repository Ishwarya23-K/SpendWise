import axios from "axios";

const API_URL = "http://localhost:5000/api/budgets";

const getToken = () => {
  return localStorage.getItem("token");
};

// Set Budget
export const setBudget = async (budgetData) => {
  const response = await axios.post(API_URL, budgetData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get Budgets
export const getBudgets = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};