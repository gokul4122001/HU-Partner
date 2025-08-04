// src/APICall/LoginApi.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api';

export const login = async (mobile, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/company/login?mobile=${mobile}&password=${password}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};
export const Change_Password = async (current_password, password, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/change_password?current_password=${current_password}&new_password=${password}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
    console.log(response.data, 'respo');
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};
export const Forget_Password_otp = async (mobile, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/otp/forget-password/request?mobile=${mobile}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
    
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};
export const resetPassword = async (mobile,password,otp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/otp/forget-password/verify?mobile=${mobile}&password=${password}&otp=${otp}`);
      console.log(response.data,"response.data");
    return response.data;
    
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const Terms_conditions = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    

console.log('Fetched token:', token);
    const response = await axios.get(`${BASE_URL}/get_terms_conditions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('API Success Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Full Axios Error:', error);
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};

