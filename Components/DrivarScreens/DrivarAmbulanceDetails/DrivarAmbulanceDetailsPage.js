import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const AkashAmbulanceApp = () => {
  const ambulanceBookings = [
    {
      id: "AM801",
      vehicle: "TN0352541",
      pickup: "No.3/1, 1 Street west mambalam chennai-33",
      drop: "No.3/1, 1 Street vyasarpadi chennai-33",
      name: "Jeeventh Kumar",
      contact: "9444666447",
      date: "05/04/2025",
      time: "10:00 AM",
      amount: 1800
    },
    {
      id: "AM801",
      vehicle: "TN0352541",
      pickup: "No.3/1, 1 Street west mambalam chennai-33",
      drop: "No.3/1, 1 Street vyasarpadi chennai-33",
      name: "Jeeventh Kumar",
      contact: "9444666447",
      date: "05/04/2025",
      time: "10:00 AM",
      amount: 1800
    },
    {
      id: "AM801",
      vehicle: "TN0352541",
      pickup: "No.3/1, 1 Street west mambalam chennai-33",
      drop: "No.3/1, 1 Street vyasarpadi chennai-33",
      name: "Jeeventh Kumar",
      contact: "9444666447",
      date: "05/04/2025",
      time: "10:00 AM",
      amount: 1800
    }
  ];

  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  const handlePhoneCall = (phoneNumber) => {
    // Handle phone call
    console.log('Calling:', phoneNumber);
  };

  const renderAmbulanceCard = (booking, index) => (
    <View key={index} style={styles.cardContainer}>
      {/* Ambulance Header */}
      <View style={styles.cardHeader}>
        <View style={styles.ambulanceInfo}>
          <View style={styles.ambulanceIcon}>
            <Text style={styles.ambulanceEmoji}>🚑</Text>
          </View>
          <View style={styles.ambulanceDetails}>
            <Text style={styles.ambulanceTitle}>Advanced Life Support</Text>
            <Text style={styles.ambulanceSubtitle}>Small ( 2mins, etc )</Text>
          </View>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ambulance ID No:</Text>
            <Text style={styles.detailValue}>{booking.id}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Vehicle no:</Text>
            <Text style={styles.detailValue}>{booking.vehicle}</Text>
          </View>
        </View>

       <View style={styles.locationContainer}>
  <View style={styles.locationRow}>
    <Icon name="place" size={16} color="#ef4444" />
    <Text style={styles.locationText}>
      <Text style={styles.locationLabel}>Pickup: </Text>
      <Text style={styles.locationAddress}>{booking.pickup}</Text>
    </Text>
  </View>

  <View style={styles.locationRow}>
    <Icon name="place" size={16} color="#ef4444" />
    <Text style={styles.locationText}>
      <Text style={styles.locationLabel}>Drop: </Text>
      <Text style={styles.locationAddress}>{booking.drop}</Text>
    </Text>
  </View>
</View>


        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{booking.name}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.detailLabel}>Contact:</Text>
            <Text style={styles.detailValue}>{booking.contact}</Text>
        
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{booking.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{booking.time}</Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹ {booking.amount.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Hi, Welcome</Text>
            <Text style={styles.appTitle}>Akash Ambulance</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>A</Text>
          </View>
        </View>
        <View style={styles.pageTitle}>
          <Text style={styles.pageTitleText}>Ambulance Details</Text>
        </View>
      </View>

      {/* Ambulance Bookings List */}
   <ScrollView
  style={styles.content}
  contentContainerStyle={{ paddingBottom: 100 }}
  showsVerticalScrollIndicator={false}
>

        <View style={styles.bookingsList}>
          {ambulanceBookings.map((booking, index) => renderAmbulanceCard(booking, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9d5ff',
  },
  header: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  profileIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageTitle: {
    marginTop: 16,
  },
  pageTitleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  bookingsList: {
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  cardHeader: {
    marginBottom: 16,
  },
  ambulanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ambulanceIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fef2f2',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ambulanceEmoji: {
    fontSize: 20,
  },
  ambulanceDetails: {
    flex: 1,
  },
  ambulanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  ambulanceSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  bookingDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
  },
  contactItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
    color: '#1f2937',
  },
  phoneIcon: {
    marginLeft: 4,
  },
 locationContainer: {
  paddingVertical: 10,
},
locationRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
},
locationText: {
  marginLeft: 6,
  flexShrink: 1,
},
locationLabel: {
  fontWeight: 'bold',
  color: '#111',
},
locationAddress: {
  color: '#555',
},

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9333ea',
  },
});

export default AkashAmbulanceApp;