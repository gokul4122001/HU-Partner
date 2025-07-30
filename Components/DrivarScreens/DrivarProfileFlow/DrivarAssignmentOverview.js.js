import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../../Fonts/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../DrivarHeader';

const { width, height } = Dimensions.get('window');

const AssignmentOverviewScreen = ({ navigation }) => {
  const assignmentData = [
    {
      id: '1',
      type: 'Emergency Transfer',
      category: 'small (Omni,etc)',
      ambulanceId: 'AMB001',
      vehicleNo: 'TN 05 MA 2658',
      date: '2025-07-29',
      time: '10:30 AM',
      totalRide: '12',
    },
    {
      id: '2',
      type: 'Scheduled Pickup',
      category: 'small (Omni,etc)',
      ambulanceId: 'AMB002',
      vehicleNo: 'TN 09 BB 1274',
      date: '2025-07-28',
      time: '2:00 PM',
      totalRide: '8',
    },
    
  ];

  const renderAssignmentCard = (assignment) => (
    <TouchableOpacity key={assignment.id} style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.ambulanceIconContainer}>
            <View style={styles.ambulanceIcon}>
              <Image
                source={require('../../Assets/ambualnce.png')}
                style={styles.ambulanceImage}
                resizeMode="contain"
              />
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
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification pressed')}
          onWalletPress={() => console.log('Wallet pressed')}
        />

        <View style={styles.header1}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Assignment Overview</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
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
    top:'3%'
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 20
    ,
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
  ambulanceImage: {
    width: 90,
    height: 90,
  },
  headerTextContainer: {
    flex: 1,
  },
  assignmentType: {
    fontSize:  Fonts.size.PageSubheading,
    fontWeight: '600',
    color: '#00000',
    marginBottom: 4,
    left:20
  },
  categoryText: {
    fontSize:  Fonts.size.PageSubheading,
    color: '#8B5CF6',
    left:20
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
    fontSize: Fonts.size.PageSubheading,
    color: '#000000',
    fontWeight: '550',
 
  },
  detailValue: {
   fontSize: Fonts.size.PageSubheading,
    fontWeight: '500',
    color: '#454242',
   
  },
  topBackground: {
      paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: '3%',

  },
  backButton: {
    marginRight: width * 0.04,
  },
  headerTitle: {
    fontSize:  Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#7416B2',
    alignSelf: 'center',
  },
});

export default AssignmentOverviewScreen;
