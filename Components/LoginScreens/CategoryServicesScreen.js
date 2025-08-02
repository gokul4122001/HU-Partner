import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Colors/Colors';
import Fonts from '../Fonts/Fonts';

const MyReportsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ambulanceType, setAmbulanceType] = useState(null);
  const [tempAmbulanceType, setTempAmbulanceType] = useState(null);

  const services = [
    { id: '1', name: 'Ambulance', image: require('../Assets/HomeAmbulance.png'), screen: 'Servicesform' },
    { id: '2', name: 'Home Care Nursing', image: require('../Assets/Homecarenursing.png') },
    { id: '3', name: 'Phisiotherapy', image: require('../Assets/phisiotherapy.png') },
    { id: '4', name: 'Lap', image: require('../Assets/lap.png') },
    { id: '5', name: 'Funeral & Mortuary Service', image: require('../Assets/murchary.png') },
    { id: '6', name: 'Hospital', image: require('../Assets/myreportServiceHospital.png') },
    { id: '7', name: 'Clinics', image: require('../Assets/clinics.png') },
    { id: '8', name: 'Blood Bank', image: require('../Assets/report3.png') },
    { id: '9', name: 'Pharmacy', image: require('../Assets/report4.png') },
    { id: '10', name: 'Medical Equipment', image: require('../Assets/mediequp.png') },
  ];

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const serviceChunks = chunkArray(services, 3);

  const renderCard = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        if (item.name === 'Ambulance') {
          setTempAmbulanceType(null); // Reset selection when opening modal
          setModalVisible(true);
        } else if (item.screen) {
          navigation.navigate(item.screen);
        }
      }}
      style={{ alignItems: 'center', margin: 10, width: wp('28%') }}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSubmit = () => {
    if (tempAmbulanceType) {
      setAmbulanceType(tempAmbulanceType);
      setModalVisible(false);
      navigation.navigate(tempAmbulanceType);
    } else {
      ToastAndroid.show('Please select a service type', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        <View style={styles.sectionHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons name="chevron-back" size={20} />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Select The Services</Text>
        </View>

        <ScrollView contentContainerStyle={styles.gridContainer}>
          {serviceChunks.map((chunk, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {chunk.map(renderCard)}
            </View>
          ))}
        </ScrollView>

      <Modal
  isVisible={isModalVisible}
  onBackdropPress={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Note</Text>
    <Text style={styles.modalText}>
      Add more details about the ambulance service
    </Text>

    <Text style={styles.modalLabel}>Ambulance Service Type</Text>
    <View style={styles.radioGroup}>
      {/* Company */}
      <TouchableOpacity
        style={[
          styles.radioButton,
          tempAmbulanceType === 'Servicesform' && styles.radioSelected,
        ]}
        onPress={() => {
          setTempAmbulanceType('Servicesform');
          setModalVisible(false);
          navigation.navigate('Servicesform');
        }}
      >
        <RadioButton
          value="Servicesform"
          status={tempAmbulanceType === 'Servicesform' ? 'checked' : 'unchecked'}
          onPress={() => {
            setTempAmbulanceType('Servicesform');
            setModalVisible(false);
            navigation.navigate('Servicesform');
          }}
          color="#5D0E8A"
        />
        <Text style={styles.radioText}>Company</Text>
      </TouchableOpacity>

      {/* Driver */}
      <TouchableOpacity
        style={[
          styles.radioButton,
          tempAmbulanceType === 'Driver' && styles.radioSelected,
        ]}
        onPress={() => setTempAmbulanceType('Driver')}
      >
        <RadioButton
          value="Driver"
          status={tempAmbulanceType === 'Driver' ? 'checked' : 'unchecked'}
          onPress={() => setTempAmbulanceType('Driver')}
          color="#5D0E8A"
        />
        <Text style={styles.radioText}>Driver</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.loginRow}>
      <Text style={styles.loginPrompt}>
        Have you already registered?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('LoginAccoundScreen')}
        >
          Login
        </Text>
      </Text>
    </View>

    <TouchableOpacity
      style={styles.submitButton}
      onPress={() => {
        if (tempAmbulanceType === 'Driver') {
          setModalVisible(false);
          navigation.navigate('Driver');
        } else {
          ToastAndroid.show('Please select a service type', ToastAndroid.SHORT);
        }
      }}
    >
      <Text style={styles.submitText}>Submit</Text>
    </TouchableOpacity>
  </View>
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
  topBackground: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    marginBottom: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  cardText: {
    fontSize: Fonts.size.PageSubSubHeading,
    color: '#4a4a4a',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D0E8A',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
    color: '#000',
  },
  modalLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#5D0E8A',
    backgroundColor: '#f3e9fc',
  },
  radioText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 5,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginPrompt: {
    color: '#555',
    fontSize: 14,
  },
  loginLink: {
    color: '#5D0E8A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#5D0E8A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyReportsScreen;
