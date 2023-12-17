import React from "react";
import { View, Text, TouchableOpacity, StyleSheet , Image, Pressable} from 'react-native';
import styles from './BottomSheetScrollView.styles'; 
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const VendorDetailScreen = ({ route }) => {
    const { selectedItem } = route.params;
    const { list_of_items2 } = route.params;
    const { cart_items } = route.params;

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('HomeMapScreen', { name: 'HomeMapScreen' });
      };

    return (
    <View style={flex=1}>

            <View 
              style={{justifyContent:"center", right:10, flexDirection: "row",
                    marginTop:0,
                    height: 50,
                    zIndex:1,
                    position:'absolute'}}>

              <TouchableOpacity onPress={() => console.warn(`${JSON.stringify(cart_items)}`)}>
                  <Image 
                  source={require('./shopping-cart.png')} 
                  style ={ {width: 50, height: 50, }}/>

              </TouchableOpacity>
                
              </View>

        {selectedItem && (
            <View style={padding=16}>
                <ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={handleBackPress}>
                <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
          <Text style={styles.vendorName2}>{selectedItem.name}</Text>
          <Text style={{padding: 16,marginTop: 6, fontSize:20, fontFamily: "DMMedium"}}>Full Menu</Text>
          {/* {list_of_items2.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemTouchable} 
                onPress={() => console.warn(item.id.item_name)}
              >
        
                <View style={styles.itemContainer}>
                <Image source={require('./foodicon.png')} style={styles.image} />
                <Text style={styles.titleText}>{item.item_name}</Text>
                <Text style={styles.descriptionText}>{item.price}</Text>
                
                </View>
              </TouchableOpacity>
              
            ))} */}
            {list_of_items2}
            
          </ScrollView>
        </View>
      )}
    </View>
  );
};


export default VendorDetailScreen;