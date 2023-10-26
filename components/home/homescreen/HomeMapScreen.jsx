
import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location'
import styles from './homemapscreen.styles';
import Image from 'react-native';
import { COLORS, SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
// Imports
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import LoginView from '../login/LoginView';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import { PERMISSIONS, Permission} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { Button } from 'react-native';

const Tab = createBottomTabNavigator();

function MapScreen() {
    const {loc, setLoc} = useState(null);
    const {region,setRegion} = useEffect(null);
    useEffect(() =>{
        const getLocation = async () => {
            let {grant} = await Location.getForegroundPermissionsAsync();
            if (grant != 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            setLoc(location.coords)

            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            })
        }

        getLocation();
    },[])
    return (
        <View style = {{flex:1,}}>
            {region && (<MapView
            //Hunter College Coordinates
                style={{ flex: 1 }}
                //provider='google'
                initialRegion={region}
            >
                {loc && (<Marker coordinate={{latitude: loc.latitude, longitude: loc.longitude}}/>)}
            </MapView>)}

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



export default HomeMapScreen;
