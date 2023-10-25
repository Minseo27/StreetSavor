
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
import Geolocation from 'react-native-geolocation-service';
//import Image from 'react-native';
import { COLORS, SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
//import Geolocation from '@react-native-community/geolocation';
// Imports
//import MapView from 'react-native-maps';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

function MapScreen() {
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

            </MapView>

            <View style = {styles.searchContainer}>
                <View style = {styles.searchWrapper}>
                    <TextInput
                    style= {styles.searchInput}
                    value = ""
                    onChange = { () => {  } }
                    placeholder= "What are you looking for?"
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
    useEffect(() => {
        checkLocationPermission();
      }, []);

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
