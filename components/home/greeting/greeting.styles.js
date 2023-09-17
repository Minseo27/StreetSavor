import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
 
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: 50,
    color: COLORS.primary,
    marginTop: 5,
    textAlign:"center"
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 600,
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


  // Button IOS
    button: {
      backgroundColor: '#007AFF', // Button background color switch
      borderRadius: 20, // Button border radius
      paddingVertical: 12, // Vertical padding
      paddingHorizontal: 40, // Horizontal padding
      borderWidth: 1, // Button border width
      borderColor: 'white', // Button border color (iOS blue) Switch
      width:300
    },
    text: {
      fontSize: 16, // Button text size
      color: '#007AFF', // Button text color (iOS blue)
      textAlign: 'center', // Text alignment
    },
    
    // changing margin from the top of whatver is above
    buttonContainer:{
        marginTop:200
    },
    buttonText:{
        fontSize:16,
        color:'white',
        textAlign:'center'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
      },
      welcomemessage: {
        fontSize: 70,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 180
      }    


});

export default styles;
