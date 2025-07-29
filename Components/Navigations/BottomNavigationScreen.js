import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

// ✅ Company Flow
import CompanyHomeStackScreen from '../../Components/Navigations/CompanyStackNavigation/CompanyHomeStackNavigationScreen';
import AmbulanceAddStackScreen from '../../Components/Navigations/CompanyStackNavigation/CompanyAmbulanceAddstackScreen';
import ProfileStackScreen from '../../Components/Navigations/CompanyStackNavigation/ProfileStackNavigationScreen';
import DrivarAddStackScreen from '../../Components/Navigations/CompanyStackNavigation/CompanyDrivarAddStackScreen';
import BoookingStackScreen from '../../Components/Navigations/CompanyStackNavigation/CompanyBookingstackNavigation';

// ✅ Drivar Flow
import DrivarHomeScreen from './DrivarStackNavigations/DrivarNavigation/DrivarCompanyHomeStackNavigationScreen';
import DrivarBookingScreen from './DrivarStackNavigations/DrivarNavigation/DrivarBookingstackNavigation';
import DrivarAmbulance from './DrivarStackNavigations/DrivarNavigation/DrivarAmbulanceDetailsstackScreen';
import DrivarDetails from './DrivarStackNavigations/DrivarNavigation/DrivarDetailsStackScreen';
import DrivarProfile from './DrivarStackNavigations/DrivarNavigation/DrivarProfileStackNavigationScreen';

const Tab = createBottomTabNavigator();

// ✅ Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const iconMap = {
    Home: 'home',
    Booking: 'calendar',
    Ambulance: 'truck',
    Drivar: 'users',
    Profile: 'user',
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.button, isFocused && styles.activeButton]}
          >
            <View style={styles.tabContent}>
              <Icon
                name={iconMap[route.name]}
                size={20}
                color={isFocused ? '#000' : '#888'}
              />
              {isFocused && <Text style={styles.label}>{route.name}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ✅ Main Bottom Tabs Navigator
const BottomTabs = () => {
  const user_type = useSelector(state => state.auth.user_type);
  const company = user_type === 'company';

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => !keyboardVisible && <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={company ? CompanyHomeStackScreen : DrivarHomeScreen}
      />
      <Tab.Screen
        name="Booking"
        component={company ? BoookingStackScreen : DrivarBookingScreen}
      />
      <Tab.Screen
        name="Ambulance"
        component={company ? AmbulanceAddStackScreen : DrivarAmbulance}
      />
      <Tab.Screen
        name="Drivar"
        component={company ? DrivarAddStackScreen : DrivarDetails}
      />
      <Tab.Screen
        name="Profile"
        component={company ? ProfileStackScreen : DrivarProfile}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

// ✅ Styles
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },
  activeButton: {
    backgroundColor: '#eee',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 6,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});

