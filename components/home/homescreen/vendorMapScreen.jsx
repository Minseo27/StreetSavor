
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable, ActivityIndicatorBase } from 'react-native';
import styles from './homemapscreen.styles';
import MapView, { Marker } from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
//import { useEffect } from 'react';

const VendorMapScreen =({naivigation}) => {

    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);
    const [newText, setText] = useState('');
  
    const [locationDataFetched, setLocationDataFetched] = useState(false);
  
  
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

          
        //   try {
        //   const userDocRef = firestore()
        //       .collection('Users')
        //       .doc('dFqhRhGV5BSuqWYys6bP')
        //       .collection('Customers')
        //       .doc(user.uid);
      
          const userDoc = await userDocRef.get();
      
          if (userDoc.exists) {
              const locationData = userDoc.data().location;
              if (locationData) {
                  const { latitude, longitude } = locationData;
              //console.log('Latitude:', latitude);
              //console.warn('Longitude:', longitude);
  
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
    const [latTruck, setFoodLatitude] = useState(null);
    const [lonTruck, setFoodLongitude] = useState(null);
    const [locationFoodDataFetched, setFoodLocationDataFetched] = useState(false);
    const [markers, setMarkers] = useState([]);
    // Array to hold Coordinates
    //let markers = [];
   

    // Fetching Food Truck Based on Search Bar 
    //useEffect(() => {
        
     useEffect (() => { 
          const user = auth().currentUser;
          const markersData = [];


          
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
            //)
            
            //console.warn(data)
            //return markers
            //console.warn(m)
            //g = "NO"
            //return mar
            setMarkers(markersData);
            });
           
        })
            //return mar
        
    },[]);

    //fetchUserLocationLocation()
    
    //console.warn(markers)
           
          
                //   try {
                //   const userDocRef = firestore()
                //       .collection('Users')
                //       .doc('dFqhRhGV5BSuqWYys6bP')
                //       .collection('Vendors')
                //       .doc('zNpo2OBPsA73QZJFM5ub')
                //       .collection('info')
                //       .doc(newText);
      
          {/*const userDoc = await userDocRef.get();
          if (userDoc.exists) {
              const locationData = userDoc.data().location;
              if (locationData) {
                  const { latitude, longitude } = locationData;
                  // Setting Values
                  setFoodLatitude(latitude); 
                  setFoodLongitude(longitude); 
                  //Setting Location Value
                  setFoodLocationDataFetched(true)
              } else {
              console.log('No location data found for the user.');
              }
          } else {
              console.log('User document does not exist.');
          }
          } catch (error) {
          console.error('Error fetching location data:', error);
          } */}
     // }
  
      //fetchFoodTruckLocation();
    //}, [] );

   //fetchUserLocationLocation()
//    {markers.map(index => {
//        console.warn(index.latitude)
//    })}


//console.warn(markers.length)

   
  
  
    //console.warn(`${lat}`, `${lon}`)
  
      return (
          <View style = {{flex:1,}}>
              {locationDataFetched ? (
                  //Conditional Map Render
              <MapView
              //Hunter College Coordinates
              
                  style={{ flex: 1 }}
                  initialRegion={{
                  //latitude:  40.7861,
                  //longitude: -73.9543,
                  latitude:  lat,
                  longitude: lon,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.02,
                  }}
              >
  
              <Marker
                  coordinate={{
                  //latitude: 40.7861, 
                  //longitude: -73.9543,
                  latitude:  lat,
                  longitude: lon,
                  
                  }}
                  description={"You are here"}>
                  <Image source={require('./foodtruck.jpg')} style={{height: 35, width:35 }} />
              </Marker>
              

              {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    }}
                >
                    <Image source={require('./location-pin.png')} style={{ height: 35, width: 35 }} />
                </Marker>
                ))}

            
                
            </MapView>
              

              ) : ( <ActivityIndicator size ="large"/>)} 
  
              <View style = {styles.searchContainer}>
                  <View style = {styles.searchWrapper}>
                      <TextInput
                      style= {styles.searchInput}
                      value = {newText}
                      onChangeText = {newText => setText(newText)}
                      placeholder= "What are you looking for?"
                      placeholderTextColor="#888"
                      //onSubmitEditing={() => alert(`Welcome to ${newText}`)}
                      onSubmitEditing = { () => alert() }
                  />  
                  </View>
              
              </View>
          </View>
  
      );
  }

  export default VendorMapScreen;
  