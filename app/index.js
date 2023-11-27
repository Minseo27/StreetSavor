import {React, useState, useEffect} from 'react'; 
import { StyleSheet } from '@bacons/react-views';
import GreetingPage from '../components/home/greeting/GreetingPage';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
//tell React that we will implement a navigator
import { NavigationContainer } from "@react-navigation/native";
//create a stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import AccessApp from '../components/home/continue/AccessApp';
import CustomerLoginView from '../components/home/login/CustomerLoginView';
import CustomerSignupView from '../components/home/signup/CustomerSignupView';
import VendorLoginView from '../components/home/login/VendorLoginView';
import VendorSignupView from '../components/home/signup/VendorSignupView';
import VendorHomeMapScreen from '../components/home/homescreen/VendorHomeMapScreen';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import HomeMapScreen from '../components/home/homescreen/HomeMapScreen';
import VendorMapScreen from '../components/home/homescreen/vendorMapScreen';
// Creating Navigator
const Stack = createNativeStackNavigator()

// Screen Rotation 
import * as ScreenOrientation from "expo-screen-orientation";

// Home Screen With Map
//import HomeMapScreen from '../components/home/homescreen/HomeMapScreen';
import SecondOrderScreen from '../components/home/orderscreen/SecondOrderScreen';
import { SIZES } from '../constants';

// Application Root With Navigator
function App() {
    const router = useRouter()
    return (
        <SafeAreaView style = { {flex:1 , backgroundColor : '#efcb4e'} }>
        <NavigationContainer independent={true}>
           <Stack.Navigator >
            
                <Stack.Screen name = 'Initial' component={GreetingPage}
                // Initial Screen is the Greeting Page
                    options = { {
                        //backgroundColor: '#efcb4e',
                        headerStyle: {backgroundColor: '#efcb4e'},
                        // Removing the Shadow
                        headerShadowVisible: false, 
                        headerTitle:'',
                        }}
                />
               
                <Stack.Screen name='AppAccess' component={AccessApp} 
                    options = { {
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible: false,
                        headerTitle:'',
                        headerTintColor: 'black'
                    }
                    }                
                />

                <Stack.Screen name='CustomerLoginView' component={CustomerLoginView}
                    options = {{
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible: false,
                        headerTitle:'',
                        headerTintColor: 'black'
                    }}
                />

                <Stack.Screen name='VendorLoginView' component={VendorLoginView}
                    options = {{
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible: false,
                        headerTitle:'',
                        headerTintColor: 'black'
                    }}
                />
                
                <Stack.Screen name='CustomerSignupView' component={CustomerSignupView}
                    options = {{
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible: false,
                        headerTitle:'',
                        headerTintColor: 'black'
                    }}
                />

                <Stack.Screen name='VendorSignupView' component={VendorSignupView}
                    options = {{
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible: false,
                        headerTitle:'',
                        headerTintColor: 'black'
                    }}
                />
                <Stack.Screen name='HomeMapScreen' component={HomeMapScreen}
                    options ={ {
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible:false,
                        headerTitle: 'Street Savor',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: SIZES.large,
                        },
                        headerTitleAlign: 'center',
                    }}
                />

                <Stack.Screen name='VendorMapScreen' component={VendorMapScreen}
                    options ={ {
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible:false,
                        headerTitle: 'Street Savor',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: SIZES.large,
                        },
                        headerTitleAlign: 'center',
                    }}
                />

                <Stack.Screen name='SecondOrderScreen' component={SecondOrderScreen}
                    options ={ {
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible:false,
                        headerTitle: 'Street Savor',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: SIZES.large,
                        },
                        headerTitleAlign: 'center',
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>

        </SafeAreaView>
    )

                   
} 


const styles = StyleSheet.create({
    buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderCurve:'circular',

        width:150,
        length:50,
      
        backgroundColor: '#0E7AFE',
    }
})

const stylesText =  StyleSheet.create({
    textWord: {
        fontSize: 40,
        fontWeight:'bold',
        fontFamily: 'Baskerville',
        textAlign: 'center',
        elavation:40
    }

})




export default App;
