import axios from "axios";

const API_URL = "http://localhost:5000/api/analytics";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAnalytics = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};