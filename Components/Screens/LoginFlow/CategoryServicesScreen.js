// screens/MyReportsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import logo from '../../Assets/logos.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';

const MyReportsScreen = ({ navigation }) => {
  const services = [ 
    { id: '1', name: 'Ambulance', image: require('../../Assets/HomeAmbulance.png'), screen: 'ServiceHospitalScreen' },
    { id: '2', name: 'Home Care Nursing', image: require('../../Assets/Homecarenursing.png'), screen: 'ClinicsScreen' },
    { id: '3', name: 'Phisiotherapy', image: require('../../Assets/phisiotherapy.png'), screen: 'BloodBankScreen' },
    { id: '4', name: 'Lap', image: require('../../Assets/lap.png'), screen: 'PharmacyScreen' },
    { id: '5', name: 'Funeral & Mortuary Service ', image: require('../../Assets/murchary.png'), screen: 'MedicalEquipmentScreen' },
    { id: '6', name: 'Hospital ', image: require('../../Assets/myreportServiceHospital.png'), screen: 'MedicalEquipmentScreen' },
    { id: '7', name: 'Clinics ', image: require('../../Assets/clinics.png'), screen: 'MedicalEquipmentScreen' },
    { id: '8', name: 'Blood Bank ', image: require('../../Assets/report3.png'), screen: 'MedicalEquipmentScreen' },
    { id: '9', name: 'Pharmacy', image: require('../../Assets/report4.png'), screen: 'MedicalEquipmentScreen' },
    { id: '10', name: 'Medical Equipment', image: require('../../Assets/mediequp.png'), screen: 'MedicalEquipmentScreen' },
  
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
      onPress={() => item.screen && navigation.navigate(item.screen)}
      style={{ alignItems: 'center', margin: 10, width: wp('28%') }}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <LinearGradient     colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}>

      
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
    fontSize:  Fonts.size.PageHeading,
    fontWeight: 'bold',
    marginLeft: 10,
   
  },
  serviceLabel: {
    fontSize:  Fonts.size.PageHeading,
    fontWeight: '700',
    marginVertical: 10,
    color: '#000',
    marginHorizontal: 13,
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
    fontSize:  Fonts.size.PageSubSubHeading,
    color: '#4a4a4a',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default MyReportsScreen;
