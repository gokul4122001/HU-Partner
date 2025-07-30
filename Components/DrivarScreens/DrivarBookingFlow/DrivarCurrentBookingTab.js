import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';


const CurrentBookingTab = () => {
  const navigation = useNavigation(); // ✅ Fixed navigation access

  const [accepted, setAccepted] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showCards, setShowCards] = useState(true);

  const firstBooking = {
    id: '1',
    type: 'Patient Transfer',
    category: 'Emergency',
    size: 'Small (Omni, etc)',
    pickup: 'No 3/1, I Street west mambalam chennai -33',
    drop: 'No 3/1, I Street vyasarpadi chennai -33',
    name: 'Jeswanth Kumar',
    contact: '934566547',
    amount: '₹ 1,800',
    date: '09/04/2025',
    time: '06:19 PM',
  };

  const handleAccept = () => setAccepted(true);
  const handleEnterOTP = () => setOtpModalVisible(true);
  const handleTrackLocation = () => Alert.alert('Track Location', 'Tracking screen logic here');

  const handleOtpSubmit = () => {
    setOtpModalVisible(false);
    setOtpSubmitted(true);
    Alert.alert('OTP Submitted', `Entered OTP: ${otp.join('')}`);
  };

  const handleViewDetails = () => {
    navigation.navigate('BookingDetailsScreen'); 
  };

  const handleReject = () => {
    Alert.alert(
      'Reject Booking',
      'Are you sure you want to reject all bookings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => setShowCards(false),
        },
      ]
    );
  };

  const renderCard = (booking, type) => (
    <View style={styles.bookingCard}>
      <CardContent booking={booking} />
      <View style={styles.actionButtons}>
        {type === 'initial' && (
          <>
            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </>
        )}
        {type === 'otp' && (
          <>
            <TouchableOpacity style={styles.otpButton} onPress={handleEnterOTP}>
              <Text style={styles.otpButtonText}>Enter OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trackLocationButton} onPress={handleTrackLocation}>
              <MaterialCommunityIcons name="map-marker" size={16} color="white" />
              <Text style={styles.trackLocationText}>Track Location</Text>
            </TouchableOpacity>
          </>
        )}
        {type === 'view' && (
          <>
            <TouchableOpacity style={styles.rejectButton} onPress={handleViewDetails}>
              <Text style={styles.rejectButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trackLocationButton} onPress={handleTrackLocation}>
              <MaterialCommunityIcons name="map-marker" size={16} color="white" />
              <Text style={styles.trackLocationText}>Track Location</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  const renderOtpModal = () => (
    <Modal visible={otpModalVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter OTP</Text>
          <Text style={styles.modalSubtitle}>
            Enter OTP below. OTP is sent to the user mobile number
          </Text>
          <View style={styles.otpInputs}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInputBox}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => {
                  const updatedOtp = [...otp];
                  updatedOtp[index] = text;
                  setOtp(updatedOtp);
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleOtpSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {showCards && (
        <>
          {renderCard(firstBooking, 'initial')}
          {accepted && renderCard(firstBooking, 'otp')}
          {otpSubmitted && renderCard(firstBooking, 'view')}
        </>
      )}
      {renderOtpModal()}
    </ScrollView>
  );
};

const CardContent = ({ booking }) => (
  <>
    <View style={styles.bookingHeader}>
      <Image source={require('../../Assets/ambualnce.png')} style={styles.ambulanceImage} />
      <View style={styles.bookingInfo}>
        <View style={styles.bookingTopRow}>
          <Text style={styles.bookingType}>{booking.type}</Text>
          <Text style={styles.bookingCategory}>{booking.category}</Text>
        </View>
        <Text style={styles.bookingSize}>{booking.size}</Text>
      </View>
    </View>
    <View style={styles.locationContainer}>
      <Text style={styles.locationLabel}>Pickup: {booking.pickup}</Text>
      <Text style={styles.locationLabel}>Drop: {booking.drop}</Text>
    </View>
    <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={styles.customerText}>Name: {booking.name}</Text>
    <Text style={styles.customerText}>Contact: {booking.contact}</Text>
    </View>
     <View style={{   flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={styles.customerText}>Date: {booking.date}</Text>
    <Text style={styles.customerText}>Time: {booking.time}</Text>
    </View> 
    <View style={styles.amountRow}>
      <Text style={styles.amountLabel}>Total Amount</Text>
      <Text style={styles.amountText}>{booking.amount}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ambulanceImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 12,
  },
  bookingInfo: { flex: 1 },
  bookingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingType: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
  },
  bookingCategory: {
    fontSize: Fonts.size.PageSubheading,
    color: 'red',
    fontWeight: 'bold',
    backgroundColor: '#FFEDED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  bookingSize: {
    fontSize: Fonts.size.PageHeading,
    color: 'gray',
    marginTop: 4,
  },
  locationContainer: {
    marginVertical: 10,
  },
  locationLabel: {
    fontSize: Fonts.size.PageSubheading,
    marginBottom: 4,
  },
  customerText: {
    fontSize: Fonts.size.PageSubheading,
    fontWeight: '600',
    marginBottom: 4,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  amountLabel: {
    fontSize: 14,
    color: 'gray',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  rejectButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: Fonts.size.PageSubheading,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: Colors.statusBar,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',

  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
     fontSize: Fonts.size.PageSubheading,
  },
  otpButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.statusBar,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  otpButtonText: {
    color: Colors.statusBar,
    fontWeight: 'bold',
     fontSize: Fonts.size.PageSubheading,
  },
  trackLocationButton: {
    flex: 1,
    backgroundColor: Colors.statusBar,
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackLocationText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
     fontSize: Fonts.size.PageSubheading,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp('85%'),
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalSubtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'gray',
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 16,
  },
  otpInputBox: {
    borderWidth: 1,
    borderColor: Colors.statusBar,
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.statusBar,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CurrentBookingTab;
