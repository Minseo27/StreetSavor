
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
//import Geolocation from 'react-native-geolocation-service';
//import Image from 'react-native';
import { COLORS, SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
import Geolocation from '@react-native-community/geolocation';
// Imports
//import MapView from 'react-native-maps';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import { useEffect } from 'react';
import { useState } from 'react';
import { PermissionsAndroid } from 'react-native';

//Fire Store
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('Users');




//Added Imports
//import db from './firebase';
//import './read.css';

//import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


//import { Marker } from 'react-native-maps';
//import geolocation from '@react-native-community/geolocation'
//import Geolocation from 'react-native-geolocation-service';

const Tab = createBottomTabNavigator();

function MapScreen() {

    //Saving Position 
    let savedLatitude = null;
    let savedLongitude = null;
    //Saving Text Change
    const [newText, setText] = useState('');

    // Used for fetching data
    const [info, setInfo] = useState([]);
    //const db = firebase.firestore();

    //const db = getDatabase();

    const users = firestore().collection('Users').get();
    console.warn( {users} )


    // const Fetchdata = () => {
    //     db.collection("users").get().then((querySnapshot) => {
 
    //         // Loop through the data and store
    //         // it in array to display
    //         querySnapshot.forEach(element => {
    //             var data = element.data();
    //             setInfo(arr => [...arr, data]);
    //         });
    //     })
    // }

    return (

        
        <View style = {{flex:1,}}>
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

                <Marker 
                    coordinate={{
                        latitude: 40.7861,
                        longitude: -73.9543, }}
                        description={"You are Here!"}
                    >
                    <Image source={require('./location-pin.png')} style={{height: 35, width:35 }} />
                </Marker>


                <Marker 
                    coordinate={{
                        latitude: 40.7869,
                        longitude: -73.9549, }}
                        description={"Halal Food Truck"}
                    >
                    <Image source={require('./foodtruck.jpeg')} style={{height: 35, width:35 }} />
                </Marker>





            </MapView>

            <View style = {styles.searchContainer}>
                <View style = {styles.searchWrapper}>
                    <TextInput
                    style= {styles.searchInput}
                    value = {newText}
                    onChangeText = {newText => setText(newText)}
                    placeholder= "What are you looking for?"
                    placeholderTextColor="#888"
                    //onSubmitEditing={() => alert(`Welcome to ${newText}`)}

                    //defaultValue={text}
                    
                />
                </View> 
                    
            </View>

            <TouchableOpacity style ={styles.button} 
                    onPress =  { ()=> {
                        console.warn( `${newText}` )
                    }}>
                    <Text style= {styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            
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

const HomeMapScreenAndroid = ({navigation}) => {
const requestPermision = async () =>{

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title:'Permsion',
                message:'come',
                buttonNeutral:'Ask Me Later',
                buttonNegative:'Cancel',
                buttonPositive:'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log("camera");
        }else{
            console.log('camera denied');
        }
    } catch(err) {

        console.warn(err);
    }
    };

    const[ currentLocation, setCurrentLocation] = useState(null)
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(

            position => {const [lat, long] = position.coords;
                setCurrentLocation({lat, long })
                console.warn(lat)
            },

            error => alert('Error', error.message),
            {enableHighAccuracy: false, timeout:15000, maximumAge:1000}   
        )
    }
    return(

        <View>

            
         </View>
    )
  
}




const HomeMapScreen = ({navigation}) => {


    useEffect(() => {
        checkLocationPermission();
      }, []);

      const checkLocationPermission = async () => {
        const locationPermission = await AsyncStorage.getItem('locationPermission');
        if (locationPermission === 'granted') {
            //console.warn("hello")
            
            // Geolocation.getCurrentPosition((position) => {
            //     var lat = parseFloat(position.coords.latitude)
            //     var long = parseFloat(position.coords.longitude)
            //     console.warn(long)
            // })

            // var savedLatitude = undefined

            
                
            //       Geolocation.getCurrentPosition(
            //           (position) => {
            //             //console.warn(position);
            //             savedLatitude = position.coords.latitude
            //           },
            //           (error) => {
            //             // See error code charts below.
            //             console.log(error.code, error.message);
            //           },
            //           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            //       );
            //     console.warn(savedLatitude)


                const options = {
                    //enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 1000,
                    authorizationLevel:'always'
                  };
                  
                  function success(pos) {
                    const crd = pos.coords;
                  
                    //console.log("Your current position is:");
                    //console.log(`Latitude : ${crd.latitude}`);
                    console.warn(`Longitude: ${crd.longitude}`);
                    //console.log(`More or less ${crd.accuracy} meters.`);
                  }
                  
                  function error(err) {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                  }
                  
                  Geolocation.getCurrentPosition(success, error, options);
              

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
    
                    //console.warn("hello")
                  // Store the permission status
                  await AsyncStorage.setItem('locationPermission', 'granted');
                },
              },
            ]
          );
        }
      };

    return (
        <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
            <Tab.Screen name='Map' component={MapScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Order" component={FirstOrderScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}




export default HomeMapScreen;
