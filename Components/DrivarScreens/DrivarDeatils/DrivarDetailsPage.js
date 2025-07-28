import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,Modal,TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const DriverDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
const [reason, setReason] = useState('');

    const handleModalSubmit = () => {
    console.log('Submitted Reason:', reason);
    setModalVisible(false);
    setReason('');
  };

  const driver = {
    name: 'Selva Kumar',
    id: 'AK0215',
    contact: '9345655447',
    email: 'Selvakumar@gmail.com',
    gender: 'Male',
    dob: '03/06/2002',
    age: 22,
    address: 'No 3/2, 1 street, Samiyar Thottam, Vyasarpadi, Chennai - 39',
    driverType: 'FullTime',
    experience: '20 years',
    licenseNumber: 'MH12 20010149313',
    licenseType: 'International Driving Permit (IDP)',
    licenseValidity: '08/04/2050',
    issuedState: '454242',
    password: 'selva201',
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="arrow-back-ios" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Driver Details</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editBtn}>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>  
            <Text style={styles.statValue}>20K</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>  
            <Text style={styles.statValue}>150</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fee2e2' }]}>  
            <Text style={styles.statValue}>50</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowCenter}>
            <Image
              source={require('../../Assets/profile.png')}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{driver.name}</Text>
              <Text style={styles.id}>ID no : {driver.id}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>ON DUTY</Text>
            </View>
          </View>
          <Text style={styles.label}>Contact No : <Text style={styles.value}>{driver.contact}</Text></Text>
          <Text style={styles.label}>Email ID : <Text style={styles.value}>{driver.email}</Text></Text>
          <Text style={styles.label}>Gender : <Text style={styles.value}>{driver.gender}</Text>   Date of Birth : <Text style={styles.value}>{driver.dob}</Text>   Age : <Text style={styles.value}>{driver.age}</Text></Text>
          <Text style={styles.label}>Address : <Text style={styles.value}>{driver.address}</Text></Text>
          <Text style={styles.label}>Driver Type : <Text style={styles.value}>{driver.driverType}</Text></Text>
          <Text style={styles.label}>Years of Experience : <Text style={styles.value}>{driver.experience}</Text></Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Driver License</Text>
          <Text style={styles.label}>License Number : <Text style={styles.value}>{driver.licenseNumber}</Text></Text>
          <Text style={styles.label}>License Type : <Text style={styles.value}>{driver.licenseType}</Text></Text>
          <Text style={styles.label}>License Validity Date : <Text style={styles.value}>{driver.licenseValidity}</Text></Text>
          <Text style={styles.label}>Issued State : <Text style={styles.value}>{driver.issuedState}</Text></Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Credentials</Text>
          <Text style={styles.label}>E-mail ID : <Text style={styles.value}>{driver.email}</Text></Text>
          <Text style={styles.label}>Password : <Text style={styles.value}>{driver.password}</Text></Text>
          <Text style={styles.label}>Confirm Password : <Text style={styles.value}>{driver.password}</Text></Text>
        </View>

        <View style={styles.docGrid}>
          {['Driver License', 'ID Proof', 'Medical Fitness', 'Profile Image'].map((title, index) => (
            <View key={index} style={styles.docCard}>
              <MaterialCommunityIcons name="file-pdf-box" size={40} color="#ef4444" />
              <Text style={styles.docTitle}>{title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

        <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Note</Text>
            <Text style={styles.modalDescription}>
              Want to update your driver details?{"\n"}Click 'OK' and the admin will contact you.
            </Text>
            <Text style={styles.modalLabel}>Enter Reason</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Reason"
              value={reason}
              onChangeText={setReason}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOk} onPress={handleModalSubmit}>
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  editBtn: {
    backgroundColor: '#f3f4f6',
    padding: 6,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 12,
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    color: '#111',
  },
  docGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 80,
  },
  docCard: {
    width: width / 2 - 20,
    backgroundColor: '#f9fafb',
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 6,
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 80,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancel: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelText: {
    color: '#111',
    fontWeight: 'bold',
  },
  modalOk: {
    flex: 1,
    backgroundColor: '#6d28d9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  okText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DriverDetailsScreen;
