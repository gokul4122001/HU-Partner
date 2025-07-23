import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const drivers = [
  {
    name: 'Selva Kumar',
    id: 'AK0215',
    bookings: 154,
    earnings: '25k',
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Ravi Raj',
    id: 'AK0216',
    bookings: 120,
    earnings: '21k',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    name: 'Kiran Kumar',
    id: 'AK0217',
    bookings: 135,
    earnings: '23k',
    rating: 4.7,
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
  },
];

const HomeScreen = () => {
  return (
 <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 100 }} 
>
      <ImageBackground
        source={{ uri: 'https://i.imgur.com/E1XK1Rk.jpg' }}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.welcome}>Hi, Welcome</Text>
          <Text style={styles.name}>Akash Ambulance</Text>
        </View>
        <View style={styles.earningsContainer}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsValue}>₹ 1,800.00</Text>
        </View>
      </ImageBackground>

      <View style={styles.searchBar}>
        <Icon name="search" size={22} color="#888" />
        <TextInput placeholder="Search for your service" style={styles.input} />
      </View>

      <Text style={styles.sectionTitle}>Top Performance Driver</Text>

      <Swiper
        style={styles.swiper}
        height={330}
        showsPagination
        dotColor="#ccc"
        activeDotColor="#7416B2"
        paginationStyle={{ bottom: 290 }}
      >
        {drivers.map((driver, index) => (
          <View key={index} style={styles.swipeSlide}>
            <View style={styles.card}>
              <Image source={{ uri: driver.image }} style={styles.avatar} />
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverId}>ID no : {driver.id}</Text>

              <View style={styles.statsContainer}>
                <View style={[styles.statBox, { backgroundColor: '#F6E6F9' }]}>
                  <Text style={styles.statLabel}>Total Booking</Text>
                  <Text style={styles.statValue}>{driver.bookings}</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: '#FFE8D9' }]}>
                  <Text style={styles.statLabel}>Total Earnings</Text>
                  <Text style={styles.statValue}>{driver.earnings}</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: '#E0F7F2' }]}>
                  <Text style={styles.statLabel}>Patients Rating</Text>
                  <Text style={styles.statValue}>⭐ {driver.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Swiper>

      <View style={styles.bottomBox}>
        <Text style={styles.bottomText}>
          Please add ambulance vehicles and drivers first, as this is required to view the status of the vendor application.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.bottomButton, { backgroundColor: '#7416B2' }]}>
            <Text style={styles.buttonText}>Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomButton, { backgroundColor: '#7416B2' }]}>
            <Text style={styles.buttonText}>Ambulance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: { marginBottom: 10 },
  welcome: { color: '#fff', fontSize: 14 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  earningsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  earningsLabel: { color: '#555', fontSize: 14 },
  earningsValue: { color: '#7416B2', fontSize: 26, fontWeight: 'bold' },

  searchBar: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  input: { marginLeft: 10, flex: 1 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 25,
  },

  swiper: {
    marginTop: 20,
  },
  swipeSlide: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  driverName: { fontSize: 16, fontWeight: 'bold' },
  driverId: { fontSize: 13, color: '#777', marginBottom: 10 },

  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  statBox: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statLabel: { fontSize: 12, color: '#333' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#222' },

  bottomBox: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    elevation: 2,
    top: 20,
  },
  bottomText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  bottomButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen;
