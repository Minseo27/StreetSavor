import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './signupView.styles';
import Geolocation from '@react-native-community/geolocation';

const CustomerSignupView = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [lat,setLatitude] = useState(null);
  const [long,setLongitude] = useState(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    })
  };

  getLocation();

  const handleSignUp = async () => {
    try {
      const userExists = await auth().fetchSignInMethodsForEmail(email);

      if (userExists && userExists.length > 0) {
        setError('Email address is already in use. Please use a different email.');
      } else {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        const userData = {
          name: username,
          email: email,
          password: password,
          location: {
            latitude: lat,
            logntitude: long,
          },
        };

        const docRef = firestore()
          .collection('Users')
          .doc('dFqhRhGV5BSuqWYys6bP')
          .collection('Customers')
          .doc(user.uid);

        await docRef.set(userData);

        console.log('User account created & signed in!');
        console.log('User data stored in Firestore.');

        Alert.alert(
          'Success',
          'You have successfully created an account.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('CustomerLoginView');
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      setError(error.message);

      Alert.alert(
        'Error',
        error.message,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Street{'\n'} Savor</Text>
      <View>
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          autoCapitalize="none"
        />

        <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerSignupView;
