
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import  {TextInput, TouchableOpacity}  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from './homemapscreen.styles';
import Image from 'react-native';
import { SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
//import Geolocation from '@react-native-community/geolocation';
// Imports
import MapView from 'react-native-maps';

const HomeMapScreen = ({navigation}) => {
    return (
    <View style = {{flex:1, backgroundColor: '#efcb4e'} }>
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

    
   
    )


};
export default HomeMapScreen;
