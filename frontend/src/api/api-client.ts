import axios from "axios";
import CryptoJS from "crypto-js";

export const API_CLIENT = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 600000,
});

const secretKey = 'BuL.utBilisimOdEV.$!';

function sifreleObje(object: any) {
  const bodyText = JSON.stringify(object);
  const encryptedData = CryptoJS.AES.encrypt(bodyText, secretKey).toString();
  return encryptedData;
}

function sifreleMetin(bodyText: string) {
  const encryptedData = CryptoJS.AES.encrypt(bodyText, secretKey).toString();
  return encryptedData;
}

// Request body'nin şifrelenmesi
API_CLIENT.interceptors.request.use((config) => {
  console.log('[FRONTEND] Henüz şifrelenmemiş data:', config.data);
  const encryptedDataText = JSON.stringify(config.data);
  config.data = { data: sifreleObje(encryptedDataText) };
  console.log('[FRONTEND] Gönderilmeye hazır şifreli data:', config.data);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Request query'lerin şifrelenmesi, ör: /listele?urun=klavye
API_CLIENT.interceptors.request.use((config) => {
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  for (let param in config.params) {
    console.log('[FRONTEND] Henüz şifrelenmemiş query:', param, ' =>', config.params[param]);
    config.params[param] = sifreleMetin(config.params[param]);
    console.log('--------------------------------------------------------');
    console.log('[FRONTEND] Şifrelenmiş query:', param, ' =>', config.params[param]);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})
