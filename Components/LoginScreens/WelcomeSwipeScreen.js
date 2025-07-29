// src/Screens/Auth/WelcomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
  PanResponder,
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../Fonts/Fonts';
import Colors from '../Colors/Colors';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { combineSlices } from '@reduxjs/toolkit';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3; 

const Toast = ({ visible, message, backgroundColor }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  
  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, { 
          toValue: 0, 
          duration: 300, 
          useNativeDriver: true 
        }),
        Animated.delay(2000),
        Animated.timing(slideAnim, { 
          toValue: -100, 
          duration: 300, 
          useNativeDriver: true 
        }),
      ]).start();
    }
  }, [visible, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { 
          backgroundColor: backgroundColor || 'black', 
          transform: [{ translateY: slideAnim }] 
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const WelcomeScreen = ({ navigation }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#000');
  const user_type = useSelector(state=>state.auth.user_type)

  const showToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };
  console.log(user_type,"user_type");
  

  const panX = useRef(new Animated.Value(0)).current;
  const [isSwiped, setIsSwiped] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 100;
      },
      onPanResponderGrant: () => {
        // Show visual feedback when swipe starts
        panX.setOffset(panX._value);
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow rightward swipes and limit maximum swipe distance
        if (gestureState.dx >= 0) {
          const maxSwipe = width * 0.6; // Limit how far they can swipe
          const clampedValue = Math.min(gestureState.dx, maxSwipe);
          panX.setValue(clampedValue);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panX.flattenOffset();
        
        if (gestureState.dx > SWIPE_THRESHOLD && gestureState.vx > 0) {
          // Successful swipe - animate to full completion
          setIsSwiped(true);
          
          // First animate to the end of the button
          Animated.timing(panX, {
            toValue: width * 0.7, // Complete the swipe animation
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            // Show success feedback briefly
            showToast('Swipe Successful! Navigating...', '#4CAF50');
            
            // Wait a moment then navigate
            setTimeout(() => {
              if(user_type === "company"){
                navigation.navigate('MainApp'); 
              }

              // Reset for next time (in case user comes back)
              setTimeout(() => {
                panX.setValue(0);
                setIsSwiped(false);
              }, 100);
            }, 500);
          });
        } else {
          // Incomplete swipe - animate back to original position
          Animated.spring(panX, {
            toValue: 0,
            tension: 120,
            friction: 8,
            useNativeDriver: true,
          }).start(() => {
            setIsSwiped(false);
          });
        }
      },
      onPanResponderTerminate: () => {
        // Reset if gesture is interrupted
        Animated.spring(panX, {
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          setIsSwiped(false);
        });
      },
    })
  ).current;

  return (
    <LinearGradient
      colors={['#E6F3FF', '#F0F8FF', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#7416B2" translucent />
      <SafeAreaView style={styles.container}>
        <Toast visible={toastVisible} message={toastMessage} backgroundColor={toastColor} />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <View style={styles.illustrationContainer}>
            <LottieView
              source={require('../Assets/lottie/ambulancia.json')}
              autoPlay
              loop
              style={{ width: width * 0.8, height: height * 0.4 }}
            />
          </View>

          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeTitleRow}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                <Icons name="arrow-back-ios" size={20} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandName}>
              Health <Text style={styles.brandAccent}>Umbrella</Text>
            </Text>

            <Text style={styles.subtitle}>Become a Ambulance Partner</Text>

            <Text style={styles.description}>
              We can work together for better health care delivery
            </Text>

            <View style={styles.vendorButtonContainer}>
              <LinearGradient colors={['#7416B2', '#7416B2']} style={styles.vendorButton}>
                {/* Background track for swipe indicator */}
                <View style={styles.swipeTrack}>
                  <Text style={styles.swipeHintText}>
                    {isSwiped ? '' : ''}
                  </Text>
                </View>
                
                <Animated.View
                  style={[
                    styles.swipeContainer, 
                    { 
                      transform: [{ translateX: panX }],
                      opacity: isSwiped ? 0.9 : 1,
                    }
                  ]}
                  {...panResponder.panHandlers}
                >
                  <View style={styles.iconCircle}>
                    <LottieView
                      source={require('../Assets/lottie/FingerPrint.json')}
                      autoPlay
                      loop={!isSwiped}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>

                  <Text style={styles.vendorButtonText}>
                    {isSwiped ? 'Success!' : 'Swipe to Become a Vendor'}
                  </Text>

                  <LottieView
                    source={require('../Assets/lottie/swip.json')}
                    autoPlay
                    loop={!isSwiped}
                    style={styles.arrowLottie}
                  />
                </Animated.View>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  container: { flex: 1 },
  scrollContainer: { flex: 1 },
  illustrationContainer: {
    height: height * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backIcon: {
    padding: 4,
    marginRight: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 5,
    fontFamily: Fonts?.family?.regular || 'System',
    textAlign: 'center',
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7416B2',
    marginBottom: 20,
    fontFamily: Fonts?.family?.regular || 'System',
    textAlign: 'center',
  },
  brandAccent: { color: '#7416B2' },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
    fontFamily: Fonts?.family?.regular || 'System',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
    fontFamily: Fonts?.family?.regular || 'System',
    paddingHorizontal: 10,
  },
  vendorButtonContainer: {
    width: '100%',
    marginTop: 20,
  },
  vendorButton: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  swipeTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  swipeHintText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts?.family?.regular || 'System',
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  vendorButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts?.family?.regular || 'System',
    flex: 1,
    textAlign: 'center',
  },
  arrowLottie: {
    width: 80,
    height: 40,
    transform: [{ scaleX: -1 }],
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts?.family?.regular || 'System',
  },
});

export default WelcomeScreen;