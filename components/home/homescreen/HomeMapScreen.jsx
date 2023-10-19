
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import  {TextInput, TouchableOpacity}  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from './homemapscreen.styles';
import Image from 'react-native';
import { SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
import { useEffect } from 'react';
//import Geolocation from 'react-native-geolocation-service';
// Imports
import MapView from 'react-native-maps';
import { useState } from 'react';
import { Alert } from 'react-native';

const HomeMapScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [setLocation] = useState(false)
   
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          try {
            const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result === RESULTS.DENIED) {
              const permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
              if (permissionResult === RESULTS.GRANTED) {
                try {
                  const position = await Geolocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                  });
                  const { latitude, longitude } = position.coords;
                  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                } catch (error) {
                  console.error("Error fetching current location:", error.message);
                }
              }
            }
          } catch (error) {
            console.error("Error checking location permission:", error.message);
          }
        }
      };
      
      useEffect(() => {
        requestLocationPermission();
      }, []);
      

      
    return (
    <View style = {{flex:1, backgroundColor: '#efcb4e'} }>
        <MapView
        //Hunter College Coordinates
            style={{ flex: 1 }}
            initialRegion={{
            latitude:  40.7861,
            longitude: -73.9543,
            latitudeDelta: 0.03,
            longitudeDelta: 0.02,
            }}
        > 
        </MapView>

        <View style = {styles.searchContainer}>
            <View style = {styles.searchWrapper}>
                <TextInput
                style= {styles.searchInput}
                value = {name}
                onChange = { setName }
                placeholder= "What are you looking for?"
                placeholderTextColor="#888"
            />  
            </View>
        
        </View>

        
    </View>

    
   
    )


};
export default HomeMapScreen;
