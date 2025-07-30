import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../Fonts/Fonts';
import CustomHeader from '../../../DrivarHeader'; 

const PaymentBillsScreen = ({ navigation }) => {
  const paymentData = [
    {
      id: 1,
      type: 'Patient transfer',
      description: 'Small ( Omni, etc )',
      amount: '₹ 1,500',
      icon: '🚑',
      iconBg: '#FFE6E6',
    },
    {
      id: 2,
      type: 'Deposit in Wallet',
      description: null,
      amount: '₹ 1,750',
      icon: '💳',
      iconBg: '#E6E6FF',
    },
    {
      id: 3,
      type: 'Basic life support',
      description: null,
      amount: '₹ 1,750',
      icon: '🚑',
      iconBg: '#E6F7FF',
    },
    {
      id: 4,
      type: 'Advance life support',
      description: null,
      amount: '₹ 1,750',
      icon: '🚑',
      iconBg: '#FFF0E6',
    },
    {
      id: 5,
      type: 'Patient transfer',
      description: 'Small ( Omni, etc )',
      amount: '₹ 1,500',
      icon: '🚑',
      iconBg: '#FFE6E6',
    },
    {
      id: 6,
      type: 'Deposit in Wallet',
      description: null,
      amount: '₹ 1,750',
      icon: '💳',
      iconBg: '#E6E6FF',
    },
    {
      id: 7,
      type: 'Basic life support',
      description: null,
      amount: '₹ 2,200',
      icon: '🚑',
      iconBg: '#E6F7FF',
    },
    {
      id: 8,
      type: 'Patient transfer',
      description: 'Medium ( Tempo, etc )',
      amount: '₹ 1,800',
      icon: '🚑',
      iconBg: '#FFE6E6',
    },
    {
      id: 9,
      type: 'Advance life support',
      description: null,
      amount: '₹ 2,000',
      icon: '🚑',
      iconBg: '#FFF0E6',
    },
    {
      id: 10,
      type: 'Deposit in Wallet',
      description: null,
      amount: '₹ 2,500',
      icon: '💳',
      iconBg: '#E6E6FF',
    },
  ];

  const renderPaymentItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.paymentItem}>
      <View style={styles.itemContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.paymentType}>{item.type}</Text>
          {item.description && (
            <Text style={styles.paymentDescription}>{item.description}</Text>
          )}
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FF" />

      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: -0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        {/* ✅ CustomHeader integrated */}
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification Pressed')}
          onWalletPress={() => console.log('Wallet Pressed')}
        />

        {/* Back Button and Title */}
        <View style={styles.titleSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icons name="arrow-back-ios" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Payment & Bills</Text>
        </View>

        {/* Payment List */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.paymentList}>
            {paymentData.map((item) => renderPaymentItem(item))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBackground: {
   paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  pageTitle: {
   fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    color: '#8B5CF6',
    fontFamily: Fonts?.family?.bold || 'System',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  paymentList: {
    paddingHorizontal: 16,
  },
  paymentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  paymentType: {
    fontSize: Fonts.size.PageSubheading,
    fontWeight: '600',
    color: '#333',
  
    marginBottom: 2,
  },
  paymentDescription: {
  fontSize: Fonts.size.PageSubheading,
    color: '#666',
  
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
      fontSize: Fonts.size.PageHeading,

  },
});

export default PaymentBillsScreen;
