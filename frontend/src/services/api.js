import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const itemsAPI = {
  getItems: async (params = {}) => {
    const response = await api.get("/items", { params });
    return response.data;
  },

  getItem: async (id) => {
    // Get single item
    const response = await api.get(`/items/${id}`);
    return response.data;
  },
  createItem: async (itemData) => {
    if (itemData instanceof FormData) {
      const response = await api.post("/items", itemData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await api.post("/items", itemData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },
  updateItem: async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  },
};

export default api;
