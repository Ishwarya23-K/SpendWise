import axios from "./api";

const getToken = () => localStorage.getItem("token");

export const addExpense = async (expenseData) => {
  const response = await axios.post("/expenses", expenseData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getExpenses = async () => {
  const response = await axios.get("/expenses", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(`/expenses/${id}`, expenseData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};