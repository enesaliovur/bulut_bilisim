import axios from "axios";

export const API_CLIENT = axios.create({
  baseURL: 'http://3.234.229.160:3001',
  timeout: 600000,
});