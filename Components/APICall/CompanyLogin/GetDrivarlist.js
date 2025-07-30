// src/APICall/LoginApi.js
import axios from 'axios';

const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api';


export const getDrivarList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/company/driver/list`);
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};