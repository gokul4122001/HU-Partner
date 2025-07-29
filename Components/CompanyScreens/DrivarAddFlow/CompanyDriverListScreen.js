import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomHeader from '../../../Header'; 

const App = ({ navigation }) => {
  const drivers = [
    {
      id: 'AK0215',
      name: 'Selva Kumar',
      contact: '9345665447',
      email: 'selvakumar@gmail.com',
      gender: 'Male',
      dateOfBirth: '03/06/2002',
      age: 22,
      status: 'ON DUTY',
      avatar: require('../../Assets/profile.png'),
    },
    {
      id: 'AK0216',
      name: 'Raj Kumar',
      contact: '9345123456',
      email: 'rajkumar@gmail.com',
      gender: 'Male',
      dateOfBirth: '01/01/2000',
      age: 24,
      status: 'ON DUTY',
      avatar: require('../../Assets/profile.png'),
    },
  ];

  const DriverCard = ({ driver }) => (
    <View style={styles.driverCard}>
      <View style={styles.driverHeader}>
        <Image source={driver.avatar} style={styles.avatar} />
        <View style={styles.driverInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{driver.status}</Text>
            </View>
          </View>
          <Text style={styles.driverId}>ID no : {driver.id}</Text>
        </View>
      </View>

      <View style={styles.driverDetails}>
        <Text style={styles.detailText}>Contact No : {driver.contact}</Text>
        <Text style={styles.detailText}>Email ID : {driver.email}</Text>
        <Text style={styles.detailText}>Gender : {driver.gender}</Text>
        <View style={styles.dobAgeRow}>
          <Text style={styles.detailText}>Date of Birth : {driver.dateOfBirth}</Text>
          <Text style={styles.ageText}>Age : {driver.age}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#8B5CF6" barStyle="dark-content" />

        <CustomHeader
          username="Akash Ambulance"
          onNotificationPress={() => console.log('Notification Pressed')}
          onWalletPress={() => console.log('Wallet Pressed')}
        />

        <Text style={styles.pageTitle}>Driver List</Text>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {drivers.map((driver, index) => (
            <DriverCard key={index} driver={driver} />
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('ServiceHospitalScreen')}
          >
            <Text style={styles.addButtonIcon}>➕</Text>
            <Text style={styles.addButtonText}>Add New Driver</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topBackground: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollView: {
    flex: 1,
  },
  driverCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  driverHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#E5E7EB',
  },
  driverInfo: { flex: 1 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: '#10B981',
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: 'bold',
  },
  driverId: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  driverDetails: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  dobAgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageText: {
    fontSize: 14,
    color: '#374151',
  },
  viewDetailsButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonIcon: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
