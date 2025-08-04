import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';
import CustomHeader from '../../../Header'; 
import { Terms_conditions } from '../../APICall/CompanyLogin/LoginApi';

const TermsAndConditionsScreen = ({ navigation }) => {
  const [terms, setTerms] = useState('');

  const handleNotificationPress = () => {
    console.log('Notification icon pressed');
  };

  const handleWalletPress = () => {
    console.log('Wallet icon pressed');
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
  console.log('fetchTerms function started...');
  try {
    const data = await Terms_conditions();
    console.log('Terms API Response:', data);
    setTerms(data?.terms_conditions?.message || 'No terms found.');
  } catch (error) {
    console.error('Terms API Error:', error);
    Alert.alert('Error', error?.message || 'Something went wrong');
  }
};



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.statusBar} />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={handleNotificationPress}
          onWalletPress={handleWalletPress}
        />

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome6 name="angle-left" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Terms and Conditions</Text>
          </View>

          <ScrollView
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentBody}>
              <Text style={styles.contentText}>{terms}</Text>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  contentContainer: {
    flex: 1,
    marginTop: hp('1%'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
    top: 10,
  },
  backButton: {
    marginRight: wp('3%'),
    padding: 8,
  },
  pageTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp('2%'),
  },
  contentBody: {
    top: 20,
  },
  contentText: {
    fontSize: Fonts.size.PageSubheading,
    lineHeight: hp('3%'),
    color: '#4a4a4a',
    textAlign: 'justify',
    fontWeight: '600',
    fontFamily: Fonts.family.regular,
  },
});
