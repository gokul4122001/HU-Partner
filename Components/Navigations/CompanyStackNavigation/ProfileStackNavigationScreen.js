import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../CompanyScreens/ProfileFlow/ProfileScreen';
import Profileone from '../../CompanyScreens/ProfileFlow/ProfileScreenone'
import Payments from '../../CompanyScreens/ProfileFlow/Payment&Billes'

import ChangePassword from '../../CompanyScreens/ProfileFlow/ChangePasswordScreen'
import EmergencyContactScreen from '../../CompanyScreens/ProfileFlow/ProfileEmergencyContactPage';
import Assignment from '../../CompanyScreens/ProfileFlow/AssignmentOverview.js';

import TermsAndConditionsScreen from '../../CompanyScreens/ProfileFlow/Terms&ConditionPage';

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
