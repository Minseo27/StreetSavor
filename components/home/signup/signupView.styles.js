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

  // Button 
   // Button IOS
   button: {
    //backgroundColor: '#007AFF', // Button background color switch
    backgroundColor:'black',
    borderRadius: 10, // Button border radius
    paddingVertical: 15, // Vertical padding
    paddingHorizontal: 40, // Horizontal padding
    borderWidth: 1, // Button border width
    borderColor: 'white', // Button border color (iOS blue) Switch
    width:300,
    alignSelf:'center'
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
      backgroundColor: '#efcb4e'
    },
    name: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      fontStyle: 'italic'
    },
    input: {
        height: 40,
        borderColor: '#e0b10d',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        width: 300
      },
      loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      text: {
        fontSize: 15,
      },
      text2: {
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: 'bold'
      },
});

export default styles;
