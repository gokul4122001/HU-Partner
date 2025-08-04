// ServiceSelectionForm.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Modal,
  FlatList,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../../Header';
import Fonts from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import {
  Company_Profile,
  Company_Profile_update,
  getDistric,
  getStates,
} from '../../APICall/CompanyLogin/ServiceFormApi';
import { useCompany } from '../../Context/CompanyContext';
import { IMAGE_URL } from '../Config';
import { launchImageLibrary } from 'react-native-image-picker';
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

const ServiceSelectionForm = ({ navigation }) => {
  const { token } = useSelector(state => state.auth);
  const { companyProfile, setCompanyProfile, setToken } = useCompany();
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    emailAddress: '',
    service: 'Ambulance',
    state: '',
    city: '',
    profile_photo: null,
  });

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#4BB543');

  const services = [
    { id: 1, name: 'Ambulance' },
    { id: 2, name: 'Fire Department' },
    { id: 3, name: 'Police' },
    { id: 4, name: 'Medical Emergency' },
    { id: 5, name: 'Hospital' },
    { id: 6, name: 'Pharmacy' },
  ];

  useEffect(() => {
    if (formData?.state) {
      fetchDistData(formData?.state);
    }
  }, [formData?.state]);

  const showToast = (msg, color) => {
    setToastVisible(false);
    setTimeout(() => {
      setToastMessage(msg);
      setToastColor(color);
      setToastVisible(true);
    }, 100);
  };

  const fetchDistData = async id => {
    const resDist = await getDistric(id);
    setDistrictData(resDist?.districts);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = useCallback(async () => {
    const { name, contactNumber, emailAddress, service, state, city } =
      formData;

    if (
      !name ||
      !contactNumber ||
      !emailAddress ||
      !service ||
      !state ||
      !city
    ) {
      showToast('Please fill in all fields', '#FF3B30');
      return;
    }

    if (name.trim().length < 2) {
      showToast('Name must be at least 2 characters', '#FF3B30');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactNumber)) {
      showToast('Enter a valid 10-digit contact number', '#FF3B30');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      showToast('Enter a valid email address', '#FF3B30');
      return;
    }

    if (typeof service !== 'string' && !services.some(s => s.id === service)) {
      showToast('Please select a valid service', '#FF3B30');
      return;
    }

    if (state === null) {
      showToast('Please select a valid state', '#FF3B30');
      return;
    }

    if (city === null) {
      showToast('Please select a valid city', '#FF3B30');
      return;
    }

    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('email', formData.emailAddress);
    newFormData.append('mobile', formData.contactNumber);
    newFormData.append('state', formData.state);
    newFormData.append('district', formData.city);
    if (
      formData?.profile_photo &&
      typeof formData.profile_photo === 'object' &&
      formData.profile_photo.uri
    ) {
      newFormData.append('profile_photo', {
        uri: formData.profile_photo.uri,
        type: formData.profile_photo.type || 'image/jpeg',
        name: formData.profile_photo.name || 'upload.jpg',
      });
    }

    try {
      const res = await Company_Profile_update(newFormData);
      const token = res?.access_token;
      if (!token) {
        throw new Error('Token not received from registration');
      }
      setToken(token);
      await AsyncStorage.setItem('token', token);
      const profileRes = await Company_Profile(token);
      const profileData = profileRes?.data;

      if (profileData) {
        setCompanyProfile(profileData);
        showToast('Form submitted successfully!', '#4BB543');
        // if (profileData?.approved === 1) {
        //   navigation.navigate('LoginAccoundScreen');
        // } else if (profileData?.approved === 0) {
        //   setTimeout(() => {
        //     setShowNoteModal(true);
        //   }, 1000);
        // }
      } else {
        throw new Error('Failed to load profile data');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast(
        error?.message || 'An error occurred during registration',
        '#FF3B30',
      );
    }
  }, [formData, setCompanyProfile, setToken]);

  const fetchData = async () => {
    const resState = await getStates();
    setStateData(resState?.data);
    if (companyProfile) {
      setFormData({
        name: companyProfile?.name,
        emailAddress: companyProfile?.email,
        contactNumber: companyProfile?.mobile,
        service: companyProfile?.service,
        state: companyProfile?.state_id,
        city: companyProfile?.district_id,
        profile_photo: companyProfile?.profile_photo,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectProfileImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
      } else {
        const asset = response.assets?.[0];
        if (asset?.uri) {
          handleInputChange('profile_photo', {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName || 'profile.jpg',
          });
        }
      }
    });
  };

  const renderDropdownModal = (
    visible,
    setVisible,
    data,
    selectedValue,
    onSelect,
    placeholder,
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{placeholder}</Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedValue === item?.id && styles.selectedModalItem,
                ]}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selectedValue === item?.id && styles.selectedModalItemText,
                  ]}
                >
                  {item?.district_name || item?.state_name || item?.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B5CF6" barStyle="light-content" />
      <Toast
        visible={toastVisible}
        message={toastMessage}
        backgroundColor={toastColor}
      />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: -0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification pressed')}
          onWalletPress={() => console.log('Wallet pressed')}
        />

        <View style={styles.header1}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          {!formData.profile_photo?.uri && !companyProfile?.profile_photo ? (
            <Image
              source={require('../../Assets/profile.png')}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={{
                uri:
                  formData.profile_photo?.uri ||
                  (companyProfile?.profile_photo
                    ? `${IMAGE_URL}${companyProfile?.profile_photo}`
                    : null),
              }}
              style={styles.profileImage}
            />
          )}

          <TouchableOpacity
            style={styles.editIcon}
            onPress={selectProfileImage}
          >
            <Icon name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              {[
                { label: 'Name', key: 'name' },
                { label: 'Contact Number', key: 'contactNumber' },
                { label: 'Email Address', key: 'emailAddress' },
              ].map((item, i) => (
                <View style={styles.inputGroup} key={i}>
                  <Text style={styles.label}>{item.label}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={`Enter ${item.label}`}
                    value={formData[item.key]}
                    onChangeText={text => handleInputChange(item.key, text)}
                    keyboardType={
                      item.key === 'contactNumber'
                        ? 'phone-pad'
                        : item.key === 'emailAddress'
                        ? 'email-address'
                        : 'default'
                    }
                  />
                </View>
              ))}

              {[
                {
                  label: 'Service',
                  value: formData.service,
                  onPress: null,
                },
                {
                  label: 'State',
                  value:
                    stateData.find(item => item.id === formData.state)
                      ?.state_name || 'Select state',
                  onPress: () => setShowStateModal(true),
                },
                {
                  label: 'City',
                  value:
                    districtData.find(item => item.id === formData.city)
                      ?.district_name || 'Select city',
                  onPress: () => setShowCityModal(true),
                },
              ].map((item, index) => (
                <View style={styles.inputGroup} key={index}>
                  <Text style={styles.label}>{item.label}</Text>
                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={item.onPress}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        (item.value === 'Select state' ||
                          item.value === 'Select city') &&
                          styles.placeholderText,
                      ]}
                    >
                      {item.value}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {renderDropdownModal(
          showServiceModal,
          setShowServiceModal,
          services,
          formData.service,
          value => handleInputChange('service', value),
          'Select Service',
        )}
        {renderDropdownModal(
          showStateModal,
          setShowStateModal,
          stateData,
          formData.state,
          value => handleInputChange('state', value?.id),
          'Select State',
        )}
        {renderDropdownModal(
          showCityModal,
          setShowCityModal,
          districtData,
          formData.city,
          value => handleInputChange('city', value?.id),
          'Select City',
        )}

        {/* <Modal
          visible={showNoteModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowNoteModal(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.noteModal}>
              <Text style={styles.noteTitle}>Note</Text>
              <Text style={styles.noteMessage}>
                Once your request form is approved by the admin, you will be
                granted access to use as Vendor
              </Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowNoteModal(false);
                  navigation.navigate('Login6');
                }}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#7C3AED']}
                  style={styles.cancelButtonGradient}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: '3%',
  },
  backButton: {
    marginRight: width * 0.04,
  },
  headerTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#7416B2',
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    top: 10,
  },
  inputGroup: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#4F4C4C',
    marginBottom: height * 0.02,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    fontSize: Fonts.size.PageSubheading,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: Fonts.size.PageSubheading,
    color: '#333333',
    flex: 1,
  },
  placeholderText: {
    color: '#A0A0A0',
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: height * 0.01,
    alignItems: 'center',
    marginTop: height * 0.03,
    marginHorizontal: width * 0.02,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  modalItem: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.018,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedModalItem: {
    backgroundColor: '#F3E8FF',
  },
  modalItemText: {
    fontSize: width * 0.04,
    color: '#333333',
  },
  selectedModalItemText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },

  // NOTE MODAL
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteModal: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 10,
    height: '30%',
  },
  noteTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6B21A8',
    marginBottom: 20,
  },
  noteMessage: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 30,
  },
  cancelButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 40,
  },
  cancelButtonGradient: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: { alignItems: 'center', marginBottom: 20, top: 10 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: width / 2 - 60,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: wp('10%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  greeting: {
    fontSize: Fonts.size.TopHeading,
    color: 'black',
    opacity: 0.9,
    fontFamily: Fonts.family.regular,
  },
  userName: {
    fontSize: Fonts.size.TopSubheading,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: Fonts.family.regular,
  },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
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
export default ServiceSelectionForm;
