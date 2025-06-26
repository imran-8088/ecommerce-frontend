import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/products` 
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
