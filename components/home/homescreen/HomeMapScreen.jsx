import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
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
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
//import Geolocation from '@react-native-community/geolocation';
// Imports

/*
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
    */


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
                longitude: -73.9543, 
                }}
                title="Initial Location"
                description="This is the initial location"
            />

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
    /*
    useEffect(() => {
        checkLocationPermission();
      }, []);

      const checkLocationPermission = async () => {
        const locationPermission = await AsyncStorage.getItem('locationPermission');
        if (locationPermission === 'granted') {
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
    
                  // Store the permission status
                  await AsyncStorage.setItem('locationPermission', 'granted');
                },
              },
            ]
          );
        }
      };
      */

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
        <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
            <Tab.Screen name='Map' component={MapScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Cart" component={FirstOrderScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}




export default HomeMapScreen;
