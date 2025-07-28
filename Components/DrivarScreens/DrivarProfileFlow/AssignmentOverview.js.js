// src/Screens/AssignmentOverviewScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,Image,Dimensions
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../../Fonts/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../Assets/logos.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const AssignmentOverviewScreen = ({ navigation }) => {
  const assignmentData = [
    {
      id: 1,
      type: 'Advanced Life Support',
      category: 'Small ( Omni, etc )',
      ambulanceId: 'AMB01',
      vehicleNo: 'TN0502541',
      date: '05/04/2025',
      time: '10:00 AM',
      totalRide: 22,
    },
    {
      id: 2,
      type: 'Advanced Life Support',
      category: 'Small ( Omni, etc )',
      ambulanceId: 'AMB02',
      vehicleNo: 'TN0502542',
      date: '05/04/2025',
      time: '11:30 AM',
      totalRide: 18,
    },
    {
      id: 3,
      type: 'Basic Life Support',
      category: 'Medium ( Tempo, etc )',
      ambulanceId: 'AMB03',
      vehicleNo: 'TN0502543',
      date: '05/04/2025',
      time: '09:15 AM',
      totalRide: 35,
    },
    {
      id: 4,
      type: 'Advanced Life Support',
      category: 'Large ( Van, etc )',
      ambulanceId: 'AMB04',
      vehicleNo: 'TN0502544',
      date: '05/04/2025',
      time: '02:45 PM',
      totalRide: 12,
    },
    {
      id: 5,
      type: 'Critical Care Transport',
      category: 'Small ( Omni, etc )',
      ambulanceId: 'AMB05',
      vehicleNo: 'TN0502545',
      date: '06/04/2025',
      time: '08:30 AM',
      totalRide: 28,
    },
    {
      id: 6,
      type: 'Basic Life Support',
      category: 'Medium ( Tempo, etc )',
      ambulanceId: 'AMB06',
      vehicleNo: 'TN0502546',
      date: '06/04/2025',
      time: '01:20 PM',
      totalRide: 19,
    },
    {
      id: 7,
      type: 'Advanced Life Support',
      category: 'Small ( Omni, etc )',
      ambulanceId: 'AMB07',
      vehicleNo: 'TN0502547',
      date: '06/04/2025',
      time: '04:10 PM',
      totalRide: 31,
    },
    {
      id: 8,
      type: 'Emergency Response',
      category: 'Large ( Van, etc )',
      ambulanceId: 'AMB08',
      vehicleNo: 'TN0502548',
      date: '07/04/2025',
      time: '07:45 AM',
      totalRide: 24,
    },
    {
      id: 9,
      type: 'Critical Care Transport',
      category: 'Medium ( Tempo, etc )',
      ambulanceId: 'AMB09',
      vehicleNo: 'TN0502549',
      date: '07/04/2025',
      time: '12:00 PM',
      totalRide: 16,
    },
    {
      id: 10,
      type: 'Advanced Life Support',
      category: 'Small ( Omni, etc )',
      ambulanceId: 'AMB10',
      vehicleNo: 'TN0502550',
      date: '07/04/2025',
      time: '05:30 PM',
      totalRide: 27,
    },
  ];

  const renderAssignmentCard = (assignment) => (
    <TouchableOpacity key={assignment.id} style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.ambulanceIconContainer}>
           <View style={styles.ambulanceIcon}>
  <Image source={require('../../Assets/ambualnce.png')} style={styles.ambulanceImage} resizeMode="contain" />
</View>

          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.assignmentType}>{assignment.type}</Text>
            <Text style={styles.categoryText}>{assignment.category}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Ambulance ID No: <Text style={styles.detailValue}>{assignment.ambulanceId}</Text>
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Vehicle No: <Text style={styles.detailValue}>{assignment.vehicleNo}</Text>
            </Text>
          </View>

          <View style={styles.dateTimeRow}>
            <View style={styles.dateContainer}>
              <Text style={styles.detailLabel}>Date: </Text>
              <Text style={styles.detailValue}>{assignment.date}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.detailLabel}>Time: </Text>
              <Text style={styles.detailValue}>{assignment.time}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Total Ride: <Text style={styles.detailValue}>{assignment.totalRide}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FF" />

  <LinearGradient
          colors={['#ffffff', '#C3DFFF']}
          start={{ x: -0, y: 0.3 }}
          end={{ x: 0, y: 0 }}
          style={styles.topBackground}
        >

           <View style={styles.header}>
                                           <Image source={logo} style={styles.logo} />
                                           <View style={styles.greetingContainer}>
                                             <Text style={styles.greeting}>Hi, Welcome</Text>
                                             <Text style={styles.userName}>Janmani Kumar</Text>
                                           </View>
                                           <TouchableOpacity
                                             style={[styles.notificationButton, { right: hp('2%') }]}
                                           >
                                             <Icon name="notifications-on" size={24} color="black" />
                                           </TouchableOpacity>
                                           <TouchableOpacity
                                             style={[styles.notificationButton, { backgroundColor: 'red' }]}
                                           >
                                             <MaterialCommunityIcons
                                               name="alarm-light-outline"
                                               size={24}
                                               color="white"
                                             />
                                           </TouchableOpacity>
                                         </View>

                                            <View style={styles.header1}>
                                                   <TouchableOpacity
                                                     style={styles.backButton}
                                                     onPress={() => navigation.goBack()}
                                                   >
                                                     <Icon name="arrow-back" size={24} color="#8B5CF6" />
                                                   </TouchableOpacity>
                                                   <Text style={styles.headerTitle}>Assignment Overview</Text>
                                                 </View>
  
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}   contentContainerStyle={{ paddingBottom: 100 }} >
        <View style={styles.cardsContainer}>
          {assignmentData.map((assignment) => renderAssignmentCard(assignment))}
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
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ambulanceIconContainer: {
    marginRight: 12,
  },
  ambulanceIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ambulanceEmoji: {
    fontSize: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  assignmentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: Fonts?.family?.semiBold || 'System',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: Fonts?.family?.medium || 'System',
  },
  ambulanceImage: {
  width: 70,
  height: 70,
},
  topBackground: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: wp('10%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  greeting: {
     fontSize:  Fonts.size.TopHeading,
    color: 'black',
    opacity: 0.9,
     fontFamily:Fonts.family.regular
  },
  userName: {
  fontSize:  Fonts.size.TopSubheading,
    fontWeight: 'bold',
    color: 'black',
     fontFamily:Fonts.family.regular
  },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical:'10%'
  },
  backButton: {
    marginRight: width * 0.04,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#8B5CF6',
    flex: 1,
    alignSelf: 'center',
  },
});

export default AssignmentOverviewScreen;
