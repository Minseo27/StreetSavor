import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable, ActivityIndicatorBase } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './homemapscreen.styles';
import { COLORS, SIZES } from '../../../constants'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Vendor,vendor_list,VendorItem} from '../../../database_vars/vars';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import BottomScroll from './BottomSheetScrollView';

const Tab = createBottomTabNavigator();

const FirstOrderScreen = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
      const fetchVendors = async () => {
          try {
              const infoCollectionPath = firestore()
                  .collection('Users')
                  .doc('dFqhRhGV5BSuqWYys6bP')
                  .collection('Vendors')
                  .doc('zNpo2OBPsA73QZJFM5ub')
                  .collection('info');

              const querySnapshot = await infoCollectionPath.get();
              const fetchedVendors = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
              }));

              setVendors(fetchedVendors);
          } catch (error) {
              console.error("Error fetching vendors: ", error);
          }
      };

      fetchVendors();
  }, []);

  return (
      <ScrollView style={{ flex: 1 }}>
          {vendors.map(vendor => (
              <Pressable
                  key={vendor.id}
                  style={{ height: 100, backgroundColor: COLORS.lightWhite, marginBottom: SIZES.small, alignItems: 'baseline' }}
                  onPress={() => navigation.navigate('SecondOrderScreen', { name: 'SecondOrderScreen' })}
              >
                  <Text style={{ textAlign: 'left', fontSize: SIZES.large, marginLeft: SIZES.small, marginTop: SIZES.xSmall }}>
                      Email: {vendor.email}
                  </Text>
                  
              </Pressable>
          ))}
      </ScrollView>
  );
}

function AccountPage () {
  const [userInfo, setInfo] = useState([]);
  firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Customers').doc(auth().currentUser.uid).get().then((snapshot) => {
      if (snapshot.exists)
          setInfo(snapshot.data())
  })
  return (
      <ScrollView style={{flex:1,}}>
          <View style={{flex:1, justifyContent:'center'}}>
              <Image style={{alignSelf: 'center', width: 259, height: 259, marginTop: SIZES.large}} source={require('../../../assets/images/avatar.jpg')}/>
              <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                  Email: {userInfo.email}{"\n"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center',alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                  Username: {userInfo.name}{"\n"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: SIZES.medium, backgroundColor: COLORS.lightWhite, justifyContent: 'center',alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: SIZES.large, fontStyle: 'italic', fontWeight: 'bold'}}>
                  Password: {userInfo.password}{"\n"}
                </Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
  );
}

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
