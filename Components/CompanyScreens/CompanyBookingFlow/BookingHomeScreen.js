import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';
import CustomHeader from '../../../Header';
import CurrentBookingTab from './CurrentBookingTab';
import ScheduleBookingTab from './ScheduleBookingTab';
import CompleteBookingTab from './CompleteBookingTab';
import CancellationBookingTab from './CancelBookingTab';

const BookingListScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState('Today');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState(new Date());

  const tabs = [
    { id: 'current', label: 'Current Booking', key: 'current' },
    { id: 'schedule', label: 'Schedule Booking', key: 'schedule' },
    { id: 'complete', label: 'Completed Booking', key: 'complete' },
    { id: 'cancellation', label: 'Cancellation Booking', key: 'cancellation' },
  ];

  const dateFilterOptions = [
    { id: 1, label: 'Today', value: 'today' },
    { id: 2, label: 'Yesterday', value: 'yesterday' },
    { id: 3, label: 'This Week', value: 'thisWeek' },
    { id: 4, label: 'Last Month', value: 'lastMonth' },
    { id: 5, label: 'Select Date', value: 'selectDate', icon: 'calendar' },
  ];

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleDateFilterSelect = (option) => {
    setSelectedDateFilter(option.label);
    setShowDateDropdown(false);
    if (option.value === 'selectDate') {
      setShowDatePicker(true);
    }
  };

  const renderTabButton = (tab) => (
    <TouchableOpacity
      key={tab.id}
      style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
      onPress={() => handleTabChange(tab.key)}
    >
      <Text style={[styles.tabButtonText, activeTab === tab.key && styles.activeTabButtonText]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );

  const renderDateDropdownModal = () => (
    <Modal
      visible={showDateDropdown}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDateDropdown(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowDateDropdown(false)}
      >
        <View style={styles.dropdownModal}>
          <FlatList
            data={dateFilterOptions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selectedDateFilter === item.label && styles.selectedDropdownItem,
                ]}
                onPress={() => handleDateFilterSelect(item)}
              >
                <View style={styles.dropdownItemContent}>
                  {item.icon && (
                    <Icons name={item.icon} size={20} color="#666" style={styles.dropdownIcon} />
                  )}
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedDateFilter === item.label && styles.selectedDropdownItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'current':
        return <CurrentBookingTab dateFilter={selectedDateFilter} />;
      case 'schedule':
        return <ScheduleBookingTab dateFilter={selectedDateFilter} />;
      case 'complete':
        return <CompleteBookingTab dateFilter={selectedDateFilter} />;
      case 'cancellation':
        return <CancellationBookingTab dateFilter={selectedDateFilter} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      >
       
        <CustomHeader
          username="Janmani Kumar"
          onNotificationPress={() => console.log('Notification Pressed')}
          onWalletPress={() => console.log('Wallet Pressed')}
        />
    
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Booking List</Text>
          </View>
          <View style={styles.inlineDateDropdownContainer}>
            <TouchableOpacity
              style={styles.dateDropdownButton}
              onPress={() => setShowDateDropdown(true)}
            >
              <Text style={styles.dateDropdownText}>{selectedDateFilter}</Text>
              <Icons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map(renderTabButton)}
        </ScrollView>

        <View style={styles.tabContent}>{renderTabContent()}</View>
      </View>

      {renderDateDropdownModal()}

      {showDatePicker && (
        <DateTimePicker
          value={customDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setCustomDate(selectedDate);
              setSelectedDateFilter(selectedDate.toDateString());
            }
            setShowDatePicker(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerBackground: {
    paddingBottom: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    paddingTop:'2%'
  },
  content: { flex: 1, backgroundColor: '#F5F5F5' },
  tabContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    maxHeight: hp('8%'),
  },
  tabScrollContent: { alignItems: 'center', paddingRight: wp('4%') },
  tabButton: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    marginRight: wp('2%'),
    borderRadius: 10,
    backgroundColor: 'white',
    minWidth: wp('35%'),
    alignItems: 'center',
    elevation: 5,
    minHeight: wp('10%'),
  },
  activeTabButton: { backgroundColor: Colors.statusBar || '#007AFF' },
  tabButtonText: { fontSize: Fonts.size.PageHeading, color: '#666', fontWeight: '600' },
  activeTabButtonText: { color: 'white' },
  tabContent: { flex: 1, backgroundColor: '#fff'},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: Fonts.size.PageHeading,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inlineDateDropdownContainer: { marginLeft: wp('2%'), alignItems: 'flex-end' },
  dateDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: wp('25%'),
    justifyContent: 'space-between',
  },
  dateDropdownText: {
    fontSize: Fonts.size.PageHeading,
    color: '#333',
    fontWeight: '500',
    marginRight: wp('2%'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: wp('5%'),
    maxHeight: hp('40%'),
    minWidth: wp('70%'),
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedDropdownItem: { backgroundColor: '#F0F8FF' },
  dropdownItemContent: { flexDirection: 'row', alignItems: 'center' },
  dropdownIcon: { marginRight: wp('3%') },
  dropdownItemText: {
    fontSize: Fonts.size.PageHeading,
    color: '#333',
    fontWeight: '500',
  },
  selectedDropdownItemText: {
    color: Colors.statusBar || '#007AFF',
    fontWeight: '600',
  },
});

export default BookingListScreen;
