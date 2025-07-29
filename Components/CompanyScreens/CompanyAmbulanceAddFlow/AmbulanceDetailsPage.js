import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../../Header'; // adjust path as needed

const AmbulanceDetailsScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}
    >
      <StatusBar backgroundColor="#7B3F98" barStyle="light-content" />

      <CustomHeader
        username="Akash Ambulance"
        onNotificationPress={() => console.log('Notification Pressed')}
        onWalletPress={() => console.log('Wallet Pressed')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Ambulance Details</Text>
         <TouchableOpacity style={styles.editIcon1} onPress={() => console.log('Edit Pressed')}>
  <Icon name="edit" size={20} color="#7B3F98" />
  <Text style={styles.editText}>Edit</Text>
</TouchableOpacity>

        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.emoji}>🚑</Text>
            <View>
              <Text style={styles.cardTitle}>Advanced Life Support</Text>
              <Text style={styles.cardSubtitle}>Small ( Omni, etc )</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Ambulance Name :</Text>
            <Text style={styles.value}>Jaya Ambulance</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Ambulance Type :</Text>
            <Text style={styles.value}>Advanced Life Support</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Vehicle Number Plate :</Text>
            <Text style={styles.value}>TN05D2541</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>FC Details :</Text>
            <Text style={styles.value}>AGSV235434D</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Insurance Details :</Text>
            <Text style={styles.value}>07/04/2025 & 07/05/2028</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Facility :</Text>
            <Text style={styles.value}>
              Emergency kit, Oxygen Tanks, IV equipment, Cardiac Monitors, Ambulance Bed
            </Text>
          </View>
        </View>

        <View style={styles.docRow}>
          <View style={styles.docCard}>
            <Icon name="picture-as-pdf" size={40} color="#7B3F98" />
            <Text style={styles.docLabel}>Ambulance RC Book</Text>
            <Text style={styles.docText}>Document name</Text>
          </View>

          <View style={styles.docCard}>
            <Icon name="picture-as-pdf" size={40} color="#7B3F98" />
            <Text style={styles.docLabel}>Ambulance License</Text>
            <Text style={styles.docText}>Document name</Text>
          </View>
        </View>

        <View style={styles.docRow}>
          <View style={styles.docCard}>
            <Icon name="picture-as-pdf" size={40} color="#7B3F98" />
            <Text style={styles.docLabel}>Ambulance Image</Text>
            <Text style={styles.docText}>Document name</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditAmbulance')}
          >
            <Text style={styles.editBtnText}>Edit Ambulance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AmbulanceDetailsScreen;

const styles = StyleSheet.create({
  topBackground: {
    flex: 1,
    paddingTop: 10,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  editIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#7B3F98',
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 36,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  detailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flexShrink: 1,
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  docCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    minWidth: 160,
  },
  docLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  docText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  deleteText: {
    color: '#333',
    fontWeight: '600',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#7B3F98',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  editIcon1: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fffff', // light purple shade (you can change)
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 10,
},
});
