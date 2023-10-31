
import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, PermissionsAndroid, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location'
import styles from './homemapscreen.styles';
import { COLORS, SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
// Imports
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import LoginView from '../login/LoginView';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {email_info, Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import { PERMISSIONS, Permission} from 'react-native-permissions';
//import Geolocation from '@react-native-community/geolocation';
import { Button } from 'react-native';
//import { AsyncStorage } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Geolocation from 'react-native-geolocation-service';
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

// function MapScreen() {
//     const [loc, setLoc] = useState(null);
//     const [region,setRegion] = useState(null);
//     useEffect(() =>{
//         const getLocation = async () => {
//             let {grant} = await AsyncStorage.getForegroundPermissionsAsync();
//             if (grant != 'granted') {
//                 return;
//             }

//             let location = await AsyncStorage.getCurrentPositionAsync();
//             setLoc(location.coords)

//             setRegion({
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//                 latitudeDelta: 0.005,
//                 longitudeDelta: 0.005,
//             })
//         }

//         getLocation();
//     },[])
//     return (
//         <View style = {{flex:1,}}>
//             {region && (<MapView
//             //Hunter College Coordinates
//                 style={{ flex: 1 }}
//                 //provider='google'
//                 initialRegion={region}
//             >
//                 {loc && (<Marker coordinate={{latitude: loc.latitude, longitude: loc.longitude}}/>)}
//             </MapView>)}

//             <View style = {styles.searchContainer}>
//                 <View style = {styles.searchWrapper}>
//                     <TextInput
//                     style= {styles.searchInput}
//                     value = ""
//                     onChange = { () => {  } }
//                     placeholder= "What are you looking for?"
//                     placeholderTextColor="#888"
//                 />  
//                 </View>
            
//             </View>
//         </View>
//     )
// }

function getInfo() {
}

function MapScreen() {

  //Saving Position 
  const [savedLatitude,setLatitude] = useState(null);
  const [savedLongitude,setLongitude] = useState(null);
  let savedLatDelta = null;
  let savedLongDelta = null;
  

  
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
                      
                      setLatitude(position.coords.latitude);
                      setLongitude(position.coords.longitude);
                      
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

    useEffect(() => {
        checkLocationPermission();
      }, []);

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
    const [userInfo, setInfo] = useState([]);
    firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Customers').doc(auth().currentUser.uid).get().then((snapshot) => {
        if (snapshot.exists)
            setInfo(snapshot.data())
    })
    return (
        <ScrollView style={{flex:1,}}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Image style={{alignSelf: 'center', width: 259, height: 259, marginTop: SIZES.large}} source={require('../../../assets/images/avatar.jpg')}/>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold', marginTop: SIZES.medium}}>
                    Email: {userInfo.email}{"\n"}
                    Username: {userInfo.name}{"\n"}
                    Password: {userInfo.password}{"\n"}
                </Text>
            </View>
        </ScrollView>
    );
}

const HomeMapScreen = ({navigation}) => {
    return (
        <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
            <Tab.Screen name='Map' component={MapScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Order" component={FirstOrderScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}



{/* export default HomeMapScreen;
  }; */}
  
export default HomeMapScreen;
