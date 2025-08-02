import React from 'react';
import { Provider } from 'react-redux';
import store from './Components/redux/store';
import AppNavigator from './AppNavigation';

export default function Root() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

