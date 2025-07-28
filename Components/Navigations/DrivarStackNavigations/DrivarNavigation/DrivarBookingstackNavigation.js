import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingHomeScreen from '../../../DrivarScreens/DrivarBookingFlow/DrivarBookingHomeScreen';
import BookingDetailsScreen from '../../../DrivarScreens/DrivarBookingFlow/DrivarBookingDetailPage';
import TrackDrivar from '../../../DrivarScreens/DrivarBookingFlow/DrivarTrackDrivar';
import SwpingPayments from '../../../DrivarScreens/DrivarBookingFlow/DrivarSwipPayment';
import Completebookingdetails from '../../../DrivarScreens/DrivarBookingFlow/DrivarCompleteViewDetails';
import Canceledbookingdetails from '../../../DrivarScreens/DrivarBookingFlow/DrivarCanceledDetailsPage';

const BookingStack = createNativeStackNavigator();

const BoookingStackScreen = () => {
  return (
    <BookingStack.Navigator>
      <BookingStack.Screen
        name="BookingHomeScreen"
        component={BookingHomeScreen}
        options={{ headerShown: false }}
      />

      <BookingStack.Screen
        name="BookingDetailsScreen"
        component={BookingDetailsScreen}
        options={{ headerShown: false }}
      />
      <BookingStack.Screen
        name="TrackDrivar"
        component={TrackDrivar}
        options={{ headerShown: false }}
      />
      <BookingStack.Screen
        name="SwpingPayments"
        component={SwpingPayments}
        options={{ headerShown: false }}
      />
     
      <BookingStack.Screen
        name="Completebookingdetails"
        component={Completebookingdetails}
        options={{ headerShown: false }}
      />

      <BookingStack.Screen
        name="Canceledbookingdetails"
        component={Canceledbookingdetails}
        options={{ headerShown: false }}
      />
    </BookingStack.Navigator>
  );
};

export default BoookingStackScreen;
