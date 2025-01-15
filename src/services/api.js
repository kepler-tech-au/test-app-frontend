import axios from "axios";

const API_URL = "http://localhost:5000/api/cards";

export const fetchCards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const addCard = async (card) => {
  try {
    const response = await axios.post(API_URL, card);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const updateCard = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
};
