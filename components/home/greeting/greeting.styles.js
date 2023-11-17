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
      backgroundColor: 'black', // Button background color switch
      borderRadius: 10, // Button border radius
      paddingVertical: 15, // Vertical padding
      paddingHorizontal: 40, // Horizontal padding
      borderWidth: 1, // Button border width
      borderColor: 'white', // Button border color (iOS blue) Switch
      width:250,
      height: 65,
      justifyContent: 'center'
    },
    text: {
      fontSize: 20, // Button text size
      color: '#007AFF', // Button text color (iOS blue)
      textAlign: 'center', // Text alignment
      fontFamily: FONT.bold
    },
    
    // changing margin from the top of whatver is above
    buttonContainer:{
        marginTop:100
    },
    buttonText:{
        fontSize:20,
        color:'white',
        textAlign:'center',
        fontFamily: FONT.bold
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#efcb4e',
        width: '100%',
      },
      welcomemessage: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 130,
        fontStyle: 'italic'
      }    


});

export default styles;
