import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmergencyHomeScreen from '../Screens/CompanyAmbulanceAddFlow/CompanyAmbulanceAddPage';
import EmergencyHospitalScreen from '../Screens/CompanyAmbulanceAddFlow/AmbulanceAddRegisterPage';
import EmergencyHospitalDetailScreen from '../Screens/CompanyAmbulanceAddFlow/AmbulanceDetailsPage';

const EmergencyStack = createNativeStackNavigator();

const EmergencyStackScreen = () => {
  return (
    <EmergencyStack.Navigator>
      <EmergencyStack.Screen
        name="EmergencyHomeScreen"
        component={EmergencyHomeScreen}
        options={{ headerShown: false }}
      />

      <EmergencyStack.Screen
        name="EmergencyHospitalScreen"
        component={EmergencyHospitalScreen}
        options={{ headerShown: false }}
      />

      <EmergencyStack.Screen
        name="EmergencyHospitalDetailScreen"
        component={EmergencyHospitalDetailScreen}
        options={{ headerShown: false }}
      />
    </EmergencyStack.Navigator>
  );
};

export default EmergencyStackScreen;
