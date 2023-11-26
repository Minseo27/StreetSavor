
import React, { useEffect } from 'react';
import { render } from 'react-dom';
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
import { Button } from 'react-native';
import Dialog from "react-native-dialog";
// import Modal from 'react-native-modal'
import { Modal } from 'react-native';
// import MapView from 'react-native-maps';

// MapboxGL.setAccessToken("pk.eyJ1Ijoiam1vdG9yb2xhIiwiYSI6ImNscDN1M2kyZTExaWkyamxvdDVkbmQ5dzYifQ.fJOlBvxpmA3cDLmlQ9HrOQ")
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
    const docRef = firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').doc(auth().currentUser.uid);
    const [item,setItem] = useState({});
    const [foodName,setFoodName] = useState('');
    const [price,setPrice] = useState('');
    const [status,setStatus] = useState('');
    const [userInfo, setInfo] = useState([]);

    const [visible, setVisible] = useState(false);

    const handleDialog = () => {
        setVisible(true);
        setItem(VendorItem);
    };

    const handleAccept = () => {
        item.item_name = foodName;
        item.price = price;
        item.status = status;
        // firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').doc(auth().currentUser.uid).get().then((snapshot) => {
        //     if (snapshot.exists)
        //         snapshot.data().menu.push(item)
        // });
        // firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').doc(auth().currentUser.uid).set(userInfo);
        setVisible(false);
    };
    
    const handleCancel = () => {
        setVisible(false);
    };

    // firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').doc(auth().currentUser.uid).get().then((snapshot) => {
    //     if (snapshot.exists)
    //         setInfo(snapshot.data())
    // })
    return (
        <View style={{flex: 1}}>
            <Button onPress={handleDialog} title="Add Item" color="#000000"/>
            <ScrollView style={{flex: 1}}>
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
                    {/* <Dialog.Container visible={visible}>
                        <Dialog.Title>
                            <Text style={{color: COLORS.primary, fontWeight: 'bold', textAlign: 'center', justifyContent: 'center'}}>New Item</Text>
                        </Dialog.Title>
                        <Dialog.Description>
                            <Text style={{color: COLORS.primary, textAlign: 'center', justifyContent: 'center'}}>What is the name of your item?</Text>
                        </Dialog.Description>
                        <Dialog.Input label={foodItem}/>
                        <Dialog.Description>
                            <Text style={{color: COLORS.primary, textAlign: 'center', justifyContent: 'center'}}>What is the price of the item?</Text>
                        </Dialog.Description>
                        <Dialog.Input label={price}/>
                        <Dialog.Description>
                            <Text style={{color: COLORS.primary, textAlign: 'center', justifyContent: 'center'}}>What is the availability of the item?</Text>
                        </Dialog.Description>
                        <Dialog.Input label={status}/>
                        <Dialog.Button color="#169689" label="OK" onPress={handleAccept}/>
                        <Dialog.Button color="#169689" label="Cancel" onPress={handleCancel}/>
                    </Dialog.Container> */}
                </View>
            </ScrollView>
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
                <Image style={{alignSelf: 'center', width: 259, height: 259, marginTop: SIZES.large}} source={require('../../../assets/images/avatar.jpg')}/>
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
