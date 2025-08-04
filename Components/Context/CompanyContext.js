import React, { createContext, useContext, useEffect, useState } from 'react';
import { Company_Profile } from '../APICall/CompanyLogin/ServiceFormApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const res = await Company_Profile(token);
        setCompanyProfile(res?.data);
      } catch (e) {
        console.error('Failed to load stored data:', e);
      }
    };
    if (token) {
      checkApprovalStatus();
    }
  }, [token]);

  const fetchToken = async () => {
    const tok =    await AsyncStorage.getItem('token');
    setToken(tok)
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        companyProfile,
        setCompanyProfile,
        token,
        setToken,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
