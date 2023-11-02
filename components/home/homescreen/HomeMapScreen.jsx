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
import BottomScroll from './BottomSheetScrollView';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MapScreen (){

  const [lat, setLatitude] = useState(null);
  const [lon, setLongitude] = useState(null);
  const [newText, setText] = useState('');

  const [locationDataFetched, setLocationDataFetched] = useState(false);


  useEffect(() => {
    const fetchLocationFromFirestore = async () => {
        const user = auth().currentUser;

        // const userDocRef = firestore()
        // .collection('Users')
        //     .doc('dFqhRhGV5BSuqWYys6bP')
        //     .collection('Vendors')
        //     .doc('zNpo2OBPsA73QZJFM5ub')
        //     .collection('info')
        //     .doc(user.uid);
        
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

  // Variables for Containing Food Truck Location
  const [latTruck, setFoodLatitude] = useState(null);
  const [lonTruck, setFoodLongitude] = useState(null);
  const [locationFoodDataFetched, setFoodLocationDataFetched] = useState(false);



  // Fetching Food Truck Based on Search Bar 
  //useEffect(() => {
      const fetchFoodTruckLocation = async () => { 
        const user = auth().currentUser;

        // const userDocRef = firestore()
        // .collection('Users')
        //     .doc('dFqhRhGV5BSuqWYys6bP')
        //     .collection('Vendors')
        //     .doc('zNpo2OBPsA73QZJFM5ub')
        //     .collection('info')
        //     .doc(user.uid);
        
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
    };

    fetchFoodTruckLocation();
  //}, [] );


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
                //latitude: 40.7861, 
                //longitude: -73.9543,
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
                description={"Here is a truck"}
            >
                <Image source = {require('./foodtruck.jpeg')} style={{height:35, width:35}}/>
            </Marker>

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

const FirstOrderScreen = ({navigation}) => {
    var list_of_vendors = vendor_list.map(truck => <Pressable style={{height: 100,backgroundColor: COLORS.lightWhite, marginBottom: SIZES.small, alignItems: 'baseline'}} onPress={ () => navigation.navigate('SecondOrderScreen',{name: 'SecondOrderScreen'})}>
        <Text style={{textAlign: 'left', fontSize: SIZES.large, marginLeft: SIZES.small, marginTop: SIZES.xSmall}}>
            {truck.name}
        </Text>
        <Text style={{textAlign: 'left', fontSize: SIZES.small, marginLeft: SIZES.small, marginTop: SIZES.small, marginBottom: SIZES.small}}>
            Email: {truck.contact[0]}
        </Text>
        <Text style={{textAlign: 'left', fontSize: SIZES.small, marginLeft: SIZES.small, marginBottom: SIZES.small}}>
            Phone: {truck.contact[0]}
        </Text>
    </Pressable>);
    return (
        <ScrollView style={{flex:1,}}>
            {list_of_vendors}
            {/* <View style={{flex:1,justifyContent:'center',}}>
                <Text style={{textAlign:'center'}}>This will be the first order screen</Text>
            </View> */}
        </ScrollView>
    );
}

const TabNavigator = () => (
  <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
    <Tab.Screen name='Map' component={MapScreen} options={{headerShown: false}}/>
    <Tab.Screen name="Cart" component={FirstOrderScreen} options={{headerShown: false}}/>
    <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
  </Tab.Navigator>
);

function AccountPage () {
    return (
        <ScrollView style={{flex:1,}}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{textAlign: 'center'}}>
                    This will be the account page.
                </Text>
            </View>
        </ScrollView>
    );
}

const HomeMapScreen = ({navigation}) => {
        const checkLocationPermission = async () => {
          const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (result === RESULTS.DENIED) {
            const permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (permissionResult === RESULTS.GRANTED) {
              getUserLocationAndStoreInFirestore();
            }
          } else if (result === RESULTS.GRANTED) {
            getUserLocationAndStoreInFirestore();
          }
        };
      
        const getUserLocationAndStoreInFirestore = () => {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              storeLocationInFirestore(latitude, longitude);
              
            },
            (error) => {
              console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
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
              console.error('Error updating location:', error);
            });
        };
      
        useEffect(() => {
          checkLocationPermission();
        }, []);

      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Map' options={{flex: 1,}}>
          <Stack.Screen name="Home" component={MapScreen} />
          <Stack.Screen name="BottomSheetScreen" component={BottomScroll} />
          <Stack.Screen name="Navigator" component={TabNavigator} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}




export default HomeMapScreen;