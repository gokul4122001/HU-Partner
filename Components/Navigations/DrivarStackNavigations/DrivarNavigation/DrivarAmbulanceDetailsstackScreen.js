import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmergencyHomeScreen from '../../../DrivarScreens/DrivarAmbulanceDetails/DrivarAmbulanceDetailsPage';

const EmergencyStack = createNativeStackNavigator();

const EmergencyStackScreen = () => {
  return (
    <EmergencyStack.Navigator>
      <EmergencyStack.Screen
        name="EmergencyHomeScreen"
        component={EmergencyHomeScreen}
        options={{ headerShown: false }}
      />
    </EmergencyStack.Navigator>
  );
};

export default EmergencyStackScreen;
