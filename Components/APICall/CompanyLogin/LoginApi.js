// src/APICall/LoginApi.js
import axios from 'axios';

const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api';

export const login = async (mobile, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/company/login?mobile=${mobile}&password=${password}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};
