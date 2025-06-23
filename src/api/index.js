// src/api/index.js
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products'; // Replace with your backend when ready

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
