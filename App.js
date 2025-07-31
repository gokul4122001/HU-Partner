import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabs from './Components/Navigations/BottomNavigationScreen';
import Login1 from './Components/LoginScreens/HomeScreenLogin';
import LoginAccoundScreen from './Components/LoginScreens/LoginAccoundScreen.js';
import Services from './Components/LoginScreens/CategoryServicesScreen.js';
import Servicesform from './Components/LoginScreens/ServicesFormScreen.js';
import Login8 from './Components/LoginScreens/Conguratulation.js';
import ForgetPassword from './Components/LoginScreens/ForgetPassWord.js';

import WelcomeSwipe from './Components/LoginScreens/WelcomeSwipeScreen.js';
import Header from './Header.js';
import { Provider } from 'react-redux';
import store from './Components/redux/store';

const Stack = createNativeStackNavigator();
//hi
export default function App() {
  return (
       <SafeAreaProvider>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login1"
          screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Header" component={Header} />
          <Stack.Screen name="MainApp" component={BottomTabs} />
          <Stack.Screen name="Login1" component={Login1} />
              <Stack.Screen name="Services" component={Services} />
           <Stack.Screen name="Servicesform" component={Servicesform} />
          <Stack.Screen name="LoginAccoundScreen" component={LoginAccoundScreen} />
                    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Login8" component={Login8} />
          <Stack.Screen name="WelcomeSwipe" component={WelcomeSwipe} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </SafeAreaProvider>
  );
}