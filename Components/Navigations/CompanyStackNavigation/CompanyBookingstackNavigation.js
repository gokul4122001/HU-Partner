import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingHomeScreen from '../../CompanyScreens/CompanyBookingFlow/BookingHomeScreen';
import BookingDetailsScreen from '../../CompanyScreens/CompanyBookingFlow/BookingDetailPage';
import TrackDrivar from '../../CompanyScreens/CompanyBookingFlow/TrackDrivar';
import SwpingPayments from '../../CompanyScreens/CompanyBookingFlow/SwipPayment';
import Schedulebookingdetails from '../../CompanyScreens/CompanyBookingFlow/ScheduleBookingdetailsPage';
import Completebookingdetails from '../../CompanyScreens/CompanyBookingFlow/CompleteViewDetails';
import Canceledbookingdetails from '../../CompanyScreens/CompanyBookingFlow/CanceledDetailsPage';


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
