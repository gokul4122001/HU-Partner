import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../Header'; // Adjust path as needed

const { width } = Dimensions.get('window');

const AmbulanceDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Driver');
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);

  const topDrivers = [
    {
      id: 1,
      name: 'Selva Kumar',
      driverId: 'AK0215',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      totalBooking: '154',
      totalEarnings: '25k',
      rating: '4.5'
    },
    {
      id: 2,
      name: 'Raj Patel',
      driverId: 'AK0216',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      totalBooking: '142',
      totalEarnings: '23k',
      rating: '4.3'
    },
    {
      id: 3,
      name: 'Kumar Singh',
      driverId: 'AK0217',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      totalBooking: '138',
      totalEarnings: '22k',
      rating: '4.4'
    }
  ];

  const renderDriverCard = ({ item }) => (
    <View style={styles.driverCard}>
      <View style={styles.driverInfo}>
        <Image source={{ uri: item.image }} style={styles.driverImage} />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{item.name}</Text>
          <Text style={styles.driverId}>ID no : {item.driverId}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#e0f2fe' }]}>
          <Text style={[styles.statLabel, { color: '#0284c7' }]}>Total Booking</Text>
          <Text style={[styles.statValue, { color: '#0284c7' }]}>{item.totalBooking}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fef9c3' }]}>
          <Text style={[styles.statLabel, { color: '#ca8a04' }]}>Total Earnings</Text>
          <Text style={[styles.statValue, { color: '#ca8a04' }]}>{item.totalEarnings}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#ede9fe' }]}>
          <Text style={[styles.statLabel, { color: '#7c3aed' }]}>Patients Rating</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#fbbf24" />
            <Text style={[styles.ratingValue, { color: '#7c3aed' }]}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const onDriverScroll = (event) => {
    const slideSize = width - 32;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentDriverIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8b5cf6" barStyle="light-content" />

      <ImageBackground
        source={require('../../Assets/bg1.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <CustomHeader
          username="Akash Ambulance"
          onNotificationPress={() => console.log('Notification pressed')}
          onWalletPress={() => console.log('Wallet pressed')}
        />

        <View style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>Total Earnings</Text>
          <Text style={styles.earningsAmount}>₹ 1,800.00</Text>
        </View>
      </ImageBackground>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for your service"
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Top Performance Driver</Text>
          <FlatList
            data={topDrivers}
            renderItem={renderDriverCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onDriverScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.driverCarousel}
          />
          <View style={styles.paginationDots}>
            {topDrivers.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentDriverIndex ? styles.activeDot : styles.inactiveDot]}
              />
            ))}
          </View>
        </View>

        <View style={styles.ambulanceDriverCard}>
          <Text style={styles.cardTitle}>Ambulance & Driver</Text>
          <Text style={styles.cardSubtitle}>Add ambulance vehicles and drivers first to view the application status.</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.driverButton} onPress={() => setSelectedTab('Driver')}>
              <MaterialIcons name="person" size={24} color="#fff" />
              <Text style={styles.buttonText}>Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ambulanceButton} onPress={() => setSelectedTab('Ambulance')}>
              <MaterialCommunityIcons name="ambulance" size={24} color="#fff" />
              <Text style={styles.buttonText}>Ambulance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBackground: {
    paddingBottom: 20,
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  header: { paddingTop: 44, paddingHorizontal: 16 },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: { flexDirection: 'row', alignItems: 'center' },
  logoContainer: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  hiText: { fontSize: 14, color: '#e5e7eb', marginBottom: 2 },
  companyText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 16 },
  earningsCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
  },
  earningsTitle: { fontSize: 16, color: '#000000', marginBottom: 8 },
  earningsAmount: { fontSize: 32, fontWeight: 'bold', color: '#7518AA' },
  content: { flex: 1, paddingHorizontal: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#374151' },
  performanceSection: { marginTop: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  driverCarousel: { paddingLeft: 10 },
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: wp('80%'),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  driverInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  driverImage: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  driverName: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  driverId: { fontSize: 14, color: '#6b7280' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statLabel: { fontSize: 13, marginBottom: 4, textAlign: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingValue: { fontSize: 20, fontWeight: 'bold', marginLeft: 4 },
  paginationDots: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  activeDot: { backgroundColor: '#8b5cf6' },
  inactiveDot: { backgroundColor: '#d1d5db' },
  ambulanceDriverCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  cardSubtitle: { fontSize: 13, color: '#6b7280', marginBottom: 16 },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  driverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 0.48,
  },
  ambulanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9333ea',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 0.48,
  },
  buttonText: { color: '#fff', marginLeft: 8, fontWeight: '600', fontSize: 15 },
});

export default AmbulanceDashboard;
