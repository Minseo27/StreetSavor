import { View, Text, ScrollView, Button,SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import styles from './loginView.styles';

const LoginView = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}/>
            <TextInput
                style={[styles.input, {marginTop:10}]}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}/>

            <TouchableOpacity style={[styles.button, {marginTop:20}]}
                onPress = { () => {
                    navigation.navigate('LoginView', {name:'LoginView'})
                } }>
                <Text style= {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
            <View style={[styles.textContainer, {marginTop:20}]}>
            <Text style={styles.text}>Don't have an account? </Text>
            <Text style={styles.text2}> Sign Up</Text>
            </View>
        </View>
        </View>
    )
} 




export default LoginView;
