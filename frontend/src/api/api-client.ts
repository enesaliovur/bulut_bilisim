import axios from "axios";

export const API_CLIENT = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 600000,
});