import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrivarDetailsPage from '../../../DrivarScreens/DrivarDeatils/DrivarDetailsPage';

const ServiceStack = createNativeStackNavigator();

const ServiceStackScreen = () => {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen
        name="DrivarDetailsPage"
        component={DrivarDetailsPage}
        options={{ headerShown: false }}
      />
    </ServiceStack.Navigator>
  );
};

export default ServiceStackScreen;
