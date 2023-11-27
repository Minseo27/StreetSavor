import React, { Component } from 'react'
import { View, Text, StyleSheet, Touchable } from 'react-native'
import { useState } from 'react'


import { SIZES } from '../../../constants'
import {
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'

import { Stack, useRouter } from 'expo-router'
import styles from './greeting.styles'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Screen Rotation 
import * as ScreenOrientation from "expo-screen-orientation";


const GreetingPage = ({navigation}) => {
//function GreetingPage({navigation}){
    
    const router = useRouter()
    return (

        <View style={styles.container}>
            <Text style={styles.welcomemessage}>{'Street\nSavor'} </Text>
                    

            <View style = {styles.buttonContainer}>
                <TouchableOpacity style ={styles.button} 
                    onPress =  { ()=> {
                        navigation.navigate('AppAccess', {name: 'AppAccess'})

    
                    }}>
                    <Text style= {styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

        

            </View>
        
        </View>

    )

}


export default GreetingPage;
