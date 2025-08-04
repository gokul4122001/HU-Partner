import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './Components/redux/store';
import AppNavigator from './AppNavigation';
import { CompanyProvider } from './Components/Context/CompanyContext';
import {
  requestUserPermission,
  getFcmToken,
  onMessageListener,
} from './Components/FireBase/FcmService';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    const unsubscribe = onMessageListener();
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <CompanyProvider>
        <AppNavigator />
      </CompanyProvider>
    </Provider>
  );
}
