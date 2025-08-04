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
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { countries } from './CountryJson';

import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../Fonts/Fonts';
import Colors from '../Colors/Colors';
import { login } from '../APICall/CompanyLogin/LoginApi';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { setAuthDetails } from '../redux/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const LoginScreen = ({ navigation }) => {
  const [phoneInput, setPhoneInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#000');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { setCompanyProfile, setToken, companyProfile } = useCompany();

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem('rememberedPhone');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');
        if (savedPhone && savedPassword) {
          setPhoneInput(savedPhone);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (err) {
        console.error('Error loading remembered credentials', err);
      }
    };
    loadCredentials();
  }, []);

  const showToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

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

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput)) {
      showToast('Enter valid 10 digit mobile number', '#FF4C4C');
      setIsLoading(false);
      return;
    }

    try {
      const res = await login(phoneInput, password);
      dispatch(
        setAuthDetails({
          access_token: res.access_token,
          user_type: res.user_type,
        }),
      );
      setToken(res.access_token)
      await AsyncStorage.setItem('token', res.access_token);
      await AsyncStorage.setItem('user_type', res.user_type);
      await AsyncStorage.setItem('login', "true");
      await AsyncStorage.setItem('rememberedPassword', password);

      if (rememberMe) {
        await AsyncStorage.setItem('rememberedPhone', phoneInput);
        await AsyncStorage.setItem('rememberedPassword', password);
      } else {
        await AsyncStorage.removeItem('rememberedPhone');
        await AsyncStorage.removeItem('rememberedPassword');
      }

      showToast('Login Successful', '#28a745');
      setTimeout(() => {
        navigation.navigate('WelcomeSwipe');
      }, 1000);
    } catch (error) {
      console.log(error);
      
      let errorMsg = 'Login failed';
      if (error.response) {
        errorMsg =
          error.response.data?.message ||
          `Server error (${error.response.status})`;
      } else if (error.request) {
        errorMsg = 'No response from server';
      }
      showToast(errorMsg, '#FF4C4C');
    } finally {
      setIsLoading(false);
    }
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
      <SafeAreaView style={{ flex: 1 }}>
        <Toast
          visible={toastVisible}
          message={toastMessage}
          backgroundColor={toastColor}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.illustrationContainer}>
              <LottieView
                source={require('../Assets/lottie/register.json')}
                autoPlay
                loop
                style={{ width: width * 0.8, height: height * 0.4 }}
              />
            </View>

            <View style={styles.loginContainer}>
              <View style={styles.loginTitleRow}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backIcon}
                >
                  <Icons name="arrow-back-ios" size={18} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.title}>
                  Login your <Text style={styles.titleAccent}>account</Text>
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Your username and password credentials will be sent to your
                mobile number
              </Text>

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

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="***********"
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

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && (
                      <Icons name="check" size={14} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>
              </View>

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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  illustrationContainer: {
    height: height * 0.4,
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
    fontSize: Fonts.size.BookingConformation,
    fontWeight: 'bold',
    color: '#7416B2',
    marginBottom: 10,
    top: 2,
  },
  titleAccent: {
    color: '#7416B2',
  },
  subtitle: {
    fontSize: Fonts.size.PageHeading,
    color: '#2A2C2D',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 25,
    top: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '500',
    color: '#4F4C4C',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: Fonts.size.PageSubheading,
    backgroundColor: '#FFFFFF',
    color: '#4F4C4C',
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
    fontSize: Fonts.size.PageSubheading,
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
    fontSize: Fonts.size.PageSubheading,
    color: '#666666',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  forgotPasswordText: {
    fontSize: Fonts.size.PageSubheading,
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
    fontSize: Fonts.size.PageHeading,
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
});

export default LoginScreen;
