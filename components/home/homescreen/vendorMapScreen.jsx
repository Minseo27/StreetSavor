
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable, ActivityIndicatorBase, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './homemapscreen.styles';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, SIZES } from '../../../constants'
import { ScrollView } from 'react-native';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import * as permissions from 'react-native-permissions';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import auth, { firebase } from '@react-native-firebase/auth';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import { Button } from 'react-native';
import Dialog from "react-native-dialog";
import { Modal } from 'react-native';

const Tab = createBottomTabNavigator();
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
            const { latitude, longitude } = vendorData.location;

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
                latitude:  Number(lat),
                longitude: Number(lon),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                }}
            >

            <Marker
                coordinate={{
              
                latitude:  Number(lat),
                longitude: Number(lon),
                
                }}
                description={"You are here"}>
                <Image source={require('./truckicon.png')} style={{height: 32, width:32 }} />
              
              
            </Marker>
          
          
            {markers.map( (marker, index) => (
              <Marker
                  key={index}
                  coordinate={{
                  latitude: Number(marker.latitude),
                  longitude: Number(marker.longitude),
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
    const [arr,setCheckArr] = useState([]);
    const docRef = firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').doc(auth().currentUser.uid);
    // const batch = firebase.firestore().batch();
    const [item,setItem] = useState([]);
    const [foodName,setFoodName] = useState('');
    const [price,setPrice] = useState('');
    const [status,setStatus] = useState('');
    const [visible, setVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [userMenu,setInfo] = useState([]);
    const [removeName,setRemovalName] = useState('');

        // Use effect to fetch menu info from vendor
        useEffect(() => {
            const fetchMenuInfo = async () => {
                const user = auth().currentUser;
                try {
                const vendorDocRef = firestore()
                .collection('Users')
                    .doc('dFqhRhGV5BSuqWYys6bP')
                    .collection('Vendors')
                    .doc('zNpo2OBPsA73QZJFM5ub')
                    .collection('info')
                    .doc(user.uid);
    
                
                // Get vendor document
                const vendorDoc = await vendorDocRef.get();
                
                // If the vendor document exists
                if (vendorDoc.exists) {
                    // Set the menu_list map to the vendordoc menu, but we are not done yet. We will need
                    // convert the map to an array
                    const menu_list = vendorDoc.data().menu;
                    if (menu_list) {
                        // Create a new empty array
                        const list = [];
                        // Add objects from app to the array
                        Object.keys(menu_list).forEach((key) => {
                            list.push(menu_list[key]);
                        });
                        console.log(list);
                        // Set the newly made array to the userMenu
                        setInfo(list);
                    }
                } else {
                    console.log('User document does not exist.');
                }
                } catch (error) {
                console.error('Error fetching menu data:', error);
                }
            };
        
            fetchMenuInfo();
        }, []);
    
    // We use this function to open the dialog
    const handleDialog = () => {
        setVisible(true);
        setItem(VendorItem);
    };

    // We use this to close the delete dialog
    const handleDeleteDialog = () => {
        setDeleteVisible(true);
    };

    // Function to handle the deletion of items
    const handleDeleteAccept = () => {
        // Set initial menu path
        let menu_title = 'menu.$';
        // We create a new array to store the item_names from the original userMenu array, we do not need the price or status for this
        let checkArr = userMenu?.map((t) => t.item_name);
        // We do a simple check to see if the removeName is included in the checkArr.
        if (checkArr.includes(removeName)) {
            console.log("FOUND!");
            // Set the table_name path to the removeName var
            let table_name = removeName;
            // Here we start the process of removing the item from the userMenu.

            // Set x to the first element of the userMenu.
            let x = userMenu[0];
            // Set the first index element to be the item located in the userMenu in the index it would have been located on the checkArr.
            userMenu[0] = userMenu.at(checkArr.indexOf(removeName));
            // Set the element at the index where removeName would have been located in checkArr to be x (original first element.)
            userMenu[checkArr.indexOf(removeName)] = x;
            // Shift to remove first element (which would be the element we need to remove), ending the process
            userMenu.shift();
            // We do a simple docRef.update to remove the element in the database.
            docRef.update({
                [menu_title.concat(table_name.toString())]: firebase.firestore.FieldValue.delete(),
            });

        }
        setDeleteVisible(false);
        setRemovalName('');
    }

    // Function to handle when cancel option is chosen for the delete dialog.
    const handleDeleteCancel = () => {
        setDeleteVisible(false);
        setRemovalName('');
    }

    // Function to handle the accept option for creating new items
    const handleAccept = () => {
        // Assign object vars to the food name, price status
        item.item_name = foodName;
        item.price = price;
        item.status = status;
        // Since we are using dot notation, we need to set the default path for the menu field
        let menu_title = 'menu.$';
        // The table name is where we will traverse to.
        let table_name = item.item_name;
        // We only add the item if every field has a value, if not, it will not be added.
        if ((item.item_name != '') && (item.price != '') && (item.status != '')) {
            docRef.update({
                [menu_title.concat(table_name.toString())]: item,
            });
            userMenu.push(item);
        }
        setVisible(false);
        // setItemList(list);
        setFoodName('');
        setPrice('');
        setStatus('');

    };
    
    // Handle cancellation.
    const handleCancel = () => {
        setVisible(false);
    };

    var menuItemList = userMenu.map(food => <Pressable style={{height: 150,backgroundColor: '#efcb4e', marginTop: SIZES.small, marginBottom: SIZES.small, alignItems: 'center', borderRadius: 50, padding: 35, margin: 20}}>
        <Image source={require('./foodicon.png')} style={{height: 32, width:32 }} />
        <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic'}}>
            {food.item_name}
        </Text>
        <Text style={{fontSize: SIZES.small, fontWeight: 'bold', fontStyle: 'italic'}}>
            ${food.price}
        </Text>
        <Text style={{fontSize: SIZES.small, fontWeight: 'bold', fontStyle: 'italic'}}>
            {food.status}
        </Text>
    </Pressable>);

    return (
        <View style={{flex: 1}}>
            <Button onPress={handleDialog} title="Add Item" color="#000000"/>
            <ScrollView style={{flex: 1}}>
                {menuItemList}
                 <View style={modalStyles.firstViewContainer}>
                    <Modal transparent={true} animationType="slide" visible={visible} style={{backgroundColor: '#efcb4e'}}>
                        <View style={modalStyles.firstViewContainer}>
                            <View style={modalStyles.modalViewContainer}>
                                <Text style={modalStyles.modalTopText}>Let's create a new item!</Text>
                                <Text style={modalStyles.modalText}>What is your item's name?</Text>
                                <TextInput placeholder="Enter item name" style={modalStyles.modalTextInput} keyboardType="default" onChangeText={setFoodName} value={foodName}/>
                                <Text style={modalStyles.modalText}>What is your item's price?</Text>
                                <TextInput placeholder="Enter item price" style={modalStyles.modalTextInput} keyboardType="numeric" onChangeText={setPrice} value={price}/>
                                <Text style={modalStyles.modalText}>What is your item's availability status?</Text>
                                <TextInput placeholder="Enter item status" style={modalStyles.modalTextInput} keyboardType="default" onChangeText={setStatus} value={status}/>
                                <View style={modalStyles.modalButtonContainer}>
                                    <Button title="OK" color='#efcb4e' onPress={handleAccept}/>
                                    <View style={modalStyles.modalButtonContainer}>
                                        <Button title="Cancel" color='#efcb4e' onPress={handleCancel}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={modalStyles.firstViewContainer}>
                    <Modal transparent={true} animationType="slide" visible={deleteVisible} style={{backgroundColor: '#efcb4e'}}>
                        <View style={modalStyles.firstViewContainer}>
                            <View style={modalStyles.modalViewContainer}>
                                <Text style={modalStyles.modalTopText}>Enter the item to delete</Text>
                                <TextInput placeholder="Enter item name" style={modalStyles.modalTextInput} keyboardType="default" onChangeText={setRemovalName} value={removeName}/>
                                <View style={modalStyles.modalButtonContainer}>
                                    <Button title="OK" color='#efcb4e' onPress={handleDeleteAccept}/>
                                    <View style={modalStyles.modalButtonContainer}>
                                        <Button title="Cancel" color='#efcb4e' onPress={handleDeleteCancel}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            <Button onPress={handleDeleteDialog} title="Delete Item" color="#000000"/>
        </View>
    );
}

const AccountPage = ({navigation}) => {
    const [userInfo, setInfo] = useState([]);
    firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').doc(auth().currentUser.uid).get().then((snapshot) => {
        if (snapshot.exists)
            setInfo(snapshot.data())
    })
    return (
        <ScrollView style={{flex:1,}}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Image style={{alignSelf: 'center', width: 256, height: 256, marginTop: SIZES.large}} source={require('./truckicon.png')}/>
                <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center', alignContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold', marginLeft: SIZES.small}}>
                    Email: {userInfo.email}{"\n"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center',alignContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold', marginLeft: SIZES.small}}>
                    Username: {userInfo.name}{"\n"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center',alignContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold' ,marginLeft: SIZES.small}}>
                    Password: {userInfo.password}{"\n"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('VendorLoginView')}} style={{marginTop:SIZES.xLarge, backgroundColor: COLORS.lightWhite, justifyContent: 'center', alignContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                    Sign Out
                  </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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

 const modalStyles = StyleSheet.create({
    firstViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewContainer: {
        backgroundColor: '#efcb4e',
        borderRadius: 50,
        margin: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontWeight: 'bold',
        fontSize: SIZES.large,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    modalTopText: {
        fontWeight: 'bold',
        fontSize: SIZES.large,
        fontStyle: 'italic',
        marginBottom: 20,
        textAlign: 'center'
    },
    modalTextInput: {
        fontWeight: 'bold',
        fontSize: SIZES.large,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }

  });
  export default VendorMapScreen;