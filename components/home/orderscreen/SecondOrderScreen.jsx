import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const FirstOrderScreen = ({route}) => {
  

  let cartItems = "No Items"

  if (route.params !== undefined ){
    ({ cartItems } = route.params)
  }
      return (
          <ScrollView style={{flex:1,}}>
              {cartItems && (
            <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontFamily:"DMMedium", fontSize:20}}>{cartItems}</Text>
        </View>
      )}
          </ScrollView>
      );
  }

export default FirstOrderScreen;