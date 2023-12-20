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
import { TouchableOpacity } from '@gorhom/bottom-sheet';

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
          { enableHighAccuracy: true, timeout: 15000}
        );
      };
    
      useEffect(() => {
        checkLocationPermission();
      }, []);


    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);
    const [newText, setText] = useState('');
  
    const [locationDataFetched, setLocationDataFetched] = useState(false);
    const [markerDataFetched, setMarkerDataFetched] = useState(false);
  
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
    

    // Setting Cooridintes to be Used in route Polyline
    const [showPolyline, setShowPolyline] = useState(false);


    const [curTruckLat,setTruckLat] = useState(null);
    const [curTruckLon,setTruckLon] = useState(null);

    // Variables for Containing Food Truck Location
    const [latTruck, setFoodLatitude] = useState(null);
    const [lonTruck, setFoodLongitude] = useState(null);
    const [truckName, setTruckName] = useState('');
    // const [coords,setCoords] = useState(null);
    const [locationFoodDataFetched, setFoodLocationDataFetched] = useState(false);
    const [initialFetched,isInitiallyFetched] = useState(false);
  
    // Fetching Food Truck Based on Search Bar 
    //useEffect(() => {
        const fetchFoodTruckLocation = async () => {
       //if(newText) 
           try{
               const vendorDocRef = firestore()
               .collection('Users')
               .doc('dFqhRhGV5BSuqWYys6bP')
               .collection('Vendors')
               .doc('zNpo2OBPsA73QZJFM5ub')
               .collection('info');
              //  const query = vendorDocRef.where("name", '!=', false).limit(1);
               const userDoc = await vendorDocRef.where("name", "!=", newText).limit(1).get();

               if (!userDoc.empty) {
                   const vendorDoc = userDoc.docs[0];
                   setTruckName(vendorDoc.data().name);
                   const locationData = vendorDoc.data().location;
                   if (locationData) {
                    // const c = locationData;
                    const { latitude, longitude } = locationData;
                    setFoodLatitude(latitude); 
                    setFoodLongitude(longitude);
                    // setCoords(c);
                    setFoodLocationDataFetched(true);
                    setMarkerDataFetched(true);
                      //console.log(latitude,longitude);
                   } else {
                    console.log('No location data found for the user.');
                    }
               } else {
                    console.log('User document does not exist.');
               }
           } catch(error) {
               console.error("Error searching for vendor location:", error);
           }
        //}
        }; 
      
      if (initialFetched == false) {
        fetchFoodTruckLocation();
        isInitiallyFetched(true)
      }

      const searchFoodTruckLocation = async () => {
        setShowPolyline(false);
        setFoodLocationDataFetched(false);
        setMarkerDataFetched(false);
        setTruckName('')
        //if(newText) {
            try{
                const vendorDocRef = firestore()
                .collection('Users')
                .doc('dFqhRhGV5BSuqWYys6bP')
                .collection('Vendors')
                .doc('zNpo2OBPsA73QZJFM5ub')
                .collection('info');
               //  const query = vendorDocRef.where("name", '!=', false).limit(1);
                const userDoc = await vendorDocRef.where("name", "==", newText).limit(1).get();
 
                if (!userDoc.empty) {
                    const vendorDoc = userDoc.docs[0];
                    setTruckName(vendorDoc.data().name);
                    const locationData = vendorDoc.data().location;
                    if (locationData) {
                     // const c = locationData;
                     const { latitude, longitude } = locationData;
                     setFoodLatitude(latitude); 
                     setFoodLongitude(longitude);
                     // setCoords(c);
                     setFoodLocationDataFetched(true)
                     setMarkerDataFetched(true);
                       //console.log(latitude,longitude);
                    } else {
                     console.log('No location data found for the user.');
                     }
                } else {
                     console.log('User document does not exist.');
                }
            } catch(error) {
                console.error("Error searching for vendor location:", error);
            }
          //}
         }; 
  
      // useEffect (() => { 
      //   //const mapMarkerMaker = () => {
      //         const user = auth().currentUser;
      //         let markersData = [];
    
      //           //const user = auth().currentUser;
      //           const usersCollectionRef = firestore()
      //                   .collection('Vendors')
      //                   .doc('zNpo2OBPsA73QZJFM5ub')
      //                   .collection('info')
    
      //       usersCollectionRef.get().then((querySnapshot) => {
      //           querySnapshot.forEach((vendorDoc) => {
      //           const vendorData = vendorDoc.data();
      //           const latName = vendorData.location.latitude
      //           //const longName = vendorData.location.longitude
      //           if (vendorData.location) {
      //             if ((vendorData.location.latitude != null) && (vendorData.location.longitude != null)) {
      //               const { latitude, longitude } = vendorData.location;
      //               const title = vendorData.name;
      //               console.log(title);
      //               //console.warn(latitude)
      //               markersData.push({latitude,longitude,title})
                
      //               setMarkers(markersData);
      //             }
      //           } 
      //           //console.warn(markersData)
      //           });           
      //       })  
           
      //   },[]); 

    // Setting Condition for Rendering Truck Route
    const getRouteLocation = () =>{
        setShowPolyline(true)
    }

    //console.warn(`${lat}`, `${lon}`)
  
      return (
          <View style = {{flex:1}}>


      
                {/* <TouchableOpacity >
                <Image 
                  source={require('./shopping-cart.png')} 
                  style ={ {width: 50, height: 50,position: 'absolute', top: 0, right: 0 }}/>
                  </TouchableOpacity> */}

              {locationDataFetched ? (
                  //Conditional Map Render
              <MapView
              //Hunter College Coordinates
              
                  style={{ flex: 1 }}
                  initialRegion={{
                  //latitude:  40.7861,
                  //longitude: -73.9543,
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
                  title="You"
                  description="You are here">
                  <Image source={require('./location-pin.png')} style={{height: 35, width:35 }} />
              </Marker>

              {/* {markers.map( (marker, index) => {
                return <Marker
                    key={index}
                    coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    }}
                    title={marker.name ? String(marker.name): 'undefined'}
                    description='Your Nearest Truck'
                onPress={() => (setTruckLat(marker.latitude), setTruckLon(marker.longitude), getRouteLocation)}>
                    <Image source={require('./truckicon.png')} style={{ height: 32, width: 32}} />
                </Marker>
                })} */}

              {markerDataFetched ? (<Marker
                  coordinate ={{
                      latitude: latTruck,
                      longitude: lonTruck,
                  }}
                  title={truckName}
                  description='Your Nearest Truck'
                  onPress={getRouteLocation}
              >
                  <Image source = {require('./truckicon.png')} style={{height:35, width:35}}/>
              </Marker>

              {showPolyline && 
              (<MapViewDirections
                origin={{ latitude: Number(lat), longitude: Number(lon) }}
                destination={{ latitude: Number(latTruck), longitude: Number(lonTruck) }}
                apikey={"AIzaSyBLoT-2L2OzwWceQVT4VHgy3AFTXkWeqHU"} // Your API Key
                // coordinates={[curTruckLat,curTruckLon]}
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
                      onChangeText = {setText}
                      placeholder= "What are you looking for?"
                      placeholderTextColor="#888"
                      onSubmitEditing = {searchFoodTruckLocation}
                  />  
                  </View>
              
              </View>
             
          </View>
  
      );
  }

  export default MapScreen;
