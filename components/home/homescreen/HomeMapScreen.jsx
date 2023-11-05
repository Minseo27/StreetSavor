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
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import BottomScroll from './BottomSheetScrollView';

const Tab = createBottomTabNavigator();

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
              <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                  Email: {userInfo.email}{"\n"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center',alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                  Username: {userInfo.name}{"\n"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center',alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                  Password: {userInfo.password}{"\n"}
                </Text>
              </TouchableOpacity>
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
        <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
            <Tab.Screen name='Map' component={BottomScroll} options={{headerShown: false}}/>
            <Tab.Screen name="Cart" component={FirstOrderScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}




export default HomeMapScreen;