// BookingDetailsScreen.js

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import CustomHeader from '../../../Header';
import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const windowDimensions = Dimensions.get('window');
const SWIPE_THRESHOLD = windowDimensions.width * 0.3;

const BookingDetailsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [newDropLocation, setNewDropLocation] = useState('');
  const [isSwiped, setIsSwiped] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#000');
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const panX = useRef(new Animated.Value(0)).current;

  const handleLocationChange = () => {
    if (currentLocation.trim()) {
      setNewDropLocation(currentLocation.trim());
    }
    setModalVisible(false);
    setCurrentLocation('');
  };

  const showToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color || '#000');
    setToastVisible(true);

    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setToastVisible(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 100;
      },
      onPanResponderGrant: () => {
        panX.setOffset(panX._value);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0) {
          const maxSwipe = windowDimensions.width * 0.6;
          const clampedValue = Math.min(gestureState.dx, maxSwipe);
          panX.setValue(clampedValue);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panX.flattenOffset();

        if (gestureState.dx > SWIPE_THRESHOLD && gestureState.vx > 0) {
          setIsSwiped(true);

          Animated.timing(panX, {
            toValue: windowDimensions.width * 0.7,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            showToast('Swipe Successful! Navigating...', '#4CAF50');

            setTimeout(() => {
              navigation.navigate('BookingHomeScreen');
              setTimeout(() => {
                panX.setValue(0);
                setIsSwiped(false);
              }, 100);
            }, 500);
          });
        } else {
          Animated.spring(panX, {
            toValue: 0,
            tension: 120,
            friction: 8,
            useNativeDriver: true,
          }).start(() => {
            setIsSwiped(false);
          });
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(panX, {
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          setIsSwiped(false);
        });
      },
    })
  ).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        {toastVisible && (
          <Animated.View
            style={{
              backgroundColor: toastColor,
              transform: [{ translateY: slideAnim }],
              position: 'absolute',
              top: 20,
              left: 20,
              right: 20,
              padding: 15,
              borderRadius: 8,
              zIndex: 1000,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{toastMessage}</Text>
          </Animated.View>
        )}

        {/* Reusable Header */}
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification Pressed')}
          onWalletPress={() => console.log('Wallet Pressed')}
        />


     

        {/* Rest of your component remains the same */}
        <View style={styles.sectionHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.sectionTitles}>Booking Details</Text>
          </View>

          <TouchableOpacity style={styles.changeLocationBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.changeLocationText}>Change Location</Text>
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
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.vehicleBox}>
                  <Text style={styles.vehicleText}>ID no: 1234567</Text>
                </View>
                <TouchableOpacity style={styles.callContainer}>
                  <View style={styles.callIconCircle}>
                    <Icon name="call" size={18} color="#7B2CBF" />
                  </View>
                  <Text style={styles.callText}>Call Customer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Ambulance Card */}
          <View style={styles.driverCard}>
            <Image
              source={require('../../Assets/ambualnce.png')}
              style={styles.driverImage}
            />
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

          {/* Emergency Card */}
          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyTitle}>
              Call customer care incase of emergency
            </Text>
            <Text style={styles.emergencyDescription}>
              For any accident or patient mishandlings, press the call button to
              contact our team.
            </Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Icon name="phone" size={16} color="#4D2161" />
              <Text style={styles.emergencyButtonText}>Emergency</Text>
            </TouchableOpacity>
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

          <View style={styles.vendorButtonContainer}>
            <LinearGradient colors={['#7416B2', '#7416B2']} style={styles.vendorButton}>
              <View style={styles.swipeTrack}>
                <Text style={styles.swipeHintText}>
                  {isSwiped ? '' : ''}
                </Text>
              </View>
              
              <Animated.View
                style={[
                  styles.swipeContainer, 
                  { 
                    transform: [{ translateX: panX }],
                    opacity: isSwiped ? 0.9 : 1,
                  }
                ]}
                {...panResponder.panHandlers}
              >
                <View style={styles.iconCircle}>
                  <LottieView
                    source={require('../../Assets/lottie/FingerPrint.json')}
                    autoPlay
                    loop={!isSwiped}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>

                <Text style={styles.vendorButtonText}>
                  {isSwiped ? 'Success!' : 'Swipe to Become a Vendor'}
                </Text>

                <LottieView
                  source={require('../../Assets/lottie/swip.json')}
                  autoPlay
                  loop={!isSwiped}
                  style={styles.arrowLottie}
                />
              </Animated.View>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Icons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Change your Location</Text>
                  </View>
                  <Text style={styles.modalSubtitle}>Do you want to add an extra drop location?</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="location-on" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.locationInput}
                      placeholder="Enter your Location"
                      placeholderTextColor="#999"
                      value={currentLocation}
                      onChangeText={setCurrentLocation}
                    />
                  </View>
                  <TouchableOpacity style={styles.submitButton} onPress={handleLocationChange}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    paddingHorizontal: 10 
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
   fontSize:  Fonts.size.PageHeading,
    color: '#333',
  },
  rating: {
       fontSize:  Fonts.size.PageHeading,
    color: '#333',
    fontWeight: '600',
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
      fontSize:  Fonts.size.PageHeading,
    color: '#333',
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callIconCircle: {
    backgroundColor: '#EDE9FE',
    padding: 8,
    borderRadius: 20,
    marginRight: 6,
  },
  callText: {
    fontSize:  Fonts.size.PageHeading,
    color: '#7B2CBF',
    fontWeight: '600',
  },
  topBackground: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
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
      fontSize:  Fonts.size.PageHeading,
    marginBottom: 12 
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationLabel: { 
    fontWeight: 'bold', 
    marginHorizontal: 8, 
     fontSize:  Fonts.size.PageHeading,
  },
  locationValue: { 
    color: '#333', 
    flex: 1, 
     fontSize:  Fonts.size.PageHeading,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { 
    color: '#666' ,
       fontSize:  Fonts.size.PageHeading,
  },
  value: { 
    fontWeight: 'bold', 
    color: '#333' ,
       fontSize:  Fonts.size.PageHeading,
  },
  emergencyCard: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.statusBar,
    borderRadius: 12,
  },
  emergencyTitle: { 
    fontWeight: 'bold', 
      fontSize:  Fonts.size.PageHeading,
    marginBottom: 6, 
    color: '#ffff' 
  },
  emergencyDescription: { 
      fontSize:  Fonts.size.PageHeading,
    color: '#ffff' 
  },
  emergencyButton: {
    marginTop: 12,
    flexDirection: 'row',
    backgroundColor: '#DBDBDB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: { 
    color: Colors.statusBar, 
    fontWeight: 'bold', 
    marginLeft: 8 ,
       fontSize:  Fonts.size.PageHeading,
  },
  trackButton: {
    flexDirection: 'row',
    backgroundColor: Colors.statusBar,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
      fontSize:  Fonts.size.PageHeading,
    marginLeft: 8,
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
  fontSize:  Fonts.size.PageHeading,
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
   fontSize:  Fonts.size.PageHeading,
    fontWeight: '600',
  },
  // Modal Styles
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: wp('90%'),
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  submitButton: {
    backgroundColor: '#7B2CBF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vendorButtonContainer: {
    width: '100%',
    marginTop: 20,
  },
  vendorButton: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  swipeTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  swipeHintText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  vendorButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts?.family?.regular || 'System',
    flex: 1,
    textAlign: 'center',
  },
  arrowLottie: {
    width: 80,
    height: 40,
    transform: [{ scaleX: -1 }],
  },
   toastContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BookingDetailsScreen;