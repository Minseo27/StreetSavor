import { View, Text, ScrollView, Button,SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import styles from './loginView.styles';
import auth, { firebase } from '@react-native-firebase/auth';

const LoginView = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    firebase.initializeApp({apiKey: 'AIzaSyA8bOJCQ0_GyG29q19TcasS4nWE5_r_74Q', databaseURL: 'https://streetsavor-c90a7.firebaseio.com',projectId: 'streetsavor-c90a7'});
    handleLogin = () => {
        auth()
     .signInWithEmailAndPassword(email, password)
     .then(() => navigation.navigate('HomeMapScreen', {name:'HomeMapScreen'}))
     .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
    }

    return (

        <View style = {styles.container}> 

            <Text style={styles.name}>
                Street{'\n'} Savor 
            </Text>
        <View>    
            <TextInput
                style={[styles.input, {marginTop:30}]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                autoCapitalize="none"/>
            <TextInput
                style={[styles.input, {marginTop:10}]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                autoCapitalize="none"
                secureTextEntry/>

            <TouchableOpacity style={[styles.button, {marginTop:20}]}
                onPress={handleLogin}>
                <Text style= {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
            <View style={[styles.textContainer, {marginTop:20}]}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity
                onPress = { () => navigation.navigate('SignupView', {name:'SignupView'}) }>
                <Text style= {styles.text2}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    )
} 




export default LoginView;
