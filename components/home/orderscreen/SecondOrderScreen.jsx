import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';




const FirstOrderScreen = ({route}) => {
  

  let cartItems = [["No Items in you Cart"]]
  let val  = 0

  if (route.params !== undefined ){
    ({ cartItems } = route.params)
     val = parseFloat(route.params.total).toFixed(2); 
     
  }

  const [isOtherModalVisible, setIsOtherModalVisible] = useState(false);
  const toggleOtherModal = () => {
    setIsOtherModalVisible(!isOtherModalVisible);
  };
  const [newText, setText] = useState('');

  const [numberInput, setNumberInput] = useState('');
  const handleNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setNumberInput(formattedText);
  };

  const [numberInputOther, setNumberInputOther] = useState('');
  const handleNumberChangeOther = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setNumberInputOther(formattedText);
  };

  
  return (
    <ScrollView style={{ flex: 1 }}>
      {cartItems &&  (
      <View style={{ marginTop: 30, marginLeft: 30 }}>
        {cartItems.map((item, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontFamily: "DMMedium", fontSize: 18 }}>
              {item[0]}: ${item[1]}
            </Text>

          </View>
        ))}
        <TouchableOpacity onPress={toggleOtherModal}>
              <View style={{ width:200,flexDirection: 'row', alignItems: 'center',
                   backgroundColor: 'rgba(0,0,0,0.1)', padding: 10, 
                   borderRadius: 8, marginTop: 10, }}>
                    <Icon name="money" size={30} style={{ marginRight: 10 }} />
                    <Text style={{ fontSize: 18 }}>{val}</Text> 
              </View> 
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
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Payment options</Text>
              <Text style={{fontSize:18}}>Credit/Debit Information</Text>
              <View style={{marginBottom:10}}>
              <TextInput
                      //style= {styles.searchInput}
                      value = {numberInput}
                      onChangeText = {handleNumberChange}
                      placeholder= "Enter Credit Card Information"
                      placeholderTextColor="#888"
                      keyboardType="numeric"
                      autoCapitalize="none"
                  />  
                </View>

                <Text style={{fontSize:18}} >CVV Information</Text>
                <View style={{marginBottom:10}}>
                <TextInput
                      //style= {styles.searchInput}
                      value = {numberInputOther}
                      onChangeText = {handleNumberChangeOther}
                      placeholder= "Enter CVV"
                      placeholderTextColor="#888"
                      keyboardType="numeric"
                      autoCapitalize="none"
                  />
                </View>

                <Text style={{fontSize:18}}>Expirary Information</Text>

                <View style = {{marginBottom:20}}>
                <TextInput
                      //style= {styles.searchInput}
                      value = {newText}
                      onChangeText = {newText => setText(newText)}
                      placeholder= "Enter Expiration Date: MM/YYYY"
                      placeholderTextColor="#888"
                      autoCapitalize="none"
                  />  
                </View>

              <Pressable style={{ marginTop: 20, fontSize:16 }} onPress={toggleOtherModal}>
                <Text style={{ color: 'blue' }}>Pay</Text>
              </Pressable>



              </ScrollView>
            </View>
            
          </View>
        </Modal>
      
      </View>
          
      )
      }
    </ScrollView>
  );
};

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


export default FirstOrderScreen;