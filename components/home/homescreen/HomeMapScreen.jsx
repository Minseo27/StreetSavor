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
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import BottomScroll from './BottomSheetScrollView';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import SecondOrderScreen from '../orderscreen/SecondOrderScreen';

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
  return (
      <ScrollView style={{flex:1,}}>
          <View style={{flex:1, justifyContent:'center'}}>
              <Image style={{alignSelf: 'center', width: 256, height: 256, marginTop: SIZES.large}} source={require('../../../assets/images/username.png')}/>
              <Image style={{alignSelf: 'center', width: 32, height: 32, marginTop: SIZES.large}} source={require('../../../assets/images/email.png')}/>
                <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic', justifyContent: 'center', textAlign: 'center'}}>
                    Email{"\n"}
                </Text>
                <Pressable style={{height: 96,backgroundColor: '#efcb4e', marginTop: SIZES.xSmall, marginBottom: SIZES.small, alignItems: 'center', borderRadius: 50, padding: 35, margin: 20}}>
                  <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic'}}>
                   {userInfo.email}{"\n"}
                  </Text>
                </Pressable>
                <Image style={{alignSelf: 'center', width: 32, height: 32, marginTop: SIZES.large}} source={require('../../../assets/images/username.png')}/>
                <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic', justifyContent: 'center', textAlign: 'center'}}>
                    Username{"\n"}
                </Text>
                <Pressable style={{height: 96,backgroundColor: '#efcb4e', marginTop: SIZES.small, marginBottom: SIZES.small, alignItems: 'center', borderRadius: 50, padding: 35, margin: 20}}>
                  <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic'}}>
                    {userInfo.name}{"\n"}
                  </Text>
                </Pressable>
                <Image style={{alignSelf: 'center', width: 32, height: 32, marginTop: SIZES.large}} source={require('../../../assets/images/password.png')}/>
                <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic', justifyContent: 'center', textAlign: 'center'}}>
                    Password{"\n"}
                </Text>
                <Pressable style={{height: 96,backgroundColor: '#efcb4e', marginTop: SIZES.small, marginBottom: SIZES.xLarge, alignItems: 'center', borderRadius: 50, padding: 35, margin: 20}}>
                  <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic'}}>
                    {userInfo.password}{"\n"}
                  </Text>
                </Pressable>
                <Pressable style={{height: 96,backgroundColor: '#efcb4e', marginTop: SIZES.large, marginBottom: SIZES.small, alignItems: 'center', borderRadius: 50, padding: 35, margin: 64}} onPress={() => navigation.navigate('CustomerLoginView',{name: 'CustomerLoginView'})}>
                  <Text style={{fontSize: SIZES.large, fontWeight: 'bold', fontStyle: 'italic'}}>
                    Sign Out
                  </Text>
                </Pressable>
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
