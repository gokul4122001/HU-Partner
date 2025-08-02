import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = () => {
  const notifications = [
    {
      id: 1,
      title: 'Your ambulance reservation is confirmed.',
      subtitle: 'Check the booking history for details.',
      time: 'Today',
      isToday: true,
    },
    {
      id: 2,
      title: 'Your ambulance reservation is confirmed.',
      subtitle: 'Check the booking history for details.',
      time: 'Today',
      isToday: true,
    },
    {
      id: 3,
      title: 'Your ambulance reservation is confirmed.',
      subtitle: 'Check the booking history for details.',
      time: 'Yesterday',
      isYesterday: true,
    },
    {
      id: 4,
      title: 'Your ambulance reservation is confirmed.',
      subtitle: 'Check the booking history for details.',
      time: 'Yesterday',
      isYesterday: true,
    },
    {
      id: 5,
      title: 'Your ambulance reservation is confirmed.',
      subtitle: 'Check the booking history for details.',
      time: 'This week',
      isThisWeek: true,
    },
  ];

  const renderNotificationItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Icon name="local-hospital" size={24} color="#8B5CF6" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map(renderNotificationItem)}
    </View>
  );

  const todayNotifications = notifications.filter(n => n.isToday);
  const yesterdayNotifications = notifications.filter(n => n.isYesterday);
  const thisWeekNotifications = notifications.filter(n => n.isThisWeek);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B5CF6" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="calendar-today" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeLeft}>
          <Icon name="local-hospital" size={32} color="#8B5CF6" />
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeGreeting}>Hi, Welcome</Text>
            <Text style={styles.welcomeTitle}>Akash Ambulance</Text>
          </View>
        </View>
      </View>

      {/* Notifications */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {todayNotifications.length > 0 && renderSection('Today', todayNotifications)}
        {yesterdayNotifications.length > 0 && renderSection('Yesterday', yesterdayNotifications)}
        {thisWeekNotifications.length > 0 && renderSection('This week', thisWeekNotifications)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 80, // Compensate for right icons
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    padding: 8,
    marginLeft: 8,
  },
  welcomeContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  welcomeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    marginLeft: 12,
  },
  welcomeGreeting: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  notificationItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default NotificationScreen;