import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('✅ Notification permission granted:', authStatus);
  }
};

export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('🔥 FCM Token:', token);
    
    } else {
      console.log('⚠️ Failed to get FCM token');
    }
  } catch (error) {
    console.log('❌ Error getting FCM token:', error);
  }
};

export const onMessageListener = () =>
  messaging().onMessage(async remoteMessage => {
    Alert.alert('📩 New Notification', JSON.stringify(remoteMessage));
  });
