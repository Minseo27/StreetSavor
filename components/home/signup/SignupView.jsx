import { View, Text, ScrollView, Button,SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import styles from './signupView.styles';
import auth from '@react-native-firebase/auth';

const SignupView = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    handleSignUp = () => {
        auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

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
                value={username} onChangeText={setUsername} placeholder="Enter username"
                autoCapitalize="none"/>
            <TextInput
                style={[styles.input, {marginTop:10}]}
                value={email} onChangeText={setEmail} placeholder="Enter email"
                autoCapitalize="none"/>
            <TextInput
                style={[styles.input, {marginTop:10}]}
                value={password} onChangeText={setPassword} placeholder="Enter password"
                autoCapitalize="none"/>

            <TouchableOpacity style={[styles.button, {marginTop:20}]}
                onPress = {handleSignUp}>
                <Text style= {styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
 
        </View>
        </View>
    )
} 




export default SignupView;