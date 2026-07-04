import axios from "axios";

const API_URL = "http://localhost:5000/api/goals";

const getToken = () => {
  return localStorage.getItem("token");
};

// Add Goal
export const addGoal = async (goalData) => {
  const response = await axios.post(API_URL, goalData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get Goals
export const getGoals = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Goal
export const updateGoal = async (id, goalData) => {
  const response = await axios.put(`${API_URL}/${id}`, goalData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Goal
export const deleteGoal = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};