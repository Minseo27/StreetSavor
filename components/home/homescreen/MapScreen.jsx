import React, { useEffect } from 'react';
import { View, Text} from 'react-native';
import styles from './homemapscreen.styles';
import MapView, { Marker, Polyline} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { TextInput } from 'react-native-gesture-handler';

function MapScreen () {
    const checkLocationPermission = async () => {
        const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.DENIED) {
          if (permissionResult === RESULTS.GRANTED) {
            getUserLocationAndStoreInFirestore();
          }
        } else if (result === RESULTS.GRANTED) {
          getUserLocationAndStoreInFirestore();
        }
      };

      const storeLocationInFirestore = (latitude, longitude) => {
        const user = auth().currentUser;
          firestore()
            .collection('Users')
            .doc('dFqhRhGV5BSuqWYys6bP')
            .collection('Customers')
            .doc(user.uid)
            .update({
              location: {
                latitude,
                longitude,
              },
            })
            .then(() => {
              console.log('Location updated in Firestore');
            })
            .catch((error) => {
              console.log('Error updating location:', error);
            });
        };
    
      const getUserLocationAndStoreInFirestore = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            storeLocationInFirestore(latitude, longitude);
            fetchLocationFromFirestore();
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };
    
      useEffect(() => {
        checkLocationPermission();
      }, []);


    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);
    const [newText, setText] = useState('');
  
    const [locationDataFetched, setLocationDataFetched] = useState(false);
  
      const fetchLocationFromFirestore = async () => {
          const user = auth().currentUser;
          try {
          const userDocRef = firestore()
              .collection('Users')
              .doc('dFqhRhGV5BSuqWYys6bP')
              .collection('Customers')
              .doc(user.uid);
      
          const userDoc = await userDocRef.get();
      
          if (!userDoc.empty) {
              const locationData = userDoc.data().location;
              if (locationData) {
                  const { latitude, longitude } = locationData;
                  setLatitude(latitude); 
                  setLongitude(longitude); 
                  setLocationDataFetched(true)
              
              } else {
              console.log('No location data found for the user.');
              }
          } else {
              console.log('User document does not exist.');
          }
          } catch (error) {
          console.error('Error fetching location data:', error);
          }
      };
  
    fetchLocationFromFirestore();

    const [showPolyline, setShowPolyline] = useState(false);
    const [latTruck, setFoodLatitude] = useState(null);
    const [lonTruck, setFoodLongitude] = useState(null);
    const [locationFoodDataFetched, setFoodLocationDataFetched] = useState(false);
  
        const fetchFoodTruckLocation = async () => {
           try{
               const vendorDocRef = firestore()
               .collection('Users')
               .doc('dFqhRhGV5BSuqWYys6bP')
               .collection('Vendors')
               .doc('zNpo2OBPsA73QZJFM5ub')
               .collection('info');
               const query = vendorDocRef.where("name", "==", newText).limit(1);
               const userDoc = await query.get();

               if (!userDoc.empty) {
                   const vendorDoc = userDoc.docs[0];
                   const locationData = vendorDoc.data().location;
                   if (locationData) {
                    const { latitude, longitude } = locationData;
                    setFoodLatitude(latitude); 
                    setFoodLongitude(longitude);
                    setFoodLocationDataFetched(true)
                    console.log(latitude,longitude);
                   } else {
                    console.log('No location data found for the user.');
                    }
               } else {
                    console.log('User document does not exist.');
               }
           } catch(error) {
               console.error("Error searching for vendor location:", error);
           }
        }; 
  
      fetchFoodTruckLocation();
    const getRouteLocation = () =>{
        setShowPolyline(true)
    }
      return (
          <View style = {{flex:1}}>
              {locationDataFetched ? (
              <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                  latitude:  Number(lat),
                  longitude: Number(lon),
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.02,
                  }}
              >
              <Marker
                  coordinate={{
                  latitude:  Number(lat),
                  longitude: Number(lon),
                  
                  }}
                  description={"You are here"}>
                  <Image source={require('./location-pin.png')} style={{height: 35, width:35 }} />
              </Marker>
  
              <Marker
                  coordinate ={{
                      latitude: Number(latTruck),
                      longitude: Number(lonTruck),
                  }}
                  description={"Your Nearest Truck"}
                  onPress={getRouteLocation}
              >
                  <Image source = {require('./truckicon.png')} style={{height:35, width:35}}/>
              </Marker>

              {showPolyline && 
              (<MapViewDirections
                origin={{ latitude: Number(lat), longitude: Number(lon) }}
                destination={{ latitude: Number(latTruck), longitude: Number(lonTruck) }}
                apikey={"AIzaSyBLoT-2L2OzwWceQVT4VHgy3AFTXkWeqHU"} // Your API Key
                strokeWidth={2}
                
                />)
              }
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
                      onSubmitEditing = { () => fetchFoodTruckLocation() }
                      autoCapitalize="none"
                  />  
                  </View>
              
              </View>
             
          </View>
  
      );
  }

  export default MapScreen;