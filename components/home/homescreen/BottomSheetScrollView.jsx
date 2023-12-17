import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapScreen from "./MapScreen";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";
import styles from './BottomSheetScrollView.styles'; 

const BottomScroll = ({navigation}) => {
  // hooks
  const sheetRef = useRef(null);
  const [vendorInfo, setVendorInfo] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [list_of_items, setItems] = useState([]);
  const [list_of_items2, setItems2] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const vendorDoc = await firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').get();
      const list = [];
      vendorDoc.forEach((doc) => {
        list.push(doc.data());
      });
      setVendorInfo(list);
    }
    fetchData();
  }, []);
  
  const snapPoints = useMemo(() => ["15%", "50%", "90%"], []);

  const handleItemPress = useCallback((item) => { 
    if ((item.menu)) {
      const list = [];
      Object.keys((item.menu)).forEach((key) => { 
        list.push(item.menu[key]); });
        var items = list.map(food =>
          <View style={styles.foodItemContainer}>
            <Text style={styles.menuItems}>{food.item_name}</Text>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Image source={require('./img.png')} style={styles.foodImage} />
            </View>
          </View>
        );
        setItems(items);
    }  
    setSelectedItem(item);
    sheetRef.current?.snapToIndex(2);
  }, []);

  const [cartItems, setCartItems] = useState([]); 
  const addToCart = (foodItem) => {
    let cartData = []

    //cartData.push(foodItem)
    setCartItems([...cartItems, foodItem]);
    //setCartItems(cartData)

  };
    //

    //console.warn(`${foodItem}`)

    //
    //console.log(`Added to cart: ${foodItem.item_name}`);

    //console.warn(`${JSON.stringify(foodItem)}`);
  

  //console.warn(`${JSON.stringify(cartItems)}`);


  const handleItemPress2 = useCallback((item) => {
    if (item.menu) {
      const list = [];
      Object.keys(item.menu).forEach((key) => {
        list.push(item.menu[key]);
      });

  
      const items = list.map(food => (
        <TouchableOpacity
          key={food.id} 
          onPress={() => addToCart({ item_name: food.item_name, price: food.price })}
        >
          <View style={styles.itemContainer}>
            <Image source={require('./foodicon.png')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{food.item_name}</Text>
              <Text style={styles.descriptionText}>{food.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
  

      setItems2(items);
    }
    setSelectedItem(item);
  },);


  const handleDetailClose = useCallback(() => {
    setSelectedItem(null);
    sheetRef.current?.snapToIndex(1);
  }, []);

  const handlePress = (item) => {
    handleItemPress(item);
    handleItemPress2(item);
  }

  // Passing Paramates such as list of buttons and cart items to vendor screen cartItems
  const handleNavigation = () => {

    navigation.navigate('VendorDetailScreen', { selectedItem, list_of_items2,  });
  };

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  // render
  const renderItem = useCallback(
    (item, index) => (
      <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => handlePress(item)}>
        <Image source={require('./foodtruck.jpeg')} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text style={styles.descriptionText}>{item.Description}</Text>
        <Text style={styles.moreInfoText}>More Info</Text>
    </View>
      </TouchableOpacity>
    ),
    [handlePress]
  );
  return (
    <View style={styles.container}>
      <MapScreen />
    
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <Text style={styles.title}>Nearest Treats</Text>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {vendorInfo.map((item, index) => renderItem(item, index))}
        </BottomSheetScrollView>
      </BottomSheet>
      {selectedItem && (
        <View style={styles.detailContainer}>
          <View style={styles.detailTopContainer}>
          <Text style={styles.vendorName}>{selectedItem.name}</Text>
          <TouchableOpacity onPress={handleDetailClose}>
            <Text style={styles.backButton}>Back to List</Text>
          </TouchableOpacity>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc',width: '100%'}} />
          <Text style={{marginTop: 15, fontSize:20, fontFamily: "DMMedium"}}>Featured Menu</Text>
          <TouchableOpacity
            onPress={handleNavigation} style={styles.orderButtonContainer}>
            <Text style={styles.orderButton}>Order</Text>

          </TouchableOpacity>
          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
          {list_of_items}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default BottomScroll;
