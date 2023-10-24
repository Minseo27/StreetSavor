import { View, Text, ScrollView, Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'; // Import Alert
import React, { useState } from 'react';
import styles from './loginView.styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const VendorLoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert('Missing Fields', 'Please enter both email and password.');
        return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDoc = await firestore()
        .collection('Users')
        .doc('dFqhRhGV5BSuqWYys6bP')
        .collection('Vendors')
        .doc(user.uid)
        .get();

      if (userDoc.exists) {
        navigation.navigate('HomeMapScreen', { name: 'HomeMapScreen' });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
        Alert.alert('Invalid Email', 'The email address you entered is not valid. Please try again.');
      } else if (error.code === 'auth/internal-error') {
        setError('Incorrect password. Please try again.');
        Alert.alert('Password Incorrect', 'The password you entered is incorrect. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Street{'\n'} Savor</Text>
      <View>
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry
        />

        <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={[styles.textContainer, { marginTop: 20 }]}>
          <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('VendorSignupView', { name: 'VendorSignupView' })}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VendorLoginView;
