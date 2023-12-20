import React from 'react';
import { View, Text, StyleSheet,Alert, Pressable, ActivityIndicatorBase } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './homemapscreen.styles';
import { COLORS, SIZES } from '../../../constants'
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { Image } from 'react-native';
import BottomScroll from './BottomSheetScrollView';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import FirstOrderScreen from '../orderscreen/SecondOrderScreen';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AccountPage = ({navigation}) => {
  const [userInfo, setInfo] = useState([]);
  firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Customers').doc(auth().currentUser.uid).get().then((snapshot) => {
      if (snapshot.exists)
          setInfo(snapshot.data())
  })


  // Modal For Account Info
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Other Modal For Privacy Infor
  const [isOtherModalVisible, setIsOtherModalVisible] = useState(false);
  const toggleOtherModal = () => {
    setIsOtherModalVisible(!isOtherModalVisible);
  };

  
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{alignItems:'flex-start', padding: 20 }}>

      <Image
        style={{  width: 90, height: 90,}}
        source={require('../../../assets/images/user.png')}
      />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Settings</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
          onPress={toggleModal}
          
        >
          <Feather name="user" size={24} color="#606060" style={{ marginRight: 15 }} />
          <Text style={{ fontSize: 16 }}>Account</Text>
        </TouchableOpacity>
          
         {/*Start of modal*/} 
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={stylesModal.modalContainer}>
            <View style={stylesModal.modalContent}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Account Details</Text>
              <Text>Email: {userInfo.email}</Text>
              <Text>Password: {userInfo.password}</Text>
              <Text>Username: {userInfo.name}</Text>

              <Pressable style={{ marginTop: 20 }} onPress={toggleModal}>
                <Text style={{ color: 'blue' }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
          onPress={ toggleOtherModal}
        >
          <Feather name="lock" size={24} color="#606060" style={{ marginRight: 15 }} />
          <Text style={{ fontSize: 16 }}>Privacy</Text>
        </TouchableOpacity>

        {/* Start of Privacy Modal */}
        <Modal
          visible={isOtherModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleOtherModal}
        >
          <View style={stylesModal.otherModalContainer}>
            <View style={stylesModal.otherModalContent}>

              <ScrollView>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Privacy Agreements</Text>
              <Text>1. Location Access: Our app uses your location to find nearby food trucks. We don't share your exact location without permission.</Text> 
              <Text>2. Anonymous Data: We collect anonymous data to improve the app. Your individual data remains private.</Text> 
              <Text>3. Security Measures: We prioritize your data security, using industry-standard measures to protect it.</Text>
              <Text>4. Third-Party Integration: Some features may use third-party services. Check their privacy policies for details.</Text>
              <Text>5. Control: You can manage location and data preferences in the app settings.</Text>
              <Text>Your privacy matters to us. For more details, refer to our Privacy Policy.</Text>

              <Pressable style={{ marginTop: 20 }} onPress={toggleOtherModal}>
                <Text style={{ color: 'blue' }}>Close</Text>
              </Pressable>

              </ScrollView>
            </View>
            
          </View>
        </Modal>
      


        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
          onPress={() => {
            
          }}
        >
          <Feather name="bell" size={24} color="#606060" style={{ marginRight: 15 }} />
          <Text style={{ fontSize: 16 }}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
          onPress={() => {
           
          }}
        >
          <Feather name="settings" size={24} color="#606060" style={{ marginRight: 15 }} />
          <Text style={{ fontSize: 16 }}>Playback and Performance</Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
          onPress={() => {{navigation.navigate('Initial')}
            
          }}
        >
          <Feather name="log-out" size={24} color="#606060" style={{ marginRight: 15 }} />
          <Text style={{ fontSize: 16 }}>Sign Out</Text>
        </TouchableOpacity>
       
      </View>
    </ScrollView>
  );
}

const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  otherModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  otherModalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },


});



const HomeMapScreen = ({navigation}) => {

      return (
        <Tab.Navigator initialRouteName='Map' options={{flex: 1,}}>
            <Tab.Screen name='Map' component={BottomScroll} options={{headerShown: false}}/>
            <Tab.Screen name="Cart" component={FirstOrderScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={AccountPage} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

export default HomeMapScreen;