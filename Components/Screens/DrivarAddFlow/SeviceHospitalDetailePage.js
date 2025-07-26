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

const DriverDetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    <ScrollView
  style={styles.content}
  contentContainerStyle={{ paddingBottom: 100 }} 
  showsVerticalScrollIndicator={false}
>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>20K</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, {color: '#6366f1'}]}>150</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, {color: '#ef4444'}]}>50</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>

        {/* Driver Profile */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              }}
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

          {/* Contact Info */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contact No: </Text>
            <Text style={styles.infoValue}>9344546447</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email ID: </Text>
            <Text style={styles.infoValue}>Salvakumar@gmail.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender: </Text>
            <Text style={styles.infoValue}>Male</Text>
            <Text style={styles.infoLabel}>   Age: </Text>
            <Text style={styles.infoValue}>27</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Birth: </Text>
            <Text style={styles.infoValue}>01/04/1997</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address: </Text>
            <Text style={styles.infoValue}>No 5/2, 1 street, Santhya Colony, Vyasarpadi, Chennai, 35</Text>
          </View>
        </View>

        {/* Driver License Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Driver License</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Driver Type: </Text>
            <Text style={styles.infoValue}>Car</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License Number: </Text>
            <Text style={styles.infoValue}>MH13 20151149112</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License Expiry Date: </Text>
            <Text style={styles.infoValue}>Permanent (No need to renew) (SNT)</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License Validity Date: </Text>
            <Text style={styles.infoValue}>06/04/2050</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Issued State: </Text>
            <Text style={styles.infoValue}>544205</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Years of Experience: </Text>
            <Text style={styles.infoValue}>10 years</Text>
          </View>
        </View>

        {/* Account Credentials */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Credentials</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>E-mail ID: </Text>
            <Text style={styles.infoValue}>Salvakumar@gmail.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Password: </Text>
            <Text style={styles.infoValue}>•••••••••</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Confirm Password: </Text>
            <Text style={styles.infoValue}>salva2571</Text>
          </View>
        </View>

        {/* Document Grid */}
        <View style={styles.sectionContainer}>
          <View style={styles.documentsGrid}>
            <View style={styles.documentItem}>
              <View style={styles.documentIcon}>
                <Icon name="description" size={30} color="#6b7280" />
              </View>
              <Text style={styles.documentLabel}>Driver License</Text>
              <Text style={styles.documentSubLabel}>ID Proof</Text>
            </View>

            <View style={styles.documentItem}>
              <View style={styles.documentIcon}>
                <Icon name="description" size={30} color="#6b7280" />
              </View>
              <Text style={styles.documentLabel}>Document name</Text>
            </View>

            <View style={styles.documentItem}>
              <View style={styles.documentIcon}>
                <Icon name="description" size={30} color="#6b7280" />
              </View>
              <Text style={styles.documentLabel}>Medical Fitness</Text>
              <Text style={styles.documentSubLabel}>Document name</Text>
            </View>

            <View style={styles.documentItem}>
              <View style={styles.documentIcon}>
                <Icon name="description" size={30} color="#6b7280" />
              </View>
              <Text style={styles.documentLabel}>Profile Image</Text>
              <Text style={styles.documentSubLabel}>Document name</Text>
            </View>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
        <TouchableOpacity
  style={styles.ambulanceButton}
  onPress={() => navigation.navigate('FormPage')} 
>
  <Text style={styles.ambulanceButtonText}>View Ambulance</Text>
</TouchableOpacity>
          
          <TouchableOpacity style={styles.trackButton}  onPress={() => navigation.navigate('TrackAmbulance')} >
            <Text style={styles.trackButtonText}>Track Ambulance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  editButton: {
    marginRight: 16,
  },
  menuButton: {
    // Menu button styles
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  driverId: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 12,
  },
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
  infoHalf: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
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
  documentSubLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
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
  ambulanceButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DriverDetailsScreen;