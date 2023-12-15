import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BottomSheetScrollView.styles'; 
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const VendorDetailScreen = ({ route }) => {
    const { selectedItem } = route.params;
    const { list_of_items2 } = route.params;
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('HomeMapScreen', { name: 'HomeMapScreen' });
      };

    return (
    <View style={flex=1}>
        {selectedItem && (
            <View style={padding=16}>
                <ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={handleBackPress}>
                <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
          <Text style={styles.vendorName2}>{selectedItem.name}</Text>
          <Text style={{padding: 16,marginTop: 6, fontSize:20, fontFamily: "DMMedium"}}>Full Menu</Text>
          {list_of_items2}
          </ScrollView>
          </View>
      )}
    </View>
    );
};

export default VendorDetailScreen;