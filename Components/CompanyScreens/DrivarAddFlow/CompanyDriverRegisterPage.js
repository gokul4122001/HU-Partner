import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Fonts from '../../Fonts/Fonts';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import { useCompany } from '../../Context/CompanyContext';
import { Driver_Register } from '../../APICall/CompanyLogin/ServiceFormApi';

const RegistrationForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    age: '',
    contact_no: '',
    email: '',
    address: '',
    driver_type: '',
    license_no: '',
    license_type: '',
    license_validity_date: '',
    issue_date: '',
    mobile_no: '',
    password: '',
    password_confirmation: '',
    acc_holder_name: '',
    bank_name: '',
    bank_branch: '',
    acc_no: '',
    ifsc_code: '',
    agreeToTerms: false,
  });

  const [files, setFiles] = useState({
    profile: [], // Multiple images
    doc_driver_license: null, // Single image
    doc_idproof: null, // Single image
  });

  const [sections, setSections] = useState({
    basic: true,
    license: true,
    account: true,
    bank: true,
    document: true,
  });
  const { token } = useCompany();
  const [dropdownStates, setDropdownStates] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleSection = key => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDropdown = field => {
    setDropdownStates(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectImage = (type, isMultiple = false) => {
    Alert.alert('Select Image', 'Choose an option', [
      { text: 'Camera', onPress: () => openCamera(type, isMultiple) },
      { text: 'Gallery', onPress: () => openGallery(type, isMultiple) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = (type, isMultiple) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    launchCamera(options, response => {
      if (response.assets && response.assets[0]) {
        updateFiles(type, response.assets[0], isMultiple);
      }
    });
  };

  const openGallery = (type, isMultiple) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: isMultiple ? 0 : 1, // 0 = unlimited for multiple
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        if (isMultiple) {
          setFiles(prev => ({
            ...prev,
            [type]: [...prev[type], ...response.assets],
          }));
        } else {
          updateFiles(type, response.assets[0], isMultiple);
        }
      }
    });
  };

  const updateFiles = (type, file, isMultiple) => {
    if (isMultiple) {
      setFiles(prev => ({
        ...prev,
        [type]: [...prev[type], file],
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const removeFile = (type, index = null) => {
    if (index !== null) {
      // Remove from array (for profile images)
      setFiles(prev => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));
    } else {
      // Remove single file
      setFiles(prev => ({
        ...prev,
        [type]: null,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'name',
      'gender',
      'dob',
      'age',
      'contact_no',
      'email',
      'address',
      'driver_type',
      'license_no',
      'license_type',
      'license_validity_date',
      'mobile_no',
      'password',
      'password_confirmation',
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        Alert.alert('Error', `${field.replace('_', ' ')} is required`);
        return false;
      }
    }

    if (formData.password !== formData.password_confirmation) {
      Alert.alert('Error', 'Password and Confirm Password do not match');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    // Validate IFSC code format (if provided)
    if (formData.ifsc_code) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(formData.ifsc_code)) {
        Alert.alert(
          'Error',
          'Please enter a valid IFSC code (e.g., SBIN0001234)',
        );
        return false;
      }
    }

    // Validate license validity date (must be future date)
    const today = new Date();
    const validityDate = new Date(formData.license_validity_date);
    if (validityDate <= today) {
      Alert.alert('Error', 'License validity date must be a future date');
      return false;
    }

    // Validate phone numbers
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contact_no)) {
      Alert.alert('Error', 'Please enter a valid 10-digit contact number');
      return false;
    }

    if (!phoneRegex.test(formData.mobile_no)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }

    if (!formData.agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return false;
    }

    // Validate file uploads
    if (files.profile.length === 0) {
      Alert.alert('Error', 'Please upload at least one profile image');
      return false;
    }

    if (!files.doc_driver_license) {
      Alert.alert('Error', 'Please upload driver license document');
      return false;
    }

    if (!files.doc_idproof) {
      Alert.alert('Error', 'Please upload ID proof document');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'agreeToTerms' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Send only the first profile image (single image)
      if (files.profile.length > 0) {
        formDataToSend.append('profile', {
          uri: files.profile[0].uri,
          type: files.profile[0].type || 'image/jpeg',
          name: files.profile[0].fileName || 'profile.jpg',
        });
      }

      // Add single documents
      if (files.doc_driver_license) {
        formDataToSend.append('doc_driver_license', {
          uri: files.doc_driver_license.uri,
          type: files.doc_driver_license.type || 'image/jpeg',
          name: files.doc_driver_license.fileName || 'driver_license.jpg',
        });
      }

      if (files.doc_idproof) {
        formDataToSend.append('doc_idproof', {
          uri: files.doc_idproof.uri,
          type: files.doc_idproof.type || 'image/jpeg',
          name: files.doc_idproof.fileName || 'id_proof.jpg',
        });
      }

      // API call
      const response = await Driver_Register(token, formDataToSend);

      if (response) {
        Alert.alert('Success', 'Registration completed successfully!', [
          {
            text: 'OK',
            onPress: () => navigation?.navigate('ServiceHospitalDetailScreen'),
          },
        ]);
      } else {
        Alert.alert('Error', response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFilePreview = (type, isMultiple = false) => {
    if (isMultiple) {
      return (
        <View style={styles.filePreviewContainer}>
          {files[type].map((file, index) => (
            <View key={index} style={styles.filePreviewItem}>
              <Image source={{ uri: file.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFile(type, index)}
              >
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    } else {
      const file = files[type];
      if (!file) return null;

      return (
        <View style={styles.singleFilePreview}>
          <Image source={{ uri: file.uri }} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFile(type)}
          >
            <Icon name="close" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#8B5CF6" barStyle="light-content" />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconTextContainer}
          >
            <Icon name="arrow-back" size={24} color="#000" />
            <Text style={styles.headerText}>Driver Registration Form</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Details Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('basic')}
            >
              <Text style={styles.sectionTitle}>Basic Details</Text>
              <Icon
                name={
                  sections.basic ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            {sections.basic && (
              <View style={styles.sectionBody}>
                {/* Driver Name */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Driver Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.name}
                    placeholder="Enter Driver Name"
                    onChangeText={val => handleInputChange('name', val)}
                    placeholderTextColor="#999"
                  />
                </View>

                {/* Gender */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => toggleDropdown('gender')}
                  >
                    <Text
                      style={
                        formData.gender
                          ? styles.pickerText
                          : styles.pickerPlaceholder
                      }
                    >
                      {formData.gender || 'Select Gender'}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={20} color="#999" />
                  </TouchableOpacity>
                  {dropdownStates.gender && (
                    <View style={styles.dropdown}>
                      {['male', 'female', 'other'].map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownItem}
                          onPress={() => {
                            handleInputChange('gender', option);
                            toggleDropdown('gender');
                          }}
                        >
                          <Text style={styles.dropdownText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Date of Birth */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.dob}
                    placeholder="YYYY-MM-DD"
                    onChangeText={val => handleInputChange('dob', val)}
                    placeholderTextColor="#999"
                  />
                </View>

                {/* Age */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.age}
                    placeholder="Enter Age"
                    onChangeText={val => handleInputChange('age', val)}
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                {/* Contact Number */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contact Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.contact_no}
                    placeholder="Enter Phone"
                    onChangeText={val => handleInputChange('contact_no', val)}
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    placeholder="Enter Email"
                    onChangeText={val => handleInputChange('email', val)}
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                  />
                </View>

                {/* Address */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.address}
                    placeholder="Enter Address"
                    onChangeText={val => handleInputChange('address', val)}
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Driver Type */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Driver Type</Text>
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => toggleDropdown('driver_type')}
                  >
                    <Text
                      style={
                        formData.driver_type
                          ? styles.pickerText
                          : styles.pickerPlaceholder
                      }
                    >
                      {formData.driver_type || 'Select Driver Type'}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={20} color="#999" />
                  </TouchableOpacity>
                  {dropdownStates.driver_type && (
                    <View style={styles.dropdown}>
                      {['fulltime', 'parttime', 'freelance'].map(
                        (option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => {
                              handleInputChange('driver_type', option);
                              toggleDropdown('driver_type');
                            }}
                          >
                            <Text style={styles.dropdownText}>{option}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Driving License Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('license')}
            >
              <Text style={styles.sectionTitle}>Driving License Details</Text>
              <Icon
                name={
                  sections.license ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            {sections.license && (
              <View style={styles.sectionBody}>
                {/* License Number */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>License Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.license_no}
                    placeholder="Enter License No"
                    onChangeText={val => handleInputChange('license_no', val)}
                    placeholderTextColor="#999"
                  />
                </View>

                {/* License Type */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>License Type</Text>
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => toggleDropdown('license_type')}
                  >
                    <Text
                      style={
                        formData.license_type
                          ? styles.pickerText
                          : styles.pickerPlaceholder
                      }
                    >
                      {formData.license_type
                        ? `Type ${formData.license_type}`
                        : 'Select License Type'}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={20} color="#999" />
                  </TouchableOpacity>
                  {dropdownStates.license_type && (
                    <View style={styles.dropdown}>
                      {['1', '2', '3', '4'].map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownItem}
                          onPress={() => {
                            handleInputChange('license_type', option);
                            toggleDropdown('license_type');
                          }}
                        >
                          <Text style={styles.dropdownText}>Type {option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* License Validity Date */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>License Validity Date</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.license_validity_date}
                    placeholder="YYYY-MM-DD (Must be future date)"
                    onChangeText={val =>
                      handleInputChange('license_validity_date', val)
                    }
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.helperText}>
                    Enter a date after today
                  </Text>
                </View>

                {/* Issue Date */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Issue Date</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.issue_date}
                    placeholder="YYYY-MM-DD"
                    onChangeText={val => handleInputChange('issue_date', val)}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            )}
          </View>

          {/* Account Credentials Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('account')}
            >
              <Text style={styles.sectionTitle}>Account Credentials</Text>
              <Icon
                name={
                  sections.account ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            {sections.account && (
              <View style={styles.sectionBody}>
                {/* Mobile Number */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.mobile_no}
                    placeholder="Enter Mobile No"
                    onChangeText={val => handleInputChange('mobile_no', val)}
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Create Password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    placeholder="Enter Password"
                    onChangeText={val => handleInputChange('password', val)}
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>

                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.password_confirmation}
                    placeholder="Confirm Password"
                    onChangeText={val =>
                      handleInputChange('password_confirmation', val)
                    }
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>
              </View>
            )}
          </View>

          {/* Bank Details Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('bank')}
            >
              <Text style={styles.sectionTitle}>Bank Account Details</Text>
              <Icon
                name={
                  sections.bank ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            {sections.bank && (
              <View style={styles.sectionBody}>
                {/* Account Holder Name */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Account Holder Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.acc_holder_name}
                    placeholder="Enter Name"
                    onChangeText={val =>
                      handleInputChange('acc_holder_name', val)
                    }
                    placeholderTextColor="#999"
                  />
                </View>

                {/* Bank Name */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bank Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.bank_name}
                    placeholder="Enter Bank Name"
                    onChangeText={val => handleInputChange('bank_name', val)}
                    placeholderTextColor="#999"
                  />
                </View>

                {/* Bank Branch */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bank Branch</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.bank_branch}
                    placeholder="Enter Branch"
                    onChangeText={val => handleInputChange('bank_branch', val)}
                    placeholderTextColor="#999"
                  />
                </View>

                {/* Account Number */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Account Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.acc_no}
                    placeholder="Enter Account Number"
                    onChangeText={val => handleInputChange('acc_no', val)}
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                {/* IFSC Code */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>IFSC Code</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.ifsc_code}
                    placeholder="Enter IFSC Code (e.g., SBIN0001234)"
                    onChangeText={val =>
                      handleInputChange('ifsc_code', val.toUpperCase())
                    }
                    placeholderTextColor="#999"
                    autoCapitalize="characters"
                  />
                  <Text style={styles.helperText}>
                    Format: 4 letters + 0 + 6 characters
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Document Upload Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('document')}
            >
              <Text style={styles.sectionTitle}>Document Upload</Text>
              <Icon
                name={
                  sections.document
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            {sections.document && (
              <View style={styles.sectionBody}>
                {/* Profile Images (Multiple) */}
                <View style={styles.uploadSection}>
                  <Text style={styles.label}>
                    Upload Profile Images (Multiple)
                  </Text>
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => selectImage('profile', true)}
                  >
                    <Icon name="cloud-upload" size={28} color="#8B5CF6" />
                    <Text style={styles.uploadText}>Upload Profile Images</Text>
                  </TouchableOpacity>
                  {renderFilePreview('profile', true)}
                </View>

                {/* Driver License (Single) */}
                <View style={styles.uploadSection}>
                  <Text style={styles.label}>Upload Driver License</Text>
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => selectImage('doc_driver_license', false)}
                  >
                    <Icon name="cloud-upload" size={28} color="#8B5CF6" />
                    <Text style={styles.uploadText}>Upload Driver License</Text>
                  </TouchableOpacity>
                  {renderFilePreview('doc_driver_license', false)}
                </View>

                {/* ID Proof (Single) */}
                <View style={styles.uploadSection}>
                  <Text style={styles.label}>
                    Upload ID Proof (Aadhar, Passport, etc.)
                  </Text>
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => selectImage('doc_idproof', false)}
                  >
                    <Icon name="cloud-upload" size={28} color="#8B5CF6" />
                    <Text style={styles.uploadText}>Upload ID Proof</Text>
                  </TouchableOpacity>
                  {renderFilePreview('doc_idproof', false)}
                </View>
              </View>
            )}
          </View>

          {/* Agreement */}
          <View style={styles.agreement}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() =>
                handleInputChange('agreeToTerms', !formData.agreeToTerms)
              }
            >
              <View
                style={[
                  styles.checkbox,
                  formData.agreeToTerms && styles.checkedBox,
                ]}
              >
                {formData.agreeToTerms && (
                  <Icon name="check" size={16} color="white" />
                )}
              </View>
              <Text style={styles.agreeText}>
                I agree to terms and conditions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topBackground: {
    flex: 1,
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#7416B2',
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  section: {
    marginBottom: 10,
    borderRadius: 5,
  },
  sectionHeader: {
    backgroundColor: '#7416B2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Fonts.size.PageSubheading,
    alignContent: 'center',
  },
  sectionBody: {
    padding: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: Fonts.size.PageSubheading,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: Fonts.size.PageSubheading,
    backgroundColor: '#F8F8F8',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#F8F8F8',
  },
  pickerText: {
    fontSize: 13,
    color: '#333',
  },
  pickerPlaceholder: {
    fontSize: 13,
    color: '#999',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 2,
    borderRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 13,
    color: '#333',
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  uploadText: {
    fontSize: Fonts.size.PageSubheading,
    color: '#777',
    marginTop: 5,
  },
  filePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  filePreviewItem: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  singleFilePreview: {
    position: 'relative',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreement: {
    marginTop: 20,
    marginBottom: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedBox: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  agreeText: {
    fontSize: Fonts.size.PageSubheading,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#7416B2',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 25,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Fonts.size.PageSubheading,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default RegistrationForm;
