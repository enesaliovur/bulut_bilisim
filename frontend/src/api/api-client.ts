import axios from "axios";
import CryptoJS from "crypto-js";

export const API_CLIENT = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 600000,
});

const secretKey = 'BuL.utBilisimOdEV.$!';

function sifrele(object: any) {
  const bodyText = JSON.stringify(object);
  const encryptedData = CryptoJS.AES.encrypt(bodyText, secretKey).toString();
  return encryptedData;
}

API_CLIENT.interceptors.request.use((config) => {
  console.log('[FRONTEND] Henüz şifrelenmemiş data:', config.data);
  const encryptedDataText = JSON.stringify(config.data);
  config.data = { data: sifrele(encryptedDataText) };
  console.log('[FRONTEND] Gönderilmeye hazır şifreli data:', config.data);
  return config;
}, (error) => {
  return Promise.reject(error);
});
