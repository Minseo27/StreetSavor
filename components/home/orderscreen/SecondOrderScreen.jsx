import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Image from 'react-native';
import { COLORS, SIZES } from '../../../constants'
import Input from 'postcss/lib/input';
import { Component } from 'react/cjs/react.production.min';
//import { MapsComponent } from '@syncfusion/ej2-react-maps';
//import Geolocation from '@react-native-community/geolocation';
// Imports
import MapView from 'react-native-maps';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';

const Tab = createBottomTabNavigator();

const SecondOrderScreen = ({navigation}) => {
    var list_of_items = vendor_list.map(truck => (truck.menu).map(item => <Pressable style={{height: 100,backgroundColor: COLORS.lightWhite, marginBottom: SIZES.small, alignItems: 'baseline'}}>
        <Text style={{textAlign: 'left', fontSize: SIZES.large, marginLeft: SIZES.small, marginTop: SIZES.xSmall, color: COLORS.gray2}}>
            {item[0]}
        </Text>
        <Text style={{textAlign: 'left', fontSize: SIZES.small, marginLeft: SIZES.small, marginTop: SIZES.small, marginBottom: SIZES.small}}>
            Price: {item[1]}
        </Text>
        <Text style={{textAlign: 'left', fontSize: SIZES.small, marginLeft: SIZES.small, marginBottom: SIZES.small}}>
            Status: {item[2]}
        </Text>
    </Pressable>));
    return (
        <View style={{flex: 1,}}>
            <ScrollView style={{flex:1,}}>
                {list_of_items}
                {/* <View style={{flex:1,justifyContent:'center',}}>
                    <Text style={{textAlign:'center'}}>This will be the first order screen</Text>
                </View> */}
            </ScrollView>
        </View>
        
    );
    
}

export default SecondOrderScreen;