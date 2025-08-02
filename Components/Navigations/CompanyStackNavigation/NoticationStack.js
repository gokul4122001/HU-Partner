import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../../CompanyScreens/Notification/Notification';
import Header from '../../../Header';

const NotificationStack = createNativeStackNavigator(); 

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <NotificationStack.Screen
        name="Header"
        component={Header}
        options={{ headerShown: false }}
      />
    </NotificationStack.Navigator>
  );
};

export default NotificationStackScreen;
