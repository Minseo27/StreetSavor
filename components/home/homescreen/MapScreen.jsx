import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import styles from './homemapscreen.styles';
import MapView, { Marker } from 'react-native-maps';

function MapScreen() {
    return (
        <View style = {{flex:1,}}>
            <MapView
            //Hunter College Coordinates
                style={{ flex: 1 }}
                initialRegion={{
                latitude:  40.7861,
                longitude: -73.9543,
                latitudeDelta: 0.03,
                longitudeDelta: 0.02,
                }}
            >
            <Marker
                coordinate={{
                latitude: 40.7861, 
                longitude: -73.9543, 
                }}
                title="Initial Location"
                description="This is the initial location"
            />

            </MapView>
            
            <View style = {styles.searchContainer}>
                <View style = {styles.searchWrapper}>
                    <TextInput
                    style= {styles.searchInput}
                    value = ""
                    onChange = { () => {  } }
                    placeholder= "What are you looking for?"
                    placeholderTextColor="#888"
                />  
                </View>
            
            </View>
        </View>
        
    );


}

export default MapScreen;