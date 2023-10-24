import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from './homemapscreen.styles';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
//import Geolocation from '@react-native-community/geolocation';
// Imports

const HomeMapScreen = ({ navigation }) => {
    useEffect(() => {
      checkLocationPermission();
    }, []);
  
    const checkLocationPermission = async () => {
      const locationPermission = await AsyncStorage.getItem('locationPermission');
      if (locationPermission === 'granted') {
      } else {
        Alert.alert(
          'Location Tracking Permission',
          'Allow location tracking for customers?',
          [
            {
              text: 'Do It Later',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                // Store the user's location
                // geolocation here
  
                // Store the permission status
                await AsyncStorage.setItem('locationPermission', 'granted');
              },
            },
          ]
        );
      }
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: '#efcb4e' }}>
        <MapView
          // Hunter College Coordinates
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 40.7861,
            longitude: -73.9543,
            latitudeDelta: 0.03,
            longitudeDelta: 0.02,
          }}
        >
        </MapView>
  
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=""
              onChange={() => {}}
              placeholder="What are you looking for?"
              placeholderTextColor="#888"
            />
          </View>
        </View>
      </View>
    );
  };
  
  export default HomeMapScreen;
