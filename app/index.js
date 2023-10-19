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
import LoginView from '../components/home/login/LoginView';

// Creating Navigator
const Stack = createNativeStackNavigator()

// Screen Rotation 
import * as ScreenOrientation from "expo-screen-orientation";

// Home Screen With Map
import TabScreen from '../components/home/homescreen/TabScreen';

const Example = ( ) =>   {
    return (
        <Text> Test</Text>
    )
} 

// Application Root With Navigator
function App() {


    const router = useRouter()
    return ( 


        <SafeAreaView style = { {flex:1 , backgroundColor : '#efcb4e'} }>

        <NavigationContainer independent={true} >

    
           <Stack.Navigator>
            
                <Stack.Screen name = 'Initial' component={GreetingPage}
                // Initial Screen is the Greeting Page
                    options = { {
                        //Background color # F2F2F2
                        headerStyle: {backgroundColor: '#efcb4e'},
                        // Removing the Shadow
                        headerShadowVisible: false, 
                        headerTitle:"",
                        //headerMode:'none'
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

                <Stack.Screen name='LoginView' component={LoginView}
                    options = {{
                        headerStyle:{backgroundColor:'#efcb4e'},
                        headerShadowVisible: false,
                        headerTitle:'',
                        headerTintColor: 'black'
                    }}
                />

                <Stack.Screen name='TabScreen' component={TabScreen}
                    options ={ {
                        headerStyle:{backgroundColor:'#F2F2F2'},
                        headerShadowVisible:false,
                        headerTitle:''
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
