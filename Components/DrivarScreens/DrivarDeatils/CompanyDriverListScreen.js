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

const App = ({navigation}) => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B5CF6" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🚗</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Hi, Welcome</Text>
            <Text style={styles.userText}>Akash Ambulance</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Driver List Title */}
      <Text style={styles.pageTitle}>Driver List</Text>

      {/* Driver List */}
     <ScrollView
  style={styles.scrollView}
  contentContainerStyle={{ paddingBottom:100}} 
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

      {/* Add New Driver Button */}
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  userText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    fontSize: 16,
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
    paddingHorizontal: 20,
  },
  driverCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    backgroundColor: '#E5E7EB', // Placeholder background
  },
  driverInfo: {
    flex: 1,
  },
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
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
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