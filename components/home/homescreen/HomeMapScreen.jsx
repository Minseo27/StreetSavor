import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from './homemapscreen.styles';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
//import Geolocation from '@react-native-community/geolocation';
// Imports
//import { AsyncStorage } from 'react-native';
import { Image } from 'react-native';
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Geolocation from 'react-native-geolocation-service';


const HomeMapScreen = ({ navigation }) => {

  //Saving Position 
  let savedLatitude = null;
  let savedLongitude = null;
  
  
    useEffect(() => {
      checkLocationPermission();
    }, []);
  
    const checkLocationPermission = async () => {
      const locationPermission = await AsyncStorage.getItem('locationPermission');
      if (locationPermission !== 'granted') {
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

                Geolocation.getCurrentPosition(
                  (position) => {
                      //console.log("My current location", JSON.stringify(position));
                      //this.setState({location: position.coords.latitude.toString() + "," + position.coords.longitude.toString()})
                      //console.warn(position.coords.latitude)
                      
                      savedLatitude = position.coords.latitude;
                      savedLongitude = position.coords.longitude
                      
                  },
                  (error) => {
                      // See error code charts below.
                      console.log(error.code, error.message);
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });

                  console.warn(savedLatitude)
                // Store the permission status
                //await AsyncStorage.setItem('locationPermission', 'granted');
              },
            },
          ]
        );
      }


      //console.warn(savedLatitude)
      
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
          <Marker
          coordinate={{
            latitude: 40.7861,
            longitude: -73.9543,
          }}
        //image = {require(".asset/mount.jpeg")}
        
    
    />
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