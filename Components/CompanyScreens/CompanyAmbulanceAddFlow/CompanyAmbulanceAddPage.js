import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../../Header'; // adjust path if needed
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AmbulanceList = ({ navigation }) => {
  const ambulanceData = [
    {
      id: 'AMB01',
      vehicleNo: 'TN50ZX541',
      registrationNo: 'ADSV234540',
      regDateTime: '07/04/2025 ● 05:10 PM',
    },
    {
      id: 'AMB02',
      vehicleNo: 'TN22ZX789',
      registrationNo: 'QWER567890',
      regDateTime: '08/04/2025 ● 10:15 AM',
    },
    {
      id: 'AMB03',
      vehicleNo: 'TN33ZX123',
      registrationNo: 'ZXCV098765',
      regDateTime: '09/04/2025 ● 12:45 PM',
    },
  ];

  const AmbulanceCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.ambulanceIcon}>
          <Text style={styles.ambulanceEmoji}>🚑</Text>
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
          <Text style={styles.detailValue}>{item.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vehicle No :</Text>
          <Text style={styles.detailValue}>{item.vehicleNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Registration Number :</Text>
          <Text style={styles.detailValue}>{item.registrationNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reg Date & Time :</Text>
          <Text style={styles.detailValue}>{item.regDateTime}</Text>
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
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

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
          contentContainerStyle={{ paddingBottom: 20 }}
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
    paddingTop: hp('4%'),
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
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ambulanceEmoji: {
    fontSize: 20,
  },
  headerText: {
    flex: 1,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  serviceSize: {
    fontSize: 14,
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
    fontSize: 14,
    color: '#666',
    flex: 1,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  viewDetailsButton: {
    backgroundColor: '#7B3F98',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#7B3F98',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 10,
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
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AmbulanceList;
