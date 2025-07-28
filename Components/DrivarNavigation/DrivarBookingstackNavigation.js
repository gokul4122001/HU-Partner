import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingHomeScreen from '../Screens/CompanyBookingFlow/BookingHomeScreen';
import BookingDetailsScreen from '../Screens/CompanyBookingFlow/BookingDetailPage';
import TrackDrivar from '../Screens/CompanyBookingFlow/TrackDrivar';
import SwpingPayments from '../Screens/CompanyBookingFlow/SwipPayment';
import Schedulebookingdetails from '../Screens/CompanyBookingFlow/ScheduleBookingdetailsPage';
import Completebookingdetails from '../Screens/CompanyBookingFlow/CompleteViewDetails';
import Canceledbookingdetails from '../Screens/CompanyBookingFlow/CanceledDetailsPage';


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
        name="Schedulebookingdetails"
        component={Schedulebookingdetails}
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
