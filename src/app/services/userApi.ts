import axios from "axios";

const API_URL = "http://localhost:8080";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("Error at fetching user.", error);
    throw error;
  }
};

export const getRankByUserId = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error( `There was an error fetching rank for user ${userId}!`, error);
    throw error;
  }
};
