import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../../Header'; // Adjust if needed
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../Fonts/Fonts';

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
        
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={require('../../Assets/ambualnce.png')}
              style={styles.ambulanceIcon}
            />
            <View>
              <Text style={styles.cardTitle}>Advanced Life Support</Text>
              <Text style={styles.cardSubtitle}>Small ( Omni, etc )</Text>
            </View>
          </View>

            <View style={styles.divider} />

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
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
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
    divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    borderStyle: 'dotted',
    marginVertical: 10,
  },
  titleText: {
  fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  editIcon1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  editText: {
    color: '#7B3F98',
    marginLeft: 4,
  },
  ambulanceIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },
 card: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  marginTop: 16,
  elevation: 2,
  height: 350,    
  width: '100%',   
},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
   fontSize: Fonts.size.PageHeading,
    color: '#000000',
    fontWeight: '600',
    marginRight: 4,
  },
  value: {
     fontSize: Fonts.size.PageHeading,
    color: '#454242',
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
    width: wp('42%'),
    height: hp('6.5%'),
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#333',
    fontWeight: '600',
    fontSize: Fonts.size.PageSubheading,
  },
  editButton: {
    width: wp('42%'),
    height: hp('6.5%'),
    backgroundColor: '#7B3F98',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    left:5
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: Fonts.size.PageSubheading,
  },
});
