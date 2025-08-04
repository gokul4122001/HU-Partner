import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  SafeAreaView,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../../Header'; // Adjust if needed
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../Fonts/Fonts';
import { Ambulance_One } from '../../APICall/CompanyLogin/ServiceFormApi';
import { useCompany } from '../../Context/CompanyContext';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

// Simple image viewer component
const SimpleImageViewer = ({ visible, images, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.imageViewerContainer}>
        <View style={styles.imageViewerHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.imageCounter}>
            {currentIndex + 1} of {images.length}
          </Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.imageContainer}>
          {images.length > 0 && (
            <Image
              source={{ uri: images[currentIndex]?.uri }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}

          {images.length > 1 && (
            <>
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={goToPrevious}
              >
                <Icon name="chevron-left" size={40} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={goToNext}
              >
                <Icon name="chevron-right" size={40} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const AmbulanceDetailsScreen = ({ navigation, route }) => {
  const editData = route.params?.item;
  const { token } = useCompany();
  const [item, setItem] = useState(null);

  const fetchEditData = async () => {
    const res = await Ambulance_One(token, editData?.id);
    setItem(res.data);
  };

  useFocusEffect(
    useCallback(() => {
      if (editData) {
        fetchEditData();
      }
    }, [editData]),
  );

  // Modal state for image gallery
  const [imageGalleryVisible, setImageGalleryVisible] = useState(false);
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);

  // Open PDF using device's default app
  const openPDF = uri => {
    if (!uri) {
      Alert.alert('Error', 'No document available');
      return;
    }

    Linking.openURL(uri).catch(err => {
      console.error('Failed to open PDF:', err);
      Alert.alert(
        'Error',
        'Unable to open document. Please check if you have a PDF viewer installed.',
      );
    });
  };

  // Open document (PDF or image)
  const openDocument = uri => {
    if (!uri) {
      Alert.alert('Error', 'No document available');
      return;
    }

    const ext = uri.split('.').pop().toLowerCase();

    if (ext === 'pdf') {
      openPDF(uri);
    } else {
      // For images, show in modal
      setImageGalleryIndex(0);
      setImageGalleryVisible(true);
    }
  };

  // Images array for gallery
  const images = (item?.amb_profile || []).map(url => ({ uri: url }));

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.topBackground}
    >
      <StatusBar backgroundColor="#7B3F98" barStyle="light-content" />

      <CustomHeader
        username="Akash Ambulance"
        onNotificationPress={() => console.log('Notification Pressed')}
        onWalletPress={() => console.log('Wallet Pressed')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Ambulance Details</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={require('../../Assets/ambualnce.png')}
              style={styles.ambulanceIcon}
            />
            <View>
              <Text style={styles.cardTitle}>
                {item?.amb_type_id === '1'
                  ? 'Basic Life Support'
                  : item?.amb_type_id === '2'
                  ? 'Advanced Life Support'
                  : item?.amb_type_id === '3'
                  ? 'Critical Care Transport'
                  : 'Unknown Type'}
              </Text>
              <Text style={styles.cardSubtitle}>Small ( Omni, etc )</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <Text style={styles.label}>Ambulance Name :</Text>
            <Text style={styles.value}>{item?.amb_name}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Ambulance Type :</Text>
            <Text style={styles.value}>
              {item?.amb_type_id === '1'
                ? 'Basic Life Support'
                : item?.amb_type_id === '2'
                ? 'Advanced Life Support'
                : item?.amb_type_id === '3'
                ? 'Critical Care Transport'
                : 'Unknown'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Vehicle Number Plate :</Text>
            <Text style={styles.value}>{item?.amb_number_plate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>FC Details :</Text>
            <Text style={styles.value}>{item?.fc_details}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Insurance Policy Number :</Text>
            <Text style={styles.value}>{item?.ins_policy_no}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Facility :</Text>
            <Text style={styles.value}>{item?.facility || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.docRow}>
          <TouchableOpacity
            style={styles.docCard}
            onPress={() => openDocument(item?.doc_rc_book)}
          >
            <Icon name="picture-as-pdf" size={40} color="#474747" />
            <Text style={styles.docLabel}>Ambulance RC Book</Text>
            <Text style={styles.docText}>
              {item?.doc_rc_book
                ? item.doc_rc_book.split('/').pop()
                : 'No document'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.docCard}
            onPress={() => openDocument(item?.doc_insurance)}
          >
            <Icon name="picture-as-pdf" size={40} color="#474747" />
            <Text style={styles.docLabel}>Ambulance License</Text>
            <Text style={styles.docText}>
              {item?.doc_insurance
                ? item.doc_insurance.split('/').pop()
                : 'No document'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.docRow}>
          <TouchableOpacity
            style={styles.docCard}
            onPress={() => {
              if (images.length > 0) {
                setImageGalleryIndex(0);
                setImageGalleryVisible(true);
              } else {
                Alert.alert('Info', 'No images available');
              }
            }}
          >
            <Icon name="image" size={40} color="#474747" />
            <Text style={styles.docLabel}>Ambulance Images</Text>
            <Text style={styles.docText}>
              {images.length} image{images.length !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Company2', { item })}
          >
            <Text style={styles.editBtnText}>Edit Ambulance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Gallery Modal */}
      <SimpleImageViewer
        visible={imageGalleryVisible}
        images={images}
        onClose={() => setImageGalleryVisible(false)}
        initialIndex={imageGalleryIndex}
      />
    </LinearGradient>
  );
};

export default AmbulanceDetailsScreen;

const styles = StyleSheet.create({
  topBackground: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    borderStyle: 'dotted',
    marginVertical: 10,
  },
  titleText: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  ambulanceIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 2,
    height: 350,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  detailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  label: {
    fontSize: Fonts.size.PageHeading,
    color: '#000000',
    fontWeight: '600',
    marginRight: 4,
  },
  value: {
    fontSize: Fonts.size.PageHeading,
    color: '#454242',
    flexShrink: 1,
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  docCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    minWidth: 160,
  },
  docLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  docText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: wp('42%'),
    height: hp('6.5%'),
    backgroundColor: '#FFFFFF',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#4D2161',
    fontWeight: '600',
    fontSize: Fonts.size.PageSubheading,
  },
  editButton: {
    width: wp('42%'),
    height: hp('6.5%'),
    backgroundColor: '#7518AA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: Fonts.size.PageSubheading,
  },
  // Image viewer styles
  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageViewerHeader: {
    height: 60,
    backgroundColor: '#7B3F98',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: 5,
  },
  imageCounter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height - 60,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 10,
    marginTop: -30,
  },
  prevButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
});
