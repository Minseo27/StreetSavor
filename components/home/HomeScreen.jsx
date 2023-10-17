import { useState } from 'react';
import { View, Text, ScrollView, Button,SafeAreaView, StyleSheet, Alert, Pressable, TouchableOpacity } from 'react-native';
import { useRouter , Stack} from 'expo-router';

import { COLORS, SIZES, } from '../constants';
import  GreetingPage  from '../components/home/greeting/GreetingPage.jsx'



//Navigation Screen
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StackNavigator from 'react-navigation'



const Home = ({}) => {
//function HomeScreen( {navigation}){

    const [orientation, setOrientation] = useState(1);
    useEffect(() => {
      lockOrientation();
    }, []);
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    const o = await ScreenOrientation.getOrientationAsync();
      setOrientation(o);
    };

    const router = useRouter()
    return (

      
        <SafeAreaView style= { {flex:1 , backgroundColor : COLORS.lightWhite }}>
            <Stack.Screen
              options = { {
              headerStyle: {backgroundColor: COLORS.lightWhite},
              // Removing the Shadow
              headerShadowVisible: false,
              headerShown:false,
                headerTitle:""
              }}
              /> 

                <ScrollView showsVerticalScrollIndicator={false}>
        
                    <View
                        
                        style = { {
                            flex:1, 
                            padding:SIZES.medium
                        }}>
                    <GreetingPage/> 
                                     
                    </View>


                </ScrollView>

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




export default Home;