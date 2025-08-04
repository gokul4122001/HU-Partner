// src/Screens/Auth/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Keyboard,
  Modal,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { countries } from './CountryJson'; // must be in same folder

import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../Fonts/Fonts';
import Colors from '../Colors/Colors';
import { Forget_Password_otp, resetPassword, sendOtp } from '../APICall/CompanyLogin/LoginApi';
import LottieView from 'lottie-react-native'; // <- added
import { useCompany } from '../Context/CompanyContext';

const { width, height } = Dimensions.get('window');

const Toast = ({ visible, message, backgroundColor }) => {
  const slideAnim = new Animated.Value(-100);
  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: backgroundColor || 'black',
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

// OTP Modal Component
const OTPModal = ({ visible, onClose, onVerify, phoneNumber }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const otpInputs = [];

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      otpInputs[index + 1]?.focus();
    }
  };

  const handleBackspace = (value, index) => {
    if (!value && index > 0) {
      otpInputs[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      alert('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      onVerify(otpString);
      setOtp(['', '', '', '']);
    }, 1500);
  };

  const handleResendOtp = () => {
    // Handle resend OTP logic here
    alert('OTP resent successfully');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.otpModalOverlay}>
        <View style={styles.otpModalContainer}>
          <TouchableOpacity style={styles.otpCloseButton} onPress={onClose}>
            <Icons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.otpTitle}>Enter OTP</Text>
          <Text style={styles.otpSubtitle}>
            We've sent a 4-digit code to {phoneNumber}
          </Text>

          <View style={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputs[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(digit, index);
                  }
                }}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyOtp}
            disabled={isVerifying}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.verifyButtonGradient}
            >
              <Text style={styles.verifyButtonText}>
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
            <Text style={styles.resendText}>Didn't receive code? Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showModal, setShowModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [otpCode, setotpCode] = useState('');
  const [toastColor, setToastColor] = useState('#000');
  const [isLoading, setIsLoading] = useState(false);
  const {token} =useCompany()
  
  // New states for OTP flow
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP, 3: Enter Passwords
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const showToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleSendOtp = async () => {
    Keyboard.dismiss();
    
    // Validation
    if (!phoneInput.trim()) {
      showToast('Please enter mobile number', '#FF4C4C');
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput)) {
      showToast('Enter valid 10 digit mobile number', '#FF4C4C');
      return;
    }

    setIsLoading(true);

    try {
      // Your send OTP API call here
       const res = await Forget_Password_otp(phoneInput,token);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setShowOtpModal(true);
        showToast('OTP sent successfully', '#28a745');
      }, 1500);
      
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      let errorMsg = 'Failed to send OTP';
      if (error.response) {
        errorMsg = error.response.data?.message || `Server error (${error.response.status})`;
      } else if (error.request) {
        errorMsg = 'No response from server';
      }
      showToast(errorMsg, '#FF4C4C');
    }
  };

  const handleOtpVerify = (otpCode) => {
    // Here you can verify OTP with your backend
    console.log('OTP entered:', otpCode);
    setotpCode(otpCode)
    // Simulate OTP verification
    setShowOtpModal(false);
    setIsOtpVerified(true);
    setStep(2); // Move to password entry step
    showToast('OTP verified successfully', '#28a745');
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    
    // Validation
    if (!password.trim()) { 
      showToast('Please enter new password', '#FF4C4C');
      return;
    }

    if (!confirmPassword.trim()) {
      showToast('Please confirm your password', '#FF4C4C');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', '#FF4C4C');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', '#FF4C4C');
      return;
    }

    setIsLoading(true);

    try {
      // Your password reset API call here
       await resetPassword(phoneInput, password,otpCode);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        showToast('Password reset successful', '#28a745');
        setTimeout(() => {
          navigation.navigate('MainApp');
        }, 1000);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      let errorMsg = 'Password reset failed';
      if (error.response) {
        errorMsg = error.response.data?.message || `Server error (${error.response.status})`;
      } else if (error.request) {
        errorMsg = 'No response from server';
      }
      showToast(errorMsg, '#FF4C4C');
    }
  };

  // Check if submit button should be enabled
  const isSubmitEnabled = () => {
    return isOtpVerified && password.trim() && confirmPassword.trim() && password === confirmPassword;
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Image
        source={{ uri: `https://flagcdn.com/w80/${item.code}.png` }}
        style={styles.modalFlag}
        resizeMode="contain"
      />
      <Text style={styles.countryText}>
        {item.name} ({item.dial_code})
      </Text>
    </TouchableOpacity>
  );

  const handleCountrySelect = item => {
    setSelectedCountry(item);
    setShowModal(false);
  };

  return (
    <LinearGradient
      colors={['#E6F3FF', '#F0F8FF', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#7416B2"
        translucent
      />
      <SafeAreaView style={styles.container}>
        <Toast
          visible={toastVisible}
          message={toastMessage}
          backgroundColor={toastColor}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {/* Top Half - Illustration */}
          <View style={styles.illustrationContainer}>
            <LottieView
              source={require('../Assets/lottie/register.json')}
              autoPlay
              loop
              style={{ width: width * 0.8, height: height * 0.4 }}
            />
          </View>

          {/* Bottom Half - Login Content */}
          <View style={styles.loginContainer}>
            <View style={styles.loginTitleRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backIcon}
              >
                <Icons name="arrow-back-ios" size={20} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.title}>Forget Password</Text>
            </View>

            {/* Mobile Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter Mobile Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  isOtpVerified && styles.disabledInput
                ]}
                value={phoneInput}
                onChangeText={setPhoneInput}
                placeholder="Enter Mobile number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                maxLength={10}
                editable={!isLoading && !isOtpVerified}
              />
              {isOtpVerified && (
                <View style={styles.verifiedBadge}>
                  <Icons name="verified" size={16} color="#28a745" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>

            {/* Password Inputs - Only show after OTP verification */}
            {isOtpVerified && (
              <>
                {/* New Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="••••••••••"
                      placeholderTextColor="#A0A0A0"
                      secureTextEntry={!showPassword}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Icons
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color="#A0A0A0"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm New Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="••••••••••"
                      placeholderTextColor="#A0A0A0"
                      secureTextEntry={!showConfirmPassword}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Icons
                        name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color="#A0A0A0"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {/* Action Button */}
            <TouchableOpacity
              onPress={isOtpVerified ? handleSubmit : handleSendOtp}
              activeOpacity={0.8}
              disabled={isLoading || (isOtpVerified && !isSubmitEnabled())}
              style={[
                styles.loginButtonContainer,
                (isOtpVerified && !isSubmitEnabled()) && styles.disabledButton
              ]}
            >
              <LinearGradient
                colors={
                  (isOtpVerified && !isSubmitEnabled()) 
                    ? ['#CCCCCC', '#AAAAAA'] 
                    : ['#8B5CF6', '#7C3AED']
                }
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading 
                    ? (isOtpVerified ? 'Submitting...' : 'Sending OTP...') 
                    : (isOtpVerified ? 'Submit' : 'Send OTP')
                  }
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* OTP Modal */}
        <OTPModal
          visible={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleOtpVerify}
          phoneNumber={phoneInput}
        />

        {/* Country Selection Modal */}
        <Modal visible={showModal} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <FlatList
              data={countries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCountryItem}
            />
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {},
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  illustrationContainer: {
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: height * 0.55,
  },
  loginTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },
  backIcon: {
    padding: 4,
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7416B2',
    marginBottom: 10,
    fontFamily: Fonts?.family?.regular || 'System',
    top: 2,
  },
  titleAccent: {
    color: '#7416B2',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 25,
    fontFamily: Fonts?.family?.regular || 'System',
    top: 5,
  },
  inputGroup: {
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: '#666666',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#28a745',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333333',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  eyeButton: {
    padding: 14,
  },
  loginButtonContainer: {
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalFlag: {
    width: 50,
    height: 36,
    marginRight: 15,
    borderRadius: 6,
  },
  countryText: {
    fontSize: 16,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  closeButton: {
    backgroundColor: '#8B5CF6',
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  // OTP Modal styles
  otpModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  otpCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7416B2',
    marginBottom: 10,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  otpSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Fonts?.family?.regular || 'System',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: 200,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#FFFFFF',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  verifyButton: {
    width: '100%',
    marginBottom: 15,
    padding:5
  },
  verifyButtonGradient: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  resendButton: {
    padding: 10,
  },
  resendText: {
    color: '#7416B2',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts?.family?.regular || 'System',
  },
});

export default LoginScreen;