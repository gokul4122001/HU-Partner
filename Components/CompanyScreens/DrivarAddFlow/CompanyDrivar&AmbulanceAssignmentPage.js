import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomHeader from '../../../Header'; 
import Fonts from '../../Fonts/Fonts';

const AmbulanceAssignmentScreen = ({ navigation }) => {
  const assignmentData = [
    {
      id: 1,
      supportType: 'Advanced Life Support',
      size: 'Small ( 6mm, etc )',
      ambulanceId: 'AM501',
      vehicleNo: 'TN65U2541',
      pickup: 'No 3/1, 1 Street west mambalam chennai 33',
      drop: 'No 3/1, 1 Street vyasarpadi chennai 33',
      name: 'Jeevanath Kumar',
      contact: '9344546447',
      date: '05/04/2025',
      time: '10 : 00 AM',
      amount: '₹ 1,800',
    },
    {
      id: 2,
      supportType: 'Advanced Life Support',
      size: 'Small ( 6mm, etc )',
      ambulanceId: 'AM501',
      vehicleNo: 'TN65U2541',
      pickup: 'No 3/1, 1 Street west mambalam chennai 33',
      drop: 'No 3/1, 1 Street vyasarpadi chennai 33',
      name: 'Jeevanath Kumar',
      contact: '9344546447',
      date: '05/04/2025',
      time: '10 : 00 AM',
      amount: '₹ 1,800',
    },
    {
      id: 3,
      supportType: 'Advanced Life Support',
      size: 'Small ( 6mm, etc )',
      ambulanceId: 'AM501',
      vehicleNo: 'TN65U2541',
      pickup: 'No 3/1, 1 Street west mambalam chennai 33',
      drop: 'No 3/1, 1 Street vyasarpadi chennai 33',
      name: 'Jeevanath Kumar',
      contact: '9344546447',
      date: '05/04/2025',
      time: '10 : 00 AM',
      amount: '₹ 1,800',
    },
  ];

  const renderAssignmentCard = (item) => (
    <View key={item.id} style={styles.assignmentCard}>
      <View style={styles.headerRow}>
     <View style={styles.ambulanceIcon}>
  <Image 
    source={require('../../Assets/ambualnce.png')} 
    style={{width: 70, height: 70}}
    resizeMode="contain"
  />
</View>
        <View style={styles.typeInfo}>
          <Text style={styles.supportType}>{item.supportType}</Text>
          <Text style={styles.sizeText}>{item.size}</Text>
        </View>
      </View>

         <View style={styles.divider} />

      <View style={styles.detailsSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ambulance ID No: </Text>
          <Text style={styles.value}>{item.ambulanceId}</Text>
          <Text style={styles.label}>   Vehicle no: </Text>
          <Text style={styles.value}>{item.vehicleNo}</Text>
        </View>

   

        <View style={styles.customerSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.value}>{item.name}</Text>
            <Text style={styles.label}>   Contact: </Text>
            <Text style={styles.value}>{item.contact}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.value}>{item.date}</Text>
            <Text style={styles.label}>   Time: </Text>
            <Text style={styles.value}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>{item.amount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <CustomHeader
        username="Akash Ambulance"
        onNotificationPress={() => console.log('Notification pressed')}
        onWalletPress={() => console.log('Wallet pressed')}
      />

      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Driver & Ambulance Assignment Details</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {assignmentData.map(item => renderAssignmentCard(item))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topBackground: {
    flex: 1,
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
    divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    borderStyle: 'dotted',
    marginVertical: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleText: {
  fontSize: Fonts.size.PageSubheading,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
 assignmentCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  marginBottom: 16,
  padding: 16,

  // iOS Shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,

  // Android Elevation
  elevation: 6,
},

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  ambulanceIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeInfo: {
    flex: 1,
  },
  supportType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  sizeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailsSection: {},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  label: {
   fontSize: Fonts.size.PageSubheading,
    color: '#374151',
    fontWeight: '500',
  },
  value: {
       fontSize: Fonts.size.PageSubheading,
    color: '#1f2937',
    fontWeight: '600',
  },
 
  customerSection: {
    
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#374151',
  },
  totalAmount: {
      fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default AmbulanceAssignmentScreen;
