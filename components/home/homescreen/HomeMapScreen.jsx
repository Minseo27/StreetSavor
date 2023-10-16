
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import  {TextInput, TouchableOpacity}  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from './homemapscreen.styles';
import Image from 'react-native';
import { SIZES } from '../../../constants'
import Input from 'postcss/lib/input';



const HomeMapScreen =  ({navigation}) => {
    return (

        
        <View styles = {styles.container}> 

        <View styles = {styles.searchContainer}>

            <View styles = {styles.searchWrapper}>
                <TextInput
                style= {styles.searchInput}
                value = ""
                onChange = { () => {  } }
                placeholder= "What are you looking for?"
            />  
            </View> 

            <
        </View>


    </View>
    )

};

export default HomeMapScreen;
