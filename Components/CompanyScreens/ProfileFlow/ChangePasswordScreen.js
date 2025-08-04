import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import CustomHeader from '../../../Header';
import { Change_Password } from '../../APICall/CompanyLogin/LoginApi';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Toast = ({ visible, message, backgroundColor }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2500),
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
        toastStyles.toastContainer,
        { transform: [{ translateY: slideAnim }], backgroundColor },
      ]}
    >
      <Text style={toastStyles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const ChangePasswordScreen = ({ navigation }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#4BB543');

  const togglePasswordVisibility = field => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const updatePassword = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const showToast = (msg, color) => {
    setToastVisible(false);
    setTimeout(() => {
      setToastMessage(msg);
      setToastColor(color);
      setToastVisible(true);
    }, 100);
  };

  const validatePasswords = () => {
    if (!passwords.currentPassword.trim()) {
      showToast('Please enter your current password', '#FF4C4C');
      return false;
    }
    if (!passwords.newPassword.trim()) {
      showToast('Please enter a new password', '#FF4C4C');
      return false;
    }
    if (passwords.newPassword.length < 6) {
      showToast('New password must be at least 6 characters long', '#FF4C4C');
      return false;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast('New password and confirm password do not match', '#FF4C4C');
      return false;
    }
    return true;
  };
  console.log(passwords,"token");
  
  const handleApplyChanges = async () => {
    if (validatePasswords()) {
      try {
        const res = await Change_Password(
          passwords.currentPassword,
          passwords.newPassword,
          token
        );

        showToast('Password changed successfully!', '#4BB543');

        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        console.log('Password change request:', {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        });
      } catch (error) {
        console.log('Password change error:', error);

        const errorMsg =
          error?.response?.data?.message ||
          'Failed to change password. Please try again.';
        showToast(errorMsg, '#FF4C4C');
      }
    }
  };

  const renderPasswordField = (label, value, onChangeText, fieldKey) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPasswords[fieldKey]}
          placeholder="••••••••••••"
          placeholderTextColor="#C1C7CD"
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => togglePasswordVisibility(fieldKey)}
        >
          <Icon
            name={showPasswords[fieldKey] ? 'visibility' : 'visibility-off'}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <Toast
        visible={toastVisible}
        message={toastMessage}
        backgroundColor={toastColor}
      />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        {/* ✅ Custom Header */}
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification Pressed')}
          onWalletPress={() => console.log('Wallet Pressed')}
        />

        {/* Back and Title */}
        <View style={styles.headered}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.passwordCard}>
            <View style={styles.cardHeader}>
              <Icon
                name="lock"
                size={24}
                color="grey"
                style={styles.lockIcon}
              />
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>Change Password</Text>
                <Text style={styles.cardSubtitle}>
                  Update Password for enhanced account security.
                </Text>
              </View>
            </View>

            <View style={styles.formContainer}>
              {renderPasswordField(
                'Current Password',
                passwords.currentPassword,
                text => updatePassword('currentPassword', text),
                'currentPassword',
              )}

              {renderPasswordField(
                'New Password',
                passwords.newPassword,
                text => updatePassword('newPassword', text),
                'newPassword',
              )}

              {renderPasswordField(
                'Confirm New Password',
                passwords.confirmPassword,
                text => updatePassword('confirmPassword', text),
                'confirmPassword',
              )}
            </View>
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyChanges}
          >
            <Text style={styles.applyButtonText}>Apply Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  headered: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '700',
    fontFamily: Fonts.family.regular,
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  passwordCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  lockIcon: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 5,
    borderColor: 'grey',
  },
  cardHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: Fonts.family.regular,
  },
  cardSubtitle: {
    fontSize: Fonts.size.PageSubheading,
    color: '#6B7280',
    lineHeight: 16,
    fontFamily: Fonts.family.regular,
  },
  formContainer: {
    marginTop: 8,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#0C0B0B',
    marginBottom: 4,
    fontFamily: Fonts.family.regular,
  },
  required: {
    color: '#EF4444',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    height: 60,
  },
  eyeButton: {
    padding: 12,
  },
  applyButton: {
    backgroundColor: '#7518AA',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: '10%',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    fontFamily: Fonts.family.regular,
  },
});

const toastStyles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 1000,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    maxWidth: width * 0.9,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
