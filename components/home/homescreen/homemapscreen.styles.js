//Style Elements for Home Screen

import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
 
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: SIZES.medium,
    height: 50,
    zIndex:1,
    position:'absolute',   
  },
  searchWrapper: {
    //position:'absolute',

    borderColor:'black',
    width:'89%',
    backgroundColor:'white',
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    zIndex: 1,
    opacity:0.8,
    borderColor:'black',
    borderWidth:2
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: 30,
    paddingHorizontal: SIZES.medium,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
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
  container: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#efcb4e',
    width:'100%'

  },
});

export default styles;
