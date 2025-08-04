import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Animated,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TextInputComponent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../Fonts/Fonts';
import FilePickerManager from 'react-native-file-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { Ambulance_Edit, Ambulance_Register } from '../../APICall/CompanyLogin/ServiceFormApi';

const Toast = ({ visible, message, backgroundColor }) => {
  const slideAnim = useState(new Animated.Value(-100))[0];

  React.useEffect(() => {
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

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 50,
        left: '5%',
        right: '5%',
        backgroundColor,
        padding: 15,
        borderRadius: 8,
        zIndex: 999,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
        {message}
      </Text>
    </Animated.View>
  );
};

// Helper functions
const getFileExtension = filename => {
  return filename?.split('.').pop()?.toLowerCase() || '';
};

const getFileIcon = filename => {
  const ext = getFileExtension(filename);
  switch (ext) {
    case 'pdf':
      return 'picture-as-pdf';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image';
    default:
      return 'description';
  }
};

const formatFileSize = bytes => {
  if (!bytes) return '';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const AmbulanceAddRegisterPage = ({ navigation, route }) => {
  const [basicDetailsExpanded, setBasicDetailsExpanded] = useState(true);
  const [verificationExpanded, setVerificationExpanded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#FF3B30');
  const editData = route?.params?.item;

  const [formData, setFormData] = useState({
    amb_number: '',
    amb_type_id: '',
    registration_number: '',
    amb_number_plate: '',
    fc_details: '',
    amb_name: '',
    ins_policy_no: '',
    doc_rc_book: [],
    doc_insurance: [],
    amb_profile: [],
    agreeToTerms: false,
  });

  const { token } = useSelector(state => state.auth);

  const ambulanceTypes = [
    { id: '1', label: 'Basic Life Support' },
    { id: '2', label: 'Advanced Life Support' },
    { id: '3', label: 'Critical Care Transport' },
  ];

  const showToast = useCallback((msg, color = '#FF3B30') => {
    setToastMessage(msg);
    setToastColor(color);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  }, []);


  useEffect(() => {
    if (editData) {
      setFormData({
        amb_number: editData.amb_number || '',
        amb_type_id: editData.amb_type_id || '',
        registration_number: editData.registration_number || '',
        amb_number_plate: editData.amb_number_plate || '',
        fc_details: editData.fc_details || '',
        amb_name: editData.amb_name || '',
        ins_policy_no: editData.ins_policy_no || '',
        doc_rc_book: editData.doc_rc_book
          ? Array.isArray(editData.doc_rc_book)
            ? editData.doc_rc_book
            : [editData.doc_rc_book]
          : [],
        doc_insurance: editData.doc_insurance
          ? Array.isArray(editData.doc_insurance)
            ? editData.doc_insurance
            : [editData.doc_insurance]
          : [],
        amb_profile: editData.amb_profile || [],
      });
    }
  }, [editData]);

  const handleFilePick = useCallback(
    (fileKey, title) => {
      const isSingleFile =
        fileKey === 'doc_rc_book' || fileKey === 'doc_insurance';

      launchImageLibrary(
        {
          mediaType: 'mixed',
          selectionLimit: isSingleFile ? 1 : 0,
          includeBase64: false,
        },
        response => {
          if (response.didCancel) return;
          if (response.errorCode) {
            return showToast('File picking error: ' + response.errorMessage);
          }

          const allowed = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/pdf',
          ];

          const validFiles = (response.assets || []).filter(asset => {
            if (!asset.uri) return false;
            if (asset.fileSize > 10 * 1024 * 1024) {
              showToast(`"${asset.fileName}" is too large (max 10MB)`);
              return false;
            }
            if (asset.type && !allowed.includes(asset.type)) {
              showToast(`"${asset.fileName}" type not allowed`);
              return false;
            }
            return true;
          });

          if (validFiles.length === 0)
            return showToast('No valid file selected');

          setFormData(prevData => ({
            ...prevData,
            [fileKey]: isSingleFile
              ? [
                  {
                    uri: validFiles[0].uri,
                    type: validFiles[0].type,
                    name: validFiles[0].fileName || `${fileKey}_${Date.now()}`,
                    size: validFiles[0].fileSize,
                  },
                ]
              : [
                  ...(prevData[fileKey] || []),
                  ...validFiles.map(asset => ({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || `${fileKey}_${Date.now()}`,
                    size: asset.fileSize,
                  })),
                ],
          }));

          showToast(
            `${validFiles.length} file(s) added to ${title}`,
            '#4BB543',
          );
        },
      );
    },
    [showToast],
  );

  const handleSubmit = useCallback(async () => {
    if (!formData.amb_number.trim())
      return showToast('Enter ambulance number.');
    if (!formData.amb_name.trim()) return showToast('Enter ambulance name.');
    if (!formData.amb_type_id.trim())
      return showToast('Select ambulance type.');
    if (!formData.registration_number.trim())
      return showToast('Enter registration number.');
    if (!formData.amb_number_plate.trim())
      return showToast('Enter number plate.');
    if (!formData.fc_details.trim()) return showToast('Enter FC details.');
    if (!formData.ins_policy_no.trim())
      return showToast('Enter insurance policy number.');
    if (!formData.doc_rc_book) return showToast('Upload RC Book.');
    if (!formData.doc_insurance) return showToast('Upload Insurance.');
    if (!formData.amb_profile) return showToast('Upload Ambulance Image.');
    if (!formData.agreeToTerms) return showToast('Please agree to the terms.');
    setIsSubmitting(true);

    try {
      const data = new FormData();

      if (editData?.id) {
        // Add id for edit API
        data.append('id', editData.id.toString());
      }

      // Append text fields
      data.append('amb_number', formData.amb_number);
      data.append('amb_type_id', formData.amb_type_id);
      data.append('registration_number', formData.registration_number);
      data.append('amb_number_plate', formData.amb_number_plate);
      data.append('fc_details', formData.fc_details);
      data.append('amb_name', formData.amb_name);
      data.append('ins_policy_no', formData.ins_policy_no);

      // Handle doc_rc_book and doc_insurance (single files arrays)
      ['doc_rc_book', 'doc_insurance'].forEach(field => {
        const files = formData[field] || [];
        files.forEach((file, index) => {
          if (typeof file === 'string') {
            // Existing URL - send as is or use a separate API field if backend expects this
            // For example, send as a string:
            // You may want to send this in a JSON field:
            data.append(`${field}_existing[]`, file);
          } else {
            // New file
            data.append(field, {
              uri:
                Platform.OS === 'ios'
                  ? file.uri.replace('file://', '')
                  : file.uri,
              type: file.type,
              name: file.name,
            });
          }
        });
      });

      // Handle amb_profile (multiple files)
      const profileFiles = formData.amb_profile || [];
      profileFiles.forEach(file => {
        if (typeof file === 'string') {
          data.append('amb_profile_existing[]', file);
        } else {
          data.append('amb_profile[]', {
            uri:
              Platform.OS === 'ios'
                ? file.uri.replace('file://', '')
                : file.uri,
            type: file.type,
            name: file.name,
          });
        }
      });

      // Call correct API
      const response = editData?.id
        ? await Ambulance_Edit(token, data)
        : await Ambulance_Register(token, data);

      if (response) {
        showToast(
          editData?.id ? 'Update successful!' : 'Registration successful!',
          '#4BB543',
        );
        setTimeout(() => navigation.goBack(), 700);
      } else {
        showToast(
          editData?.id
            ? 'Update failed. Try again.'
            : 'Registration failed. Try again.',
        );
      }
    } catch (error) {
      console.log(error);
      showToast(editData?.id ? 'Error updating!' : 'Error registering!');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, token, navigation, showToast]);
 
 
 
  const UploadField = React.memo(({ title, fileKey }) => {
    const files = formData[fileKey] || [];

    const handleUpload = useCallback(() => {
      handleFilePick(fileKey, title);
    }, [fileKey, title]);

    const handleRemove = useCallback(
      index => {
        setFormData(prevData => {
          const newFiles = [...(prevData[fileKey] || [])];
          newFiles.splice(index, 1);
          return {
            ...prevData,
            [fileKey]: newFiles,
          };
        });
      },
      [fileKey],
    );

    return (
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>{title}</Text>

        {files.length === 0 ? (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUpload}
            activeOpacity={0.8}
          >
            <Icon name="cloud-upload" size={32} color="#7B3F98" />
            <Text style={styles.uploadSubtitle}>
              Upload PDF, JPG, JPEG, PNG
            </Text>
            <Text style={styles.uploadHint}>Max file size: 10MB</Text>
          </TouchableOpacity>
        ) : (
          <>
            {files.map((file, index) => {
              const isExistingUrl = typeof file === 'string';
              const fileName = isExistingUrl
                ? file.split('/').pop()
                : file.name;
              return (
                <View
                  key={index.toString()}
                  style={styles.filePreviewContainer}
                >
                  <View style={styles.fileInfo}>
                    <Icon
                      name={getFileIcon(fileName)}
                      size={24}
                      color="#7B3F98"
                    />
                    <View style={styles.fileDetails}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {fileName}
                      </Text>
                      {!isExistingUrl && (
                        <Text style={styles.fileSize}>
                          {formatFileSize(file.size)}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.fileActions}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemove(index)}
                      activeOpacity={0.8}
                    >
                      <Icon name="delete" size={18} color="#FF3B30" />
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            {fileKey !== 'doc_rc_book' && fileKey !== 'doc_insurance' && (
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={handleUpload}
                activeOpacity={0.8}
              >
                <Icon name="add" size={18} color="#7B3F98" />
                <Text style={styles.addMoreText}>Add More</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  });

  const PickerField = React.memo(
    ({ label, placeholder, selectedValue, onValueChange, options }) => {
      const [showDropdown, setShowDropdown] = useState(false);

      const handleToggleDropdown = useCallback(() => {
        setShowDropdown(prev => !prev);
      }, []);

      const handleSelectOption = useCallback(
        option => {
          onValueChange(option);
          setShowDropdown(false);
        },
        [onValueChange],
      );

      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={handleToggleDropdown}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.pickerText,
                !selectedValue && styles.placeholderText,
              ]}
            >
              {selectedValue || placeholder}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={`option-${index}`}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectOption(option)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      );
    },
  );

  return (
    <View style={{ flex: 1 }}>
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
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#7B3F98" />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Icon name="arrow-back" size={30} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Registration Form</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 110 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            removeClippedSubviews={false}
            nestedScrollEnabled={true}
          >
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setBasicDetailsExpanded(!basicDetailsExpanded)}
                activeOpacity={0.8}
              >
                <Text style={styles.sectionTitle}>{'Basic Details'}</Text>
                <Icon
                  name={basicDetailsExpanded ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <View style={styles.sectionContent}>
                {basicDetailsExpanded &&
                  [
                    {
                      label: 'Ambulance Number',
                      placeholder: 'Enter Ambulance Number',
                      value: formData.amb_number,
                      onChangeText: v => handleInputChange('amb_number', v),
                    },
                    {
                      label: 'Ambulance Name',
                      placeholder: 'Enter Ambulance Name',
                      value: formData.amb_name,
                      onChangeText: v => handleInputChange('amb_name', v),
                    },
                  ].map((item, index) => (
                    <View style={styles.inputContainer} key={index.toString()}>
                      <Text style={styles.inputLabel}>{item?.label}</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          item?.multiline && styles.multilineInput,
                        ]}
                        placeholder={item?.placeholder}
                        placeholderTextColor="#999"
                        value={item?.value}
                        onChangeText={item?.onChangeText}
                        multiline={item?.multiline}
                        numberOfLines={item?.multiline ? 3 : 1}
                        textAlignVertical={item?.multiline ? 'top' : 'center'}
                        returnKeyType={item?.multiline ? 'default' : 'next'}
                        blurOnSubmit={item?.multiline}
                      />
                    </View>
                  ))}
                <PickerField
                  label="Ambulance Type"
                  placeholder="Select Ambulance Type"
                  selectedValue={
                    ambulanceTypes.find(t => t.id === formData.amb_type_id)
                      ?.label || ''
                  }
                  onValueChange={label => {
                    const selectedType = ambulanceTypes.find(
                      t => t.label === label,
                    );
                    if (selectedType) {
                      handleInputChange('amb_type_id', selectedType.id);
                    }
                  }}
                  options={ambulanceTypes.map(t => t.label)}
                />
                {basicDetailsExpanded &&
                  [
                    {
                      label: 'Registration Number',
                      placeholder: 'Enter Registration Number',
                      value: formData.registration_number,
                      onChangeText: v =>
                        handleInputChange('registration_number', v),
                    },
                    {
                      label: 'Number Plate',
                      placeholder: 'Enter Number Plate',
                      value: formData.amb_number_plate,
                      onChangeText: v =>
                        handleInputChange('amb_number_plate', v),
                    },
                    {
                      label: 'FC Details',
                      placeholder: 'Enter FC Details',
                      multiline: true,
                      value: formData.fc_details,
                      onChangeText: v => handleInputChange('fc_details', v),
                    },
                    {
                      label: 'Insurance Policy No.',
                      placeholder: 'Enter Insurance Policy No.',
                      value: formData.ins_policy_no,
                      onChangeText: v => handleInputChange('ins_policy_no', v),
                    },
                  ].map((item, index) => (
                    <View style={styles.inputContainer} key={index.toString()}>
                      <Text style={styles.inputLabel}>{item?.label}</Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          item?.multiline && styles.multilineInput,
                        ]}
                        placeholder={item?.placeholder}
                        placeholderTextColor="#999"
                        value={item?.value}
                        onChangeText={item?.onChangeText}
                        multiline={item?.multiline}
                        numberOfLines={item?.multiline ? 3 : 1}
                        textAlignVertical={item?.multiline ? 'top' : 'center'}
                        returnKeyType={item?.multiline ? 'default' : 'next'}
                        blurOnSubmit={item?.multiline}
                      />
                    </View>
                  ))}
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setVerificationExpanded(!verificationExpanded)}
                activeOpacity={0.8}
              >
                <Text style={styles.sectionTitle}>
                  {'Verification & Agreement'}
                </Text>
                <Icon
                  name={verificationExpanded ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <View style={styles.sectionContent}>
                <UploadField
                  title="Upload Ambulance RC Book"
                  fileKey="doc_rc_book"
                />
                <UploadField
                  title="Upload Ambulance Insurance"
                  fileKey="doc_insurance"
                />
                <UploadField
                  title="Upload Ambulance Image"
                  fileKey="amb_profile"
                />
                <View style={styles.agreementContainer}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() =>
                      handleInputChange('agreeToTerms', !formData.agreeToTerms)
                    }
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        formData.agreeToTerms && styles.checkboxChecked,
                      ]}
                    >
                      {formData.agreeToTerms && (
                        <Icon name="check" size={16} color="white" />
                      )}
                    </View>
                    <Text style={styles.agreementText}>
                      Agree to Terms & Conditions (
                      <Text style={styles.clickHereText}>Click here</Text>)
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.bottomSpacing} />
            <View style={styles.submitContainer}>
              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && { opacity: 0.6 }]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default AmbulanceAddRegisterPage;

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
    flexDirection: 'row',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#7518AA',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
    left: 10,
    top: 10,
  },
  placeholder: {
    width: 28,
  },
  scrollView: {
    flex: 1,
    top: '2%',
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
    zIndex: 1000,
    elevation: 5,
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
    color: '#7B3F98',
    marginTop: 8,
    fontWeight: '500',
  },
  uploadHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  filePreviewContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fileDetails: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
  },
  fileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 0.45,
    justifyContent: 'center',
  },
  changeButtonText: {
    fontSize: 12,
    color: '#7B3F98',
    marginLeft: 4,
    fontWeight: '500',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 0.45,
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 12,
    color: '#FF3B30',
    marginLeft: 4,
    fontWeight: '500',
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
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: Fonts.size.PageHeading,
    fontWeight: '600',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addMoreText: {
    color: '#7B3F98',
    marginLeft: 6,
    fontSize: 14,
  },
});
