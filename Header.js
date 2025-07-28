import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({ username = 'Akash Ambulance', onNotificationPress, onWalletPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo & Welcome Message */}
      <View style={styles.leftSection}>
        <Image
          source={require('./Components/Assets/logos.png')}
          style={styles.logo}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.welcomeText}>Hi, Welcome</Text>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
      </View>

      {/* Notification and Wallet Icons */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onWalletPress}>
          <MaterialCommunityIcons name="wallet-outline" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 30, 
   
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 14,
    color: '#444',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rightSection: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
});

export default CustomHeader;
