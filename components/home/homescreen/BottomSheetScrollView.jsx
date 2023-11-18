import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapScreen from "./MapScreen";
import firestore from '@react-native-firebase/firestore';
import BottomSheet from 'react-native-simple-bottom-sheet'
import { ScrollView } from "react-native-gesture-handler";

const BottomScroll = () => {
  MapScreen();
  // hooks
  const sheetRef = useRef(null);
  const [vendorInfo, setVendorInfo] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const vendorDoc = await firestore().collection('Users').doc('dFqhRhGV5BSuqWYys6bP').collection('Vendors').doc('zNpo2OBPsA73QZJFM5ub').collection('info').get();
      const list = [];
      vendorDoc.forEach((doc) => {
        list.push(doc.data());
      });
      setVendorInfo(list);
    };
    fetchData();
  }, []);
  
  const snapPoints = useMemo(() => ["15%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  // render
  const renderItem = useCallback(
    (item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Image source={require('./foodtruck.jpeg')} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text style={styles.descriptionText}>description</Text>
        <Text style={styles.moreInfoText}>moreInfo</Text>
    </View>
      </View>
    ),
    []
  );
  return (
    <View style={styles.container}>
      <MapScreen />
      <BottomSheet isOpen sliderMaxHeight={100}>
        {(onScrollBeginDrag) => (
          <ScrollView onScrollBeginDrag={onScrollBeginDrag} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Nearest Treats</Text>
            {vendorInfo.map((item, index) => renderItem(item, index))}         
          </ScrollView>
        )}
      </BottomSheet>

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
});

export default BottomScroll;

