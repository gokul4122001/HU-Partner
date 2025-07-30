import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';
import CustomHeader from '../../../DrivarHeader'; 


const TermsAndConditionsScreen = ({ navigation }) => {
  const termsContent = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...`;

  const handleNotificationPress = () => {
    console.log('Notification icon pressed');
  };

  const handleWalletPress = () => {
    console.log('Wallet icon pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.statusBar} />

      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: -0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        {/* ✅ Custom Header */}
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
              <Text style={styles.contentText}>{termsContent}</Text>
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
