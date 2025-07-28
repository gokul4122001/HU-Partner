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
import { sendOtp } from '../APICall/LoginApi';
import LottieView from 'lottie-react-native'; // <- added

const { width, height } = Dimensions.get('window');

const Toast = ({ visible, message, backgroundColor }) => {
  const slideAnim = new Animated.Value(-100);
  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(2000),
        Animated.timing(slideAnim, { toValue: -100, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[styles.toastContainer, { backgroundColor: backgroundColor || 'black', transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const LoginScreen = ({navigation}) => {

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showModal, setShowModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#000');
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

        navigation.navigate('WelcomeSwipe');

    // Validation
    if (!phoneInput.trim()) {
      showToast('Please enter mobile number', '#FF4C4C');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      showToast('Please enter password', '#FF4C4C');
      setIsLoading(false);
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput)) {
      showToast('Enter valid 10 digit mobile number', '#FF4C4C');
      setIsLoading(false);
      return;
    }

    try {
      // Your login API call here
      showToast('Login Successful', '#28a745');
      setTimeout(() => {
        navigation.navigate('Home'); // Navigate to your home screen
      }, 1000);
    } catch (error) {
      let errorMsg = 'Login failed';
      if (error.response) {
        errorMsg = error.response.data?.message || `Server error (${error.response.status})`;
      } else if (error.request) {
        errorMsg = 'No response from server';
      }
      showToast(errorMsg, '#FF4C4C');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity style={styles.countryItem} onPress={() => handleCountrySelect(item)}>
      <Image source={{ uri: `https://flagcdn.com/w80/${item.code}.png` }} style={styles.modalFlag} resizeMode="contain" />
      <Text style={styles.countryText}>{item.name} ({item.dial_code})</Text>
    </TouchableOpacity>
  );

  const handleCountrySelect = (item) => {
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
      <StatusBar barStyle="dark-content" backgroundColor="#7416B2" translucent />
      <SafeAreaView style={styles.container}>
        <Toast visible={toastVisible} message={toastMessage} backgroundColor={toastColor} />
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
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
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
    <Icons name="arrow-back-ios" size={20} color="#000000" />
  </TouchableOpacity>
  <Text style={styles.title}>
    Login your <Text style={styles.titleAccent}>account</Text>
  </Text>
</View>

            <Text style={styles.subtitle}>
              Your username and password credentials will be sent to you mobile number
            </Text>

            {/* Mobile Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={styles.textInput}
                value={phoneInput}
                onChangeText={setPhoneInput}
                placeholder="Enter Mobile number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                maxLength={10}
                editable={!isLoading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
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
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#A0A0A0" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me and Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity 
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Icons name="check" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              onPress={handleLogin} 
              activeOpacity={0.8}
              disabled={isLoading}
              style={styles.loginButtonContainer}
            >
              <LinearGradient 
                colors={['#8B5CF6', '#7C3AED']} 
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Logging In...' : 'Log In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Country Selection Modal */}
        <Modal visible={showModal} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <FlatList 
              data={countries} 
              keyExtractor={(item, index) => index.toString()} 
              renderItem={renderCountryItem} 
            />
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
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
  header: {
   
  },
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
    top:2

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
    top:5
  },
  inputGroup: {
    marginBottom: 20,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF4444',
    fontWeight: '600',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  loginButtonContainer: {
    marginTop: 10,
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
});

export default LoginScreen;