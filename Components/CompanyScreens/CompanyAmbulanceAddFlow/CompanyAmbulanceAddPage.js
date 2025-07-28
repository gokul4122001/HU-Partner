import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AmbulanceList = ({navigation}) => {
  const ambulanceData = [
    {
      id: 'AMB01',
      vehicleNo: 'TN50ZX541',
      registrationNo: 'ADSV234540',
      regDateTime: '07/04/2025 ● 05:10 PM',
    },
    {
      id: 'AMB01',
      vehicleNo: 'TN50ZX541',
      registrationNo: 'ADSV234540',
      regDateTime: '07/04/2025 ● 05:10 PM',
    },
    {
      id: 'AMB01',
      vehicleNo: 'TN50ZX541',
      registrationNo: 'ADSV234540',
      regDateTime: '07/04/2025 ● 05:10 PM',
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
          <Text style={styles.serviceSize}>Small ( Omni, etc )</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ambulance ID No :</Text>
          <Text style={styles.detailValue}>{item.id}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vehicle no :</Text>
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B3F98" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Hi, Welcome</Text>
          <Text style={styles.companyName}>Akash Ambulance</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="calendar-today" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Ambulance List</Text>
      </View>

      {/* Ambulance Cards */}
     <ScrollView
  style={styles.scrollView}
  contentContainerStyle={{ paddingBottom: 20 }} // adjust the value as needed
  showsVerticalScrollIndicator={false}
>
        {ambulanceData.map((item, index) => (
          <AmbulanceCard key={index} item={item} />
        ))}

         <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EmergencyHospitalScreen')}>
  <Icon name="add" size={24} color="white" />
  <Text style={styles.addButtonText}>Add New Ambulance</Text>
</TouchableOpacity>

      </ScrollView>

   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#7B3F98',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  companyName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  titleContainer: {
    backgroundColor: '#7B3F98',
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
  },
  pageTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    marginBottom: 80,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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