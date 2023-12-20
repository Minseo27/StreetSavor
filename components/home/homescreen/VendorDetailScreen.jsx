import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet , Image} from 'react-native';
import styles from './BottomSheetScrollView.styles'; 
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const VendorDetailScreen = ({ route }) => {
    const { selectedItem } = route.params;
    const { list_of_items2 } = route.params;

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('HomeMapScreen', { name: 'HomeMapScreen' });
      };

      const handleCart = () => {
  
        
        let total = 0;
        cartItems.forEach(item => {
          const price = parseFloat(item[1]); // Extract the price from the sub-array and convert it to a number
          total += price; // Add the price to the total
        });
        
  
        //console.warn(total)
        //console.warn(`${JSON.stringify(cartItems)}`);
        navigation.navigate('FirstOrderScreen', { cartItems, total });
      };

  

      //[["Steak", "9.99"],["Beef", "10.99]"]]

  const [cartItems, setCartItems] = useState([]); 

  const addToCart = (foodItem) => {
    let cartData = []

    //cartData.push(foodItem);
    setCartItems([...cartItems, foodItem]);
    
  };
    return (
    <View style={flex=1}>


        {selectedItem && (
            <View style={padding=16}>
                <ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={handleBackPress}>
                <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
          <Text style={styles.vendorName2}>{selectedItem.name}</Text>
          <Text style={{padding: 16,marginTop: 6, fontSize:20, fontFamily: "DMMedium"}}>Full Menu</Text>
          { list_of_items2.map(item => (
                <TouchableOpacity style={styles.itemContainer} onPress={() => addToCart( [item.item_name+" ", item.price])}>
                <Image source={require('./foodicon.png')} style={styles.image} />
                <Text style={styles.titleText}>{item.item_name}</Text>
                <Text style={styles.descriptionText}>  {item.price}</Text>
                
                </TouchableOpacity>
            )) }
            
          </ScrollView>
        </View>
      )}
      <View 
              style={{justifyContent:"center", right:10, flexDirection: "row",
                    marginTop:0,
                    height: 50,
                    zIndex:1,
                    position:'absolute'}}>
              <TouchableOpacity onPress={handleCart}>
                  <Image 
                  source={require('./shopping-cart.png')} 
                  style ={ {width: 50, height: 50, }}/>
              </TouchableOpacity>
                
              </View>
    </View>
  );
};


export default VendorDetailScreen;