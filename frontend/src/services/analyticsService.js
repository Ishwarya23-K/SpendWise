import axios from "./api";

const getToken = () => localStorage.getItem("token");

export const getAnalytics = async () => {
  const response = await axios.get("/analytics", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};