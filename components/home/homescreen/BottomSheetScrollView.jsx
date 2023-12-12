import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapScreen from "./MapScreen";
import firestore from '@react-native-firebase/firestore';

const BottomScroll = () => {
  // hooks
  const sheetRef = useRef(null);
  const [vendorInfo, setVendorInfo] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menu, setMenu] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      const vendorDoc = await firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').get();
      const list = [];
      vendorDoc.forEach((doc) => {
        list.push(doc.data());
      });
      if (vendorDoc.exists) {
        const menu_list = vendorDoc.data().menu;
        if (menu_list) {
            const list = [];
            Object.keys(menu_list).forEach((key) => {
                list.push(menu_list[key]);
            });
            console.log(list);
            setMenu(list);
        }
    } else {
        console.log('User document does not exist.');
    }
      setVendorInfo(list);
    }
    fetchData();
  }, []);
  
  const snapPoints = useMemo(() => ["15%", "50%", "90%"], []);

  const handleItemPress = useCallback((item) => {
    setSelectedItem(item);
    sheetRef.current?.snapToIndex(2);
  }, []);

  const handleDetailClose = useCallback(() => {
    setSelectedItem(null);
    sheetRef.current?.snapToIndex(1);
  }, []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  // render
  const renderItem = useCallback(
    (item, index) => (
      <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => handleItemPress(item)}>
        <Image source={require('./foodtruck.jpeg')} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text style={styles.descriptionText}>description</Text>
        <Text style={styles.moreInfoText}>moreInfo</Text>
    </View>
      </TouchableOpacity>
    ),
    [handleItemPress]
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
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Nearest Treats</Text>
          {vendorInfo.map((item, index) => renderItem(item, index))}
        </BottomSheetScrollView>
      </BottomSheet>
      {selectedItem && (
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{selectedItem.name}</Text>
          <Text style={styles.title}>{menu.item_name}</Text>
          <TouchableOpacity onPress={handleDetailClose}>
            <Text style={styles.backButton}>Back to List</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: "white",
  },
  title: {
      padding: 6,
      fontSize: 24,
      fontWeight: 'medium',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 6,
    backgroundColor: "#eee",
    borderRadius: 10
  },
  textContainer: {
    flex: 1,
  },titleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  descriptionText: {
    fontSize: 12,
  },
  moreInfoText: {
    fontSize: 10,
  },
  detailContainer: {
    position: 'absolute',
    height: '90%',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});

export default BottomScroll;

