// src/APICall/LoginApi.js
import axios from 'axios';

const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api';

export const login = async (email,mobile,name,password,state,district) => {
  try {
    const response = await axios.post(`${BASE_URL}/company/register?email=${email}&mobile=${mobile}&name=${name}&password=${password}&state=${state}&district=${district}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const getStates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_states`);
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};

export const getDistric = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_districts?state=31`);
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};