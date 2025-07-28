import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../../DrivarScreens/DrivarProfileFlow/DrivarProfileScreen.js';
import Profileone from '../../../DrivarScreens/DrivarProfileFlow/DrivarProfileScreenone.js';
import Payments from '../../../DrivarScreens/DrivarProfileFlow/DrivarPayment&Billes.js';
import ChangePassword from '../../../DrivarScreens/DrivarProfileFlow/DrivarChangePasswordScreen.js';
import Assignment from '../../../DrivarScreens/DrivarProfileFlow/DrivarAssignmentOverview.js.js';
import TermsAndConditionsScreen from '../../../DrivarScreens/DrivarProfileFlow/Terms&ConditionPage.js';

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
