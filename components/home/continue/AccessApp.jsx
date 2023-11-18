import * as React from 'react';
import { View, Text, ScrollView, Button,SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GreetingPage from '../greeting/GreetingPage';
import { NavigationActions } from 'react-navigation';
import styles from './AppAccess.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Page to change access type                    
const AppAcccess = ({navigation}) => {

    return (

        <View style = {styles.container}> 

            <Text style={styles.welcomeMessage}>
                How would you like to use Street Savor? 
            </Text>
            <View style = {styles.buttonContainer}>

            <TouchableOpacity style={styles.button} 
                onPress = { () => {
                    navigation.navigate('CustomerLoginView', {name:'CustomerLoginView'})
                } }>
                <Text style= {styles.buttonText}>I am a Customer</Text>

            </TouchableOpacity>
        

            <View  style = {styles.buttonContainerRight}>
            <TouchableOpacity style = {[styles.button, { marginTop: 15 }]} 
                onPress ={ () => {
                    navigation.navigate('VendorLoginView', {name: 'VendorLoginView'})
                }}>
                        <Text style = {styles.buttonText}> I am a Vendor</Text>

            </TouchableOpacity>

            </View>
           
           </View>
           
        </View>

    )
} 




export default AppAcccess;
