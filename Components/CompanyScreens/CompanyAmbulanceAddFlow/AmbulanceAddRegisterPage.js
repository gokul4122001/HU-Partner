import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '../../Fonts/Fonts';

const RegistrationForm = ({ navigation }) => {
  const [basicDetailsExpanded, setBasicDetailsExpanded] = useState(true);
  const [verificationExpanded, setVerificationExpanded] = useState(true);
  const [formData, setFormData] = useState({
    ambulanceName: '',
    ambulanceType: '',
    vehicleNumberPlate: '',
    facility: '',
    fcDetails: '',
    insuranceDetails: '',
    agreeToTerms: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (type) => {
    Alert.alert('Upload File', `Select ${type} file to upload`, [
      { text: 'Camera', onPress: () => console.log('Camera selected') },
      { text: 'Gallery', onPress: () => console.log('Gallery selected') },
      { text: 'Document', onPress: () => console.log('Document selected') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    if (!formData.agreeToTerms) {
      Alert.alert('Error', 'Please agree to Terms & Conditions');
      return;
    }

    Alert.alert('Success', 'Registration form submitted successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Company3'),
      },
    ]);
  };

  const ExpandableSection = ({ title, expanded, onToggle, children }) => (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={expanded ? "expand-less" : "expand-more"} size={24} color="white" />
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );

  const InputField = ({ label, placeholder, value, onChangeText, multiline = false }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  const PickerField = ({ label, placeholder, selectedValue, onValueChange, options }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={[styles.pickerText, !selectedValue && styles.placeholderText]}>
            {selectedValue || placeholder}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onValueChange(option);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const UploadField = ({ title, subtitle, onPress }) => (
    <View style={styles.uploadContainer}>
      <Text style={styles.uploadTitle}>{title}</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
        <Icon name="cloud-upload" size={32} color="#7B3F98" />
        <Text style={styles.uploadSubtitle}>{subtitle}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#7B3F98" />

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={30} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Registration Form</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 110 }}
          showsVerticalScrollIndicator={false}
        >
          <ExpandableSection
            title="Basic Details"
            expanded={basicDetailsExpanded}
            onToggle={() => setBasicDetailsExpanded(!basicDetailsExpanded)}
          >
            <InputField
              label="Ambulance Name"
              placeholder="Enter Ambulance Name"
              value={formData.ambulanceName}
              onChangeText={(value) => handleInputChange('ambulanceName', value)}
            />
            <PickerField
              label="Ambulance Type"
              placeholder="Select Ambulance Type"
              selectedValue={formData.ambulanceType}
              onValueChange={(value) => handleInputChange('ambulanceType', value)}
              options={['Basic Life Support', 'Advanced Life Support', 'Critical Care Transport']}
            />
            <InputField
              label="Vehicle Number Plate"
              placeholder="Enter Vehicle Number Plate"
              value={formData.vehicleNumberPlate}
              onChangeText={(value) => handleInputChange('vehicleNumberPlate', value)}
            />
            <PickerField
              label="Facility"
              placeholder="Select Facility"
              selectedValue={formData.facility}
              onValueChange={(value) => handleInputChange('facility', value)}
              options={['Hospital A', 'Hospital B', 'Clinic C', 'Medical Center D']}
            />
            <InputField
              label="FC Details"
              placeholder="Enter FC Details"
              value={formData.fcDetails}
              onChangeText={(value) => handleInputChange('fcDetails', value)}
              multiline={true}
            />
            <InputField
              label="Insurance Details"
              placeholder="Enter Insurance Details"
              value={formData.insuranceDetails}
              onChangeText={(value) => handleInputChange('insuranceDetails', value)}
              multiline={true}
            />
          </ExpandableSection>

          <ExpandableSection
            title="Verification & Agreement"
            expanded={verificationExpanded}
            onToggle={() => setVerificationExpanded(!verificationExpanded)}
          >
            <UploadField
              title="Upload Ambulance RC Book"
              subtitle="Upload PDF, IMG, JPG"
              onPress={() => handleFileUpload('RC Book')}
            />
            <UploadField
              title="Upload Ambulance Insurance"
              subtitle="Upload PDF, IMG, JPG"
              onPress={() => handleFileUpload('Insurance')}
            />
            <UploadField
              title="Upload Ambulance Image"
              subtitle="Upload PDF, IMG, JPG"
              onPress={() => handleFileUpload('Image')}
            />
            <View style={styles.agreementContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
              >
                <View style={[styles.checkbox, formData.agreeToTerms && styles.checkboxChecked]}>
                  {formData.agreeToTerms && (
                    <Icon name="check" size={16} color="white" />
                  )}
                </View>
                <Text style={styles.agreementText}>
                  Agree to Terms & Conditions (
                  <Text style={styles.clickHereText}>Click here</Text>
                  <Text style={styles.agreementText}> )</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ExpandableSection>

          <View style={styles.bottomSpacing} />
          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
   topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  container: {
    flex: 1,
  },
  header: {
  paddingTop: hp('5%'),
  flexDirection:'row'
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#7518AA',
      fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  left:10,
  alignItems:'center'
 
  },
  placeholder: {
    width: 28,
  },
  scrollView: {
    flex: 1,
  top:'2%'
  },
  sectionContainer: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    backgroundColor: '#7518AA',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: 'white',
     fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  },
  sectionContent: {
  
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    marginVertical: 8,
  },
  inputLabel: {
     fontSize: Fonts.size.PageHeading,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
   fontSize: Fonts.size.PageSubheading,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
  fontSize: Fonts.size.PageSubheading,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  uploadContainer: {
    marginVertical: 8,
  },
  uploadTitle: {
 fontSize: Fonts.size.PageHeading,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  uploadSubtitle: {
   fontSize: Fonts.size.PageSubheading,
    color: '#999',
    marginTop: 8,
  },
  agreementContainer: {
    marginVertical: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#7B3F98',
    borderColor: '#7B3F98',
  },
  agreementText: {
    fontSize: Fonts.size.PageSubheading,
    color: '#666',
    flex: 1,
  },
  clickHereText: {
    color: '#7B3F98',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
  submitContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  submitButton: {
    backgroundColor: '#7518AA',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
   fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  },
});

export default RegistrationForm;
