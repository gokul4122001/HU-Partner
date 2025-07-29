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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RegistrationForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    driverName: '',
    gender: '',
    dob: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    driverType: '',
    experience: '',
    licenseNo: '',
    licenseType: '',
    enterNumber: '',
    licenseValidity: '',
    password: '',
    confirmPassword: '',
    bankHolder: '',
    bankName: '',
    bankBranch: '',
    accountNumber: '',
    ifsc: '',
    agreeToTerms: false,
  });

  const [sections, setSections] = useState({
    basic: true,
    license: true,
    account: true,
    bank: true,
    document: true,
  });

  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (type) => {
    Alert.alert('Upload File', `Select ${type}`, [
      { text: 'Camera', onPress: () => {} },
      { text: 'Gallery', onPress: () => {} },
      { text: 'Document', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    if (!formData.agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return;
    }

    Alert.alert('Success', 'Form Submitted', [
      {
        text: 'OK',
        onPress: () => navigation?.navigate('ServiceHospitalDetailScreen'),
      },
    ]);
  };

  const InputField = ({ label, field, placeholder }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={formData[field]}
        placeholder={placeholder}
        onChangeText={(val) => handleInputChange(field, val)}
        placeholderTextColor="#999"
      />
    </View>
  );

  const PickerField = ({ label, selectedValue, onValueChange, options, placeholder }) => {
    const [open, setOpen] = useState(false);

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => setOpen(!open)}
        >
          <Text style={selectedValue ? styles.pickerText : styles.pickerPlaceholder}>
            {selectedValue || placeholder}
          </Text>
          <Icon name="keyboard-arrow-down" size={20} color="#999" />
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onValueChange(option);
                  setOpen(false);
                }}
              >
                <Text style={styles.dropdownText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const UploadField = ({ label, onPress }) => (
    <TouchableOpacity style={styles.uploadBox} onPress={onPress}>
      <Icon name="cloud-upload" size={28} color="#8B5CF6" />
      <Text style={styles.uploadText}>{label}</Text>
    </TouchableOpacity>
  );

  const Section = ({ title, children, sectionKey }) => (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(sectionKey)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon
          name={sections[sectionKey] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      {sections[sectionKey] && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: -0, y: 0.3 }}
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
        >
          {/* Basic Details */}
          <Section title="Basic Details" sectionKey="basic">
            <InputField label="Driver Name" field="driverName" placeholder="Enter Driver Name" />
            <PickerField
              label="Gender"
              selectedValue={formData.gender}
              onValueChange={(val) => handleInputChange('gender', val)}
              options={['Male', 'Female', 'Other']}
              placeholder="Select Gender"
            />
            <InputField label="Date of Birth" field="dob" placeholder="DD/MM/YYYY" />
            <InputField label="Age" field="age" placeholder="Enter Age" />
            <InputField label="Contact Number" field="phone" placeholder="Enter Phone" />
            <InputField label="Email" field="email" placeholder="Enter Email" />
            <InputField label="Address" field="address" placeholder="Enter Address" />
            <PickerField
              label="Driver Type"
              selectedValue={formData.driverType}
              onValueChange={(val) => handleInputChange('driverType', val)}
              options={['Professional', 'Personal', 'Commercial']}
              placeholder="Select Driver Type"
            />
            <InputField label="Years of Experience" field="experience" placeholder="Enter Experience" />
          </Section>

          {/* Driving License */}
          <Section title="Driving License Details" sectionKey="license">
            <InputField label="License No" field="licenseNo" placeholder="Enter License No" />
            <PickerField
              label="License Type"
              selectedValue={formData.licenseType}
              onValueChange={(val) => handleInputChange('licenseType', val)}
              options={['LMV', 'HMV', 'Transport', 'Commercial']}
              placeholder="Select License Type"
            />
            <InputField label="Enter Number" field="enterNumber" placeholder="Enter Number" />
            <InputField label="License Validity Date" field="licenseValidity" placeholder="DD/MM/YYYY" />
          </Section>

          {/* Account Credentials */}
          <Section title="Account Credentials" sectionKey="account">
            <InputField label="Create Password" field="password" placeholder="Enter Password" />
            <InputField label="Confirm Password" field="confirmPassword" placeholder="Confirm Password" />
          </Section>

          {/* Bank Details */}
          <Section title="Bank Account Details" sectionKey="bank">
            <InputField label="Account Holder Name" field="bankHolder" placeholder="Enter Name" />
            <InputField label="Bank Name" field="bankName" placeholder="Enter Bank Name" />
            <InputField label="Bank Branch" field="bankBranch" placeholder="Enter Branch" />
            <InputField label="Account Number" field="accountNumber" placeholder="Enter Account Number" />
            <InputField label="IFSC Code" field="ifsc" placeholder="Enter IFSC Code" />
          </Section>

          {/* Document Upload */}
          <Section title="Document Upload" sectionKey="document">
            <UploadField label="Upload Driver License" onPress={() => handleFileUpload('Driver License')} />
            <UploadField label="Upload ID Proof (Aadhar, Passport, etc.)" onPress={() => handleFileUpload('ID Proof')} />
            <UploadField label="Upload Profile Image" onPress={() => handleFileUpload('Profile Image')} />
          </Section>

          {/* Agreement */}
          <View style={styles.agreement}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
            >
              <View style={[styles.checkbox, formData.agreeToTerms && styles.checkedBox]}>
                {formData.agreeToTerms && <Icon name="check" size={16} color="white" />}
              </View>
              <Text style={styles.agreeText}>I agree to terms and conditions</Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
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
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 10, // spacing between icon and text
},


  scroll: { flex: 1, marginTop: 10 },
  section: { marginBottom: 10, backgroundColor: '#fff', borderRadius: 5 },
  sectionHeader: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  sectionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  sectionBody: { padding: 15 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 13, color: '#333', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 13,
    backgroundColor: '#F8F8F8',
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
  pickerText: { fontSize: 13, color: '#333' },
  pickerPlaceholder: { fontSize: 13, color: '#999' },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 2,
    borderRadius: 4,
  },
  dropdownItem: { padding: 10 },
  dropdownText: { fontSize: 13, color: '#333' },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  uploadText: { fontSize: 12, color: '#777', marginTop: 5 },
  agreement: { marginTop: 20, marginBottom: 15 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
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
  checkedBox: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  agreeText: { fontSize: 13, color: '#333' },
  submitButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 25,
  },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});

export default RegistrationForm;
