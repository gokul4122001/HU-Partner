import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../../Header'; // ✅ Adjust the path as needed
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DriverDetailsScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* ✅ Custom Header */}
      <CustomHeader
        username="Salva Kumar"
        onNotificationPress={() => {}}
        onWalletPress={() => {}}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ Stats */}
        <View style={styles.statsContainer}>
          {[
            { label: 'Earnings', value: '20K', color: '#1f2937' },
            { label: 'Completed', value: '150', color: '#6366f1' },
            { label: 'Rejected', value: '50', color: '#ef4444' },
          ].map((item, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ✅ Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.driverName}>Salva Kumar</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>ACTIVE</Text>
                </View>
              </View>
              <Text style={styles.driverId}>ID No.: AXE9215</Text>
            </View>
          </View>

          {[
            { label: 'Contact No:', value: '9344546447' },
            { label: 'Email ID:', value: 'Salvakumar@gmail.com' },
            { label: 'Gender:', value: 'Male', extra: '   Age:', extraValue: '27' },
            { label: 'Date of Birth:', value: '01/04/1997' },
            { label: 'Address:', value: 'No 5/2, 1 street, Santhya Colony, Vyasarpadi, Chennai, 35' },
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
              {item.extra && (
                <>
                  <Text style={styles.infoLabel}>{item.extra}</Text>
                  <Text style={styles.infoValue}>{item.extraValue}</Text>
                </>
              )}
            </View>
          ))}
        </View>

        {/* ✅ License Details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Driver License</Text>
          {[
            { label: 'Driver Type:', value: 'Car' },
            { label: 'License Number:', value: 'MH13 20151149112' },
            { label: 'License Expiry Date:', value: 'Permanent (No need to renew) (SNT)' },
            { label: 'License Validity Date:', value: '06/04/2050' },
            { label: 'Issued State:', value: '544205' },
            { label: 'Years of Experience:', value: '10 years' },
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* ✅ Account Credentials */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Credentials</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>E-mail ID:</Text>
            <Text style={styles.infoValue}>Salvakumar@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Password:</Text>
            <Text style={styles.infoValue}>•••••••••</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Confirm Password:</Text>
            <Text style={styles.infoValue}>salva2571</Text>
          </View>
        </View>

        {/* ✅ Documents */}
        <View style={styles.sectionContainer}>
          <View style={styles.documentsGrid}>
            {[
              { title: 'Driver License', subtitle: 'ID Proof' },
              { title: 'Document name' },
              { title: 'Medical Fitness', subtitle: 'Document name' },
              { title: 'Profile Image', subtitle: 'Document name' },
            ].map((doc, idx) => (
              <View key={idx} style={styles.documentItem}>
                <View style={styles.documentIcon}>
                  <Icon name="description" size={30} color="#6b7280" />
                </View>
                <Text style={styles.documentLabel}>{doc.title}</Text>
                {doc.subtitle && <Text style={styles.documentSubLabel}>{doc.subtitle}</Text>}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ✅ Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.ambulanceButton}
          onPress={() => navigation.navigate('FormPage')}
        >
          <Text style={styles.ambulanceButtonText}>View Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate('TrackAmbulance')}
        >
          <Text style={styles.trackButtonText}>Track Ambulance</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
   paddingTop: hp('4%'),
       paddingBottom: hp('2%'),
       paddingHorizontal: wp('4%'),
       height: hp('100%'),
  },
  scrollContainer: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 8,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  profileSection: { backgroundColor: '#fff', padding: 16, marginBottom: 8 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  profileInfo: { flex: 1 },
  driverName: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  driverId: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  statusBadge: { flexDirection: 'row', alignItems: 'center' },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  statusText: { fontSize: 12, color: '#10b981', fontWeight: '600' },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  infoLabel: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  infoValue: { fontSize: 14, color: '#1f2937', fontWeight: '500' },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  documentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  documentItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  documentIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  documentLabel: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  documentSubLabel: { fontSize: 10, color: '#6b7280', textAlign: 'center' },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#f8fafc',
  },
  ambulanceButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  ambulanceButtonText: { color: '#6366f1', fontSize: 16, fontWeight: '600' },
  trackButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default DriverDetailsScreen;
