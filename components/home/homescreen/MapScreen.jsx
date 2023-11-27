import React, { useEffect } from 'react';
import { View, TextInput} from 'react-native';
import styles from './homemapscreen.styles';
import MapView, { Marker, Polyline} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import { DirectionsService } from 'react-native-maps-directions';
import MapViewDirections from 'react-native-maps-directions';

function MapScreen (){

    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);
    const [newText, setText] = useState('');
  
    const [locationDataFetched, setLocationDataFetched] = useState(false);
  
  
    useEffect(() => {
      const fetchLocationFromFirestore = async () => {
          const user = auth().currentUser;
  
          try {
          const userDocRef = firestore()
              .collection('Users')
              .doc('dFqhRhGV5BSuqWYys6bP')
              .collection('Customers')
              .doc(user.uid);
      
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
    }, [] );

    // Setting Cooridintes to be Used in route Polyline
    const [showPolyline, setShowPolyline] = useState(false);


  
    // Variables for Containing Food Truck Location
    const [latTruck, setFoodLatitude] = useState(null);
    const [lonTruck, setFoodLongitude] = useState(null);
    const [locationFoodDataFetched, setFoodLocationDataFetched] = useState(false);
  
    // Fetching Food Truck Based on Search Bar 
    //useEffect(() => {
        const fetchFoodTruckLocation = async () => {
            /*
          const user = auth().currentUser;
          try {
          const userDocRef = firestore()
              .collection('Users')
              .doc('dFqhRhGV5BSuqWYys6bP')
              .collection('Vendors')
              .doc('zNpo2OBPsA73QZJFM5ub')
              .collection('info')
              .doc(newText);
      
          const userDoc = await userDocRef.get();
      
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
          }
        */
       if(newText) {
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
                   } else {
                    console.log('No location data found for the user.');
                    }
               } else {
                    console.log('User document does not exist.');
               }
           } catch(error) {
               console.error("Error searching for vendor location:", error);
           }
        }
       
        }; 
  
      fetchFoodTruckLocation();
<<<<<<< HEAD
    

    // Setting Condition for Rendering Truck Route
    const getRouteLocation = () =>{
        setShowPolyline(true)
    }
=======
    //}, [] );
>>>>>>> minseo

  
  
    console.warn(`${lat}`, `${lon}`)
  
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
                  latitude:  lat,
                  longitude: lon,
                  
                  }}
                  description={"You are here"}>
                  <Image source={require('./location-pin.png')} style={{height: 35, width:35 }} />
              </Marker>
  
              <Marker 
                  coordinate ={{
                      latitude:latTruck,
                      longitude:lonTruck,
                  }}
                  description={"Your Nearest Truck"}
                  onPress={getRouteLocation}
              >
                  <Image source = {require('./foodtruck.jpeg')} style={{height:35, width:35}}/>
              </Marker>

              {showPolyline && 
              (<MapViewDirections
                origin={{ latitude: lat, longitude: lon }}
                destination={{ latitude: latTruck, longitude: lonTruck }}
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
                      //onSubmitEditing={() => alert(`Welcome to ${newText}`)}
                      onSubmitEditing = { () => fetchFoodTruckLocation() }
                  />  
                  </View>
              
              </View>
          </View>
  
      );
  }

  export default MapScreen;
  