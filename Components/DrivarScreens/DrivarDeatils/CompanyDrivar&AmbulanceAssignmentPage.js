import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AmbulanceAssignmentScreen = () => {
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
      amount: '₹ 1,800'
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
      amount: '₹ 1,800'
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
      amount: '₹ 1,800'
    }
  ];

  const renderAssignmentCard = (item) => (
    <View key={item.id} style={styles.assignmentCard}>
      {/* Ambulance Icon and Type */}
      <View style={styles.headerRow}>
        <View style={styles.ambulanceIcon}>
          <Icon name="local-hospital" size={20} color="#fff" />
        </View>
        <View style={styles.typeInfo}>
          <Text style={styles.supportType}>{item.supportType}</Text>
          <Text style={styles.sizeText}>{item.size}</Text>
        </View>
      </View>

      {/* Ambulance Details */}
      <View style={styles.detailsSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ambulance ID No: </Text>
          <Text style={styles.value}>{item.ambulanceId}</Text>
          <Text style={styles.label}>   Vehicle no: </Text>
          <Text style={styles.value}>{item.vehicleNo}</Text>
        </View>

        {/* Pickup Location */}
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Pickup: </Text>
            <Text style={styles.locationText}>{item.pickup}</Text>
          </View>
        </View>

        {/* Drop Location */}
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, {backgroundColor: '#ef4444'}]} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Drop: </Text>
            <Text style={styles.locationText}>{item.drop}</Text>
          </View>
        </View>

        {/* Customer Details */}
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

        {/* Total Amount */}
        <View style={styles.amountSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>{item.amount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8b5cf6" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.welcomeSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>A</Text>
              </View>
            </View>
            <View style={styles.welcomeText}>
              <Text style={styles.hiText}>Hi, Welcome</Text>
              <Text style={styles.companyText}>Akash Ambulance</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="assignment" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.titleSection}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Driver & Ambulance Assignment Details</Text>
        </View>
      </View>

   <ScrollView
  style={styles.content}
  contentContainerStyle={{ paddingBottom: 100 }} 
  showsVerticalScrollIndicator={false}
>
        {assignmentData.map(item => renderAssignmentCard(item))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#8b5cf6',
    paddingTop: 44,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  welcomeText: {
    // Welcome text styles
  },
  hiText: {
    fontSize: 14,
    color: '#e5e7eb',
    marginBottom: 2,
  },
  companyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  assignmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ambulanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
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
  detailsSection: {
    // Details section styles
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginTop: 6,
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
  customerSection: {
    marginTop: 8,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default AmbulanceAssignmentScreen;