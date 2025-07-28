import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Company1 from '../../CompanyScreens/CompanyAmbulanceAddFlow/CompanyAmbulanceAddPage';
import Company2 from '../../CompanyScreens/CompanyAmbulanceAddFlow/AmbulanceAddRegisterPage';
import Company3 from '../../CompanyScreens/CompanyAmbulanceAddFlow/AmbulanceDetailsPage';

const EmergencyStack = createNativeStackNavigator();

const EmergencyStackScreen = () => {
  return (
    <EmergencyStack.Navigator>
      <EmergencyStack.Screen
        name="Company1"
        component={Company1}
        options={{ headerShown: false }}
      />

      <EmergencyStack.Screen
        name="Company2"
        component={Company2}
        options={{ headerShown: false }}
      />

      <EmergencyStack.Screen
        name="Company3"
        component={Company3}
        options={{ headerShown: false }}
      />
    </EmergencyStack.Navigator>
  );
};

export default EmergencyStackScreen;
