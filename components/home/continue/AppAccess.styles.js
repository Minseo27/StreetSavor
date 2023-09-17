import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: 'black',
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },


  // Button 
   // Button IOS
   button: {
    //backgroundColor: '#007AFF', // Button background color switch
    backgroundColor:'#4B95E7',
    borderRadius: 10, // Button border radius
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 40, // Horizontal padding
    borderWidth: 1, // Button border width
    borderColor: 'white', // Button border color (iOS blue) Switch
    width:415,
    // Width:200
    //justifyContent:'center'
    alignSelf:'center'
  },
  text: {
    fontSize: 40, // Button text size
    color: '#007AFF', // Button text color (iOS blue)
    textAlign: 'center', // Text alignment
  },
  
  // changing margin from the top of whatver is above
  buttonContainer:{
      marginTop:300,
      flexDirection:'column'
  },

  buttonContainerRight:{
    flexDirection:'column',
    marginTop:2,
    //flexDirection: 'row'
},

  buttonText:{
      fontSize:20,
      color:'white',
      textAlign:'center'

  },

  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomemessage: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 250
    },
});

export default styles;
