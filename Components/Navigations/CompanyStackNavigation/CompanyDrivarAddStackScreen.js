import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceHomeScreen from '../../CompanyScreens/DrivarAddFlow/CompanyDriverListScreen';
import ServiceHospitalScreen from '../../CompanyScreens/DrivarAddFlow/CompanyDriverRegisterPage';
import ServiceHospitalDetailScreen from '../../CompanyScreens/DrivarAddFlow/CompanyDriverDetailPage';
import FormPage from '../../CompanyScreens/DrivarAddFlow/CompanyDrivar&AmbulanceAssignmentPage'
import TrackAmbulance from '../../CompanyScreens/DrivarAddFlow/CompanyDrivertrackMapScreenPage'



const ServiceStack = createNativeStackNavigator();

const ServiceStackScreen = () => {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen
        name="ServiceHomeScreen"
        component={ServiceHomeScreen}
        options={{ headerShown: false }}
      />
      <ServiceStack.Screen
        name="ServiceHospitalScreen"
        component={ServiceHospitalScreen}
        options={{ headerShown: false }}
      />
        <ServiceStack.Screen
        name="ServiceHospitalDetailScreen"
        component={ServiceHospitalDetailScreen}
        options={{ headerShown: false }}
      />
    <ServiceStack.Screen
        name="FormPage"
        component={FormPage}
        options={{ headerShown: false }}
      />
         <ServiceStack.Screen
        name="TrackAmbulance"
        component={TrackAmbulance}
        options={{ headerShown: false }}
      />
   
    </ServiceStack.Navigator>
    
  );
};

export default ServiceStackScreen;
