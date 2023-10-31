import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapScreen from "./MapScreen";

const BottomScroll= () => {
  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["15%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Image source={item.imageSource} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style={styles.titleText}>title</Text>
        <Text style={styles.descriptionText}>description</Text>
        <Text style={styles.moreInfoText}>moreInfo</Text>
    </View>
      </View>
    ),
    []
  );
  return (
    <View style={styles.container}>
        <MapScreen/>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Nearest Treats</Text>
          {data.map(renderItem)}
          
        </BottomSheetScrollView>
      </BottomSheet>

    </View>
  );
};

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
    fontSize: 14,
  },
  moreInfoText: {
    fontSize: 12,
  },
});

export default BottomScroll;