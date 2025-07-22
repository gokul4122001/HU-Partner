import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/ProfileFlow/ProfileScreen';
import Profileone from '../Screens/ProfileFlow/ProfileScreenone'
import Payments from '../Screens/ProfileFlow/Payment&Billes'

import ChangePassword from '../Screens/ProfileFlow/ChangePasswordScreen'
import EmergencyContactScreen from '../Screens/ProfileFlow/ProfileEmergencyContactPage';
import Assignment from '../Screens/ProfileFlow/AssignmentOverview.js';

import TermsAndConditionsScreen from '../Screens/ProfileFlow/Terms&ConditionPage';

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Profileone"
        component={Profileone}
        options={{ headerShown: false }}
      />
    
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
       <ProfileStack.Screen
        name="EmergencyContactScreen"
        component={EmergencyContactScreen}
        options={{ headerShown: false }}
      />
        <ProfileStack.Screen
        name="Assignment"
        component={Assignment}
        options={{ headerShown: false }}
      />
        <ProfileStack.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: false }}
      />
       <ProfileStack.Screen
        name="TermsAndConditionsScreen"
        component={TermsAndConditionsScreen}
        options={{ headerShown: false }}
      />

    </ProfileStack.Navigator>
    
  );
};

export default ProfileStackScreen;
