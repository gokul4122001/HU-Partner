import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Colors/Colors';
import Icons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../Fonts/Fonts';
import CustomHeader from '../../../Header';

const BookingDetailsScreen = ({ navigation }) => {
  const [newDropLocation, setNewDropLocation] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        {/* Custom Header */}
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification pressed')}
          onWalletPress={() => console.log('Wallet pressed')}
        />

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.sectionTitles}>Booking Details</Text>
          </View>
          <TouchableOpacity style={styles.changeLocationBtn}>
            <Text style={styles.changeLocationText}>Canceled</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Driver Card */}
          <View style={styles.driverCard}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
              style={styles.driverImage}
            />
            <View style={styles.driverInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.driverName}>Dinesh Kumar</Text>
                <Icon name="star" size={16} color="#FFD700" style={{ marginHorizontal: 4 }} />
                <Text style={styles.rating}>4.3</Text>
                <Text style={styles.rating1}>By User</Text>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.vehicleBox}>
                  <Text style={styles.vehicleText}>ID no: 1234567</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Ambulance Card */}
          <View style={styles.driverCard}>
            <Image source={require('../../Assets/ambualnce.png')} style={styles.driverImage} />
            <View style={styles.driverInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.driverName}>Patient Transfer</Text>
                <MaterialCommunityIcons name="ambulance" size={18} color="#7B2CBF" style={{ marginHorizontal: 4 }} />
                <Text style={styles.rating}>Small (Omni, etc)</Text>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.vehicleBox}>
                  <Text style={styles.vehicleText}>AM012D2313</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Pickup & Drop */}
          <View style={styles.section}>
            <View style={styles.locationRow}>
              <MaterialIcons name="circle" size={10} color="#FF0000" />
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationValue}>
                NO 3/1, I Street west mambalam chennai -33
              </Text>
            </View>
            <View style={styles.locationRow}>
              <MaterialIcons name="circle" size={10} color="#8E44AD" />
              <Text style={styles.locationLabel}>Drop</Text>
              <Text style={styles.locationValue}>
                NO 3/1, I Street vyasarpadi chennai -33
              </Text>
            </View>
            {newDropLocation !== '' && (
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <Text style={{ color: '#555' }}>Drop (Change By Driver):</Text>
                <Text style={{ fontWeight: '600' }}>{newDropLocation}</Text>
              </View>
            )}
          </View>

          {/* Booking Date & Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Date & Time</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Booking Date</Text>
              <Text style={styles.value}>21 / 03 / 2025</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Booking Time</Text>
              <Text style={styles.value}>05 : 30 PM</Text>
            </View>
          </View>

          {/* Customer Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <Text style={styles.value}>Name : Jeswanth Kumar</Text>
            <Text style={styles.value}>Mobile Number : 9345665447</Text>
          </View>

          {/* Assistance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assistance for the Patient</Text>
            <View style={styles.infoRow}>
              <Text style={styles.value}>First Floor</Text>
              <Text style={styles.value}>₹ 350</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ambulance Cost</Text>
              <Text style={styles.value}>₹ 1,500</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Assistance for the Patient</Text>
              <Text style={styles.value}>₹ 350</Text>
            </View>
            <View style={[styles.infoRow, { borderTopWidth: 1, borderColor: '#eee', paddingTop: 10 }]}>
              <Text style={[styles.label, { fontSize: Fonts.size.PageHeading }]}>Total Price</Text>
              <Text style={[styles.value, { fontSize: Fonts.size.PageHeading, color: '#7B2CBF' }]}>
                ₹ 1,850
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginTop: 20,
    borderRadius: 12,
    elevation: 2,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: Fonts.size.PageHeading,
    color: '#333',
  },
  rating: {
    fontSize: Fonts.size.PageHeading,
    color: '#333',
    fontWeight: '600',
  },
  rating1: {
    fontSize: Fonts.size.PageHeading,
    color: '#7518AA',
    fontWeight: '600',
    position: 'absolute',
    right: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#D6B5FF',
    borderColor: '#D6B5FF',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleBox: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#999',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vehicleText: {
    fontSize: Fonts.size.PageHeading,
    color: '#333',
  },
  topBackground: {
  
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    top: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitles: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#000',
  },
  changeLocationBtn: {
    borderWidth: 1,
    borderColor: '#7B2CBF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeLocationText: {
    color: '#7B2CBF',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: Fonts.size.PageHeading,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationLabel: {
    fontWeight: 'bold',
    marginHorizontal: 8,
    fontSize: Fonts.size.PageHeading,
  },
  locationValue: {
    color: '#333',
    flex: 1,
    fontSize: Fonts.size.PageHeading,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontSize: Fonts.size.PageHeading,
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: Fonts.size.PageHeading,
  },
});

export default BookingDetailsScreen;
