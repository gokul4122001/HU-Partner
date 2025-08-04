import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../../Header'; // adjust path if needed
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../Fonts/Fonts';
import { Ambulance_List } from '../../APICall/CompanyLogin/ServiceFormApi';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const AmbulanceList = ({ navigation }) => {
  const { token } = useSelector(state => state.auth);
  const [ambulanceData, setAmbulanceData] = useState([]);
  console.log(ambulanceData, 'ambulanceData');

  // const ambulanceData = [
  //   {
  //     id: 'AMB01',
  //     vehicleNo: 'TN50ZX541',
  //     registrationNo: 'ADSV234540',
  //     regDateTime: '07/04/2025 & 05:10 PM',
  //   },
  //   {
  //     id: 'AMB02',
  //     vehicleNo: 'TN22ZX789',
  //     registrationNo: 'QWER567890',
  //     regDateTime: '08/04/2025 & 10:15 AM',
  //   },
  //   {
  //     id: 'AMB03',
  //     vehicleNo: 'TN33ZX123',
  //     registrationNo: 'ZXCV098765',
  //     regDateTime: '09/04/2025 & 12:45 PM',
  //   },
  // ];

  const fetchData = useCallback(async () => {
    try {
      const res = await Ambulance_List(token);
      setAmbulanceData(res?.data || []);
    } catch (error) {
      console.error('Failed to fetch ambulance list:', error);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const formatDate = isoDate => {
    const date = new Date(isoDate);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-US', options);
  };

  const AmbulanceCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.ambulanceIcon}>
          <Image
            source={require('../../Assets/ambualnce.png')}
            style={styles.ambulanceIcon}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.serviceType}>Advanced Life Support</Text>
          <Text style={styles.serviceSize}>Small (Omni, etc)</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ambulance ID No :</Text>
          <Text style={styles.detailValue}>{item.amb_id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vehicle No :</Text>
          <Text style={styles.detailValue}>{item.amb_number_plate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Registration Number :</Text>
          <Text style={styles.detailValue}>{item.registration_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reg Date & Time :</Text>
          <Text style={styles.detailValue}>
            {item.created_at && formatDate(item.created_at)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => navigation.navigate('Company3',{item:item})}
      >
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
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        {/* Custom Header */}
        <CustomHeader
          username="Akash Ambulance"
          onNotificationPress={() => console.log('Notifications Pressed')}
          onWalletPress={() => console.log('Wallet Pressed')}
        />

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Ambulance List</Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          {ambulanceData.map((item, index) => (
            <AmbulanceCard key={index} item={item} />
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Company2')}
          >
            <Icon name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Add New Ambulance</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    alignItems: 'center',
  },
  pageTitle: {
    color: '#7416B2',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ambulanceIcon: {
    width: 70,
    height: 70,

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  ambulanceEmoji: {
    fontSize: 20,
  },
  headerText: {
    flex: 1,
  },
  serviceType: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  serviceSize: {
    fontSize: Fonts.size.PageHeading,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: Fonts.size.PageHeading,
    color: '#000000',
    flex: 1,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: Fonts.size.PageHeading,
    color: '#454242',

    flex: 1,
  },
  viewDetailsButton: {
    backgroundColor: '#7518AA',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#7518AA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 80,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AmbulanceList;
