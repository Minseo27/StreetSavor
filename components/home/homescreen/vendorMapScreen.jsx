
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable, ActivityIndicatorBase } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './homemapscreen.styles';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, SIZES } from '../../../constants'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import * as permissions from 'react-native-permissions';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
//import { useEffect } from 'react';

function MapScreen() {

    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);
    const [newText, setText] = useState('');
  
    const [locationDataFetched, setLocationDataFetched] = useState(false);

    const mark = [
        {"latitude": 40.76754, "longitude": -73.96434},
        {"latitude": 40.76812, "longitude": -73.96485},
        {"latitude": 40.76695, "longitude": -73.96556},
        {"latitude": 40.76878, "longitude": -73.96379},
        {"latitude": 40.76725, "longitude": -73.96588}
      ]
      
  
    useEffect(() => {
      const fetchTruckLocationFromFirestore = async () => {
          const user = auth().currentUser;
          try {
          const userDocRef = firestore()
          .collection('Users')
              .doc('dFqhRhGV5BSuqWYys6bP')
              .collection('Vendors')
              .doc('zNpo2OBPsA73QZJFM5ub')
              .collection('info')
              .doc(user.uid);

          
      
          const userDoc = await userDocRef.get();
      
          if (userDoc.exists) {
              const locationData = userDoc.data().location;
              if (locationData) {
                  const { latitude, longitude } = locationData;
            
                  // Setting Values
                  setLatitude(latitude); 
                  setLongitude(longitude); 
                  //Setting Location Value
                  setLocationDataFetched(true)
              
              } else {
              console.log('No location data found for the Vendor.');
              }
          } else {
              console.log('User document does not exist.');
          }
          } catch (error) {
          console.error('Error fetching location data:', error);
          }
      };
  
      fetchTruckLocationFromFirestore();
    }, [] );
  
    // Variables for Containing Food Truck Location

    const [markers, setMarkers] = useState([]);
    // Array to hold Coordinates
        
    useEffect (() => { 
    //const mapMarkerMaker = () => {
          const user = auth().currentUser;
          let markersData = [];

            //const user = auth().currentUser;
            const vendorsCollectionRef = firestore()
                    .collection('Users')
                    .doc('dFqhRhGV5BSuqWYys6bP')
                    .collection('Customers')

        vendorsCollectionRef.get().then((querySnapshot) => {
            querySnapshot.forEach((vendorDoc) => {
            const vendorData = vendorDoc.data();
            const latName = vendorData.location.latitude
            //const longName = vendorData.location.longitude
            const { latitude, longitude } =vendorData.location;

            //console.warn(latitude)
            markersData.push({latitude,longitude})
           
            setMarkers(markersData); 
            //console.warn(markersData)
            });           
        })  
       
    },[]);          
       
    
      return (
          <View style = {{flex:1,}}>
              {locationDataFetched ? (
                  //Conditional Map Render
              <MapView
              //Hunter College Coordinates
              
                  style={{ flex: 1 }}
                  initialRegion={{
                  latitude:  lat,
                  longitude: lon,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                  }}
              >
  
              <Marker
                  coordinate={{
                
                  latitude:  lat,
                  longitude: lon,
                  
                  }}
                  description={"You are here"}>
                  <Image source={require('./foodtruck.jpg')} style={{height: 35, width:35 }} />
                
                
              </Marker>
            
            
              {markers.map( (marker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    }}
                >
                    <Image source={require('./green-pin.png')} style={{ height: 30, width: 30}} />
                </Marker>
                ))}

            
                
            </MapView>
              

              ) : ( <ActivityIndicator size ="large"/>)} 
  
          </View>
  
      );
  }

function CreateMenuScreen() {
    return (
        <View>

        </View>
    );
}

function AccountPage() {
    return (
        <View>
            
        </View>
    );
}
  const VendorMapScreen = ({navigation}) => {
    return (
        <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
            <Tab.Screen name='Map' component={MapScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Your Menu" component={CreateMenuScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
  }

  export default VendorMapScreen;
