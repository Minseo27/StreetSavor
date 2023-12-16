import React from 'react';
import { View, Text, StyleSheet,Alert, Pressable, ActivityIndicatorBase } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './homemapscreen.styles';
import { COLORS, SIZES } from '../../../constants'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { Image } from 'react-native';
import BottomScroll from './BottomSheetScrollView';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import SecondOrderScreen from '../orderscreen/SecondOrderScreen';
import { Feather } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const FirstOrderScreen = ({navigation}) => {
    var list_of_vendors = vendor_list.map(truck => <Pressable style={{height: 150,backgroundColor: '#efcb4e', marginTop: SIZES.small, marginBottom: SIZES.small, alignItems: 'center', borderRadius: 50, padding: 35, margin: 20}} onPress={ () => navigation.navigate('SecondOrderScreen',{name: 'SecondOrderScreen'})}>
        <Image source={require('./truckicon.png')} style={{height: 32, width:32 }} />
        <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic'}}>
            {truck.name}
        </Text>
        <Text style={{fontSize: SIZES.small, fontWeight: 'bold', fontStyle: 'italic'}}>
            Email: {truck.contact[0]}
        </Text>
        <Text style={{fontSize: SIZES.small, fontWeight: 'bold', fontStyle: 'italic'}}>
            Phone: {truck.contact[0]}
        </Text>
    </Pressable>);
    return (
        <ScrollView style={{flex:1,}}>
            {list_of_vendors}
            {/* <View style={{flex:1,justifyContent:'center',}}>
                <Text style={{textAlign:'center'}}>This will be the first order screen</Text>
            </View> */}
        </ScrollView>
    );
}

const AccountPage = ({navigation}) => {
  const [userInfo, setInfo] = useState([]);
  firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Customers').doc(auth().currentUser.uid).get().then((snapshot) => {
      if (snapshot.exists)
          setInfo(snapshot.data())
  })

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ padding: 20 }}>

      <Image
        style={{ alignSelf: 'left', width: 90, height: 90,}}
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

              <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleModal}>
                <Text style={{ color: 'blue' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
       


        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
          onPress={() => {
            
          }}
        >
          <Feather name="lock" size={24} color="#606060" style={{ marginRight: 15 }} />
          <Text style={{ fontSize: 16 }}>Privacy</Text>
        </TouchableOpacity>
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