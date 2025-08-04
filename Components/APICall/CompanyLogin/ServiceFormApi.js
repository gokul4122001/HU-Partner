// src/APICall/LoginApi.js
import axios from 'axios';

const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api';

export const Company_register = async (
  email,
  mobile,
  name,
  password,
  state,
  district,
  confirmPassword,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/company/register?email=${email}&mobile=${mobile}&name=${name}&password=${password}&state=${state}&district=${district}&password_confirmation=${confirmPassword}`,
    );

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

export const getDistric = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/get_districts?state=${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};
export const Company_Profile = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/company/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};

export const Company_Profile_update = async payload => {
  try {
    const response = await axios.post(
      `${BASE_URL}/company/profile_update`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};

export const Ambulance_Register = async (token, payload) => {
  console.log(payload);

  try {
    const response = await axios.post(
      `${BASE_URL}/company/ambulance/register`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};
export const Ambulance_Edit = async (token, payload) => {
  console.log(payload);

  try {
    const response = await axios.post(
      `${BASE_URL}/company/ambulance/update`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};
export const Ambulance_List = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/company/ambulance/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, 'response.data');

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};
export const Ambulance_One = async (token, id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/company/ambulance/edit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data, 'response.data');

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};

export const Driver_List = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/company/driver/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, 'response.data');

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};
export const Driver_Register = async (token, payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/company/driver/register`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data, 'response.data');

    return response.data;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};

export const Driver_One = async (token, id) => {

  console.log(token,id)
  try {
    const response = await axios.get(
      `${BASE_URL}/company/driver/edit/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response?.data ?? { message: 'Unknown error' };
  }
};
