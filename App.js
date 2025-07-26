import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import BottomTabs from './Components/Navigations/BottomNavigationScreen';
import Login1 from './Components/Screens/CompanyLoginFlow/HomeScreenLogin.js';
import Login2 from './Components/Screens/CompanyLoginFlow/SecondScreenLoginPage.js';
import Login3 from './Components/Screens/CompanyLoginFlow/ThirdScreenLoginPage.js';
import Login4 from './Components/Screens/CompanyLoginFlow/FourthScreenLoginPage.js';
import Login5 from './Components/Screens/CompanyLoginFlow/FifthScreenLoginPage.js';
import Login6 from './Components/Screens/CompanyLoginFlow/LoginAccoundScreen.js';
import Services from './Components/Screens/CompanyLoginFlow/CategoryServicesScreen.js';
import Servicesform from './Components/Screens/CompanyLoginFlow/ServicesFormScreen.js';
import Login7 from './Components/Screens/CompanyLoginFlow/LoginOtpScreen.js';
import Login8 from './Components/Screens/CompanyLoginFlow/Conguratulation.js';
import ForgetPassword from './Components/Screens/CompanyLoginFlow/ForgetPassWord.js';

import WelcomeSwipe from './Components/Screens/CompanyLoginFlow/WelcomeSwipeScreen.js';

import { Provider } from 'react-redux';
import store from './Components/redux/store';

const Stack = createNativeStackNavigator();
//hi
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainApp"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="MainApp" component={BottomTabs} />
          <Stack.Screen name="Login1" component={Login1} />
          <Stack.Screen name="Login2" component={Login2} />
          <Stack.Screen name="Login3" component={Login3} />
          <Stack.Screen name="Login4" component={Login4} />
          <Stack.Screen name="Login5" component={Login5} />
          <Stack.Screen name="Login6" component={Login6} />
          <Stack.Screen name="Login7" component={Login7} />
          <Stack.Screen name="Login8" component={Login8} />
          <Stack.Screen name="Services" component={Services} />
          <Stack.Screen name="Servicesform" component={Servicesform} />
          <Stack.Screen name="WelcomeSwipe" component={WelcomeSwipe} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
