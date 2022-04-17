import axios from "axios";

export const API_CLIENT = axios.create({
  baseURL: 'http://54.91.185.193:3001/',
  timeout: 600000,
});