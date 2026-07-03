import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

const getToken = () => localStorage.getItem("token");

export const addExpense = async (expenseData) => {
  return await axios.post(API_URL, expenseData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.data);
};

export const getExpenses = async () => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.data);
};

export const updateExpense = async (id, expenseData) => {
  return await axios.put(`${API_URL}/${id}`, expenseData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.data);
};

export const deleteExpense = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.data);
};