import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceHomeScreen from '../Screens/DrivarAddFlow/ServiceHomeScreenPage';
import ServiceHospitalScreen from '../Screens/DrivarAddFlow/ServiceHospitalOverviewPage';
import ServiceHospitalDetailScreen from '../Screens/DrivarAddFlow/SeviceHospitalDetailePage';
import FormPage from '../Screens/DrivarAddFlow/EnquiryFormPage'
import TrackAmbulance from '../Screens/DrivarAddFlow/TrackAmbulance'



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
