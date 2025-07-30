import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../../Header'; // Adjust this import path
import Fonts from '../../Fonts/Fonts';

const DriverDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{x: 0, y: 0.3}}
      end={{x: 0, y: 0}}
      style={styles.topBackground}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <CustomHeader />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>

          {/* Header with Back Icon */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#6B21A8" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Driver Details</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="edit" size={20} color="#6B21A8" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="delete" size={20} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summaryContainer}>
            <View style={[styles.summaryBox, {backgroundColor: '#FEF3C7'}]}>
              <Text style={styles.summaryTitle}>Earnings</Text>
              <Text style={[styles.summaryValue, {color: '#F59E0B'}]}>20K</Text>
            </View>
            <View style={[styles.summaryBox, {backgroundColor: '#DBEAFE'}]}>
              <Text style={styles.summaryTitle}>Completed</Text>
              <Text style={[styles.summaryValue, {color: '#3B82F6'}]}>150</Text>
            </View>
            <View style={[styles.summaryBox, {backgroundColor: '#FEE2E2'}]}>
              <Text style={styles.summaryTitle}>Rejected</Text>
              <Text style={[styles.summaryValue, {color: '#EF4444'}]}>50</Text>
            </View>
          </View>

          {/* Card 1 - Basic Info */}
          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <Image
                source={require('../../Assets/profile.png')}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.name}>Selva Kumar</Text>
                <Text style={styles.id}>ID no : AK0215</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>🟢 ON DUTY</Text>
              </View>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Contact No: </Text>
              <Text style={styles.value}>12345654347</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Email ID: </Text>
              <Text style={styles.value}>Selvakumar@gmail.com</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Gender: </Text>
              <Text style={styles.value}>Male</Text>
            </View>
            <View style={styles.inlineRow}>
              <View style={styles.labelValueGroup}>
                <Text style={styles.label}>Date of Birth: </Text>
                <Text style={styles.value}>03/06/2002</Text>
              </View>
              <View style={styles.labelValueGroup}>
                <Text style={styles.label}>Age: </Text>
                <Text style={styles.value}>22</Text>
              </View>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Address: </Text>
              <Text style={styles.value}>
                No 32/1, Samiyar Thottam, Vyasarpadi, Chennai - 39
              </Text>
            </View>
          </View>

          {/* Card 2 - Driver License */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Driver License</Text>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Driver Type: </Text>
              <Text style={styles.value}>FullTime</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>License Number: </Text>
              <Text style={styles.value}>MH12 2010149131</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>License Type: </Text>
              <Text style={styles.value}>
                International Driving Permit (IDP)
              </Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>License Validity: </Text>
              <Text style={styles.value}>08/04/2030</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Issued State: </Text>
              <Text style={styles.value}>454642</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Years of Experience: </Text>
              <Text style={styles.value}>20 years</Text>
            </View>
          </View>

          {/* Card 3 - Account Credential */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account Credential</Text>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>E-mail ID: </Text>
              <Text style={styles.value}>Selvakumar@gmail.com</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Password: </Text>
              <Text style={styles.value}>selva201</Text>
            </View>
            <View style={styles.inlineRow}>
              <Text style={styles.label}>Confirm Password: </Text>
              <Text style={styles.value}>selva201</Text>
            </View>
          </View>

          {/* Card 4 - Documents */}
          <View style={styles.card}>
            <View style={styles.docRow}>
              {['Driver License', 'ID Proof', 'Medical Fitness', 'Profile Image'].map(
                (item, index) => (
                  <View key={index} style={styles.docCard}>
                    <Icon name="picture-as-pdf" size={30} color="#8B5CF6" />
                    <Text style={styles.docTitle}>{item}</Text>
                    <Text style={styles.docSubtitle}>Document name</Text>
                  </View>
                )
              )}
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.footerButton1}   onPress={() => navigation.navigate('FormPage')}>
              <Text style={styles.footerButtonText1}>View Ambulance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}   onPress={() => navigation.navigate('TrackAmbulance')}>
              <Text style={styles.footerButtonText}>Track Driver</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default DriverDetailsScreen;

const styles = StyleSheet.create({
  topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    paddingBottom: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },
  headerText: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '700',
    color: '#111827',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  editText: {
    marginLeft: 4,
    color: '#6B21A8',
    fontWeight: '600',
    fontSize: Fonts.size.PageSubheading,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: Fonts.size.PageSubheading,
    fontWeight: '600',
    color: '#000000',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    elevation: 3,
  },
  cardTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  },
  id: {
    fontSize: Fonts.size.PageHeading,
    color: '#6B7280',
  },
  statusBadge: {
    marginLeft: 'auto',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#22C55E',
    fontWeight: '600',
    fontSize: Fonts.size.PageSubheading,
  },
  inlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    fontSize: Fonts.size.PageHeading,
  },
  value: {
    color: '#4B5563',
    fontSize: Fonts.size.PageHeading,
  },
  labelValueGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp('5%'),
  },
  docRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  docCard: {
    width: '47%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  docTitle: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: Fonts.size.PageHeading,
    textAlign: 'center',
  },
  docSubtitle: {
    fontSize: Fonts.size.PageSubheading,
    color: '#6B7280',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '700',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 5,
    marginLeft: 8,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  footerButton: {
    backgroundColor: '#6B21A8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: Fonts.size.PageHeading,
  },
   footerButton1: {
    backgroundColor: '#DBDBDB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  footerButtonText1: {
    color: '#4D2161',
    fontWeight: '700',
    fontSize: Fonts.size.PageHeading,
  },

});
