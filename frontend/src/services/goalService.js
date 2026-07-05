import api from "./api";

const getToken = () => localStorage.getItem("token");

// Add Goal
export const addGoal = async (goalData) => {
  const response = await api.post("/goals", goalData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get Goals
export const getGoals = async () => {
  const response = await api.get("/goals", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Goal
export const updateGoal = async (id, goalData) => {
  const response = await api.put(`/goals/${id}`, goalData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Goal
export const deleteGoal = async (id) => {
  const response = await api.delete(`/goals/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};