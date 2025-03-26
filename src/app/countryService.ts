import axios from "axios";

const API_URL = "http://localhost:8080/country";

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error at fetching countries:", error);
    throw error;
  }
};

export const getCountriesByComplexity = async (filter: string) => {
  try {
    const response = await axios.post(`${API_URL}/complexity/${filter}`);
    return response.data;
  } catch (error) {
    console.error("Error at fetching complexity:", error);
    throw error;
  }
};
