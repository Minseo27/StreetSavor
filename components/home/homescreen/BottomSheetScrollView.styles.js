import { StyleSheet } from "react-native";

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
    menuItems: {
      fontSize: 20,
      fontFamily: "DMMedium",
      marginLeft: 5,
      color: "#fff"
    },
    detailTopContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    backButton: {
      fontSize: 16,
      color: '#0F52BA',
      marginTop: 10,
    },
    orderButton: {
        fontSize: 20,
        fontFamily: "DMBold",
        marginTop: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    orderButtonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    vendorName: {
      fontSize: 30,
      fontFamily: "DMBold"
    },
    scrollViewContent: {
      marginBottom: 20,
      flexDirection: 'row',
      borderRadius: 20,
      backgroundColor: "#eee",
    },
    foodItemContainer: {
      marginTop: 10,
      marginLeft:10,
      marginRight:10,
      padding:6,
      width: 180,
      height: 180,
      borderRadius: 20,
      backgroundColor: "#a6a6a6",
    },
    foodImage: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
    },
    vendorName2: {
        fontSize: 30,
        fontFamily: "DMBold",
        marginLeft: 16,
        marginTop:10
    },
    menuItems2: {
        fontSize: 20,
        fontFamily: "DMMedium",
        marginLeft: 5,
    },
    closeButton: {
        top: 10,
        left: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    closeButtonText: {
        marginLeft:8,
        marginTop: 3.5,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
  });
  export default styles;