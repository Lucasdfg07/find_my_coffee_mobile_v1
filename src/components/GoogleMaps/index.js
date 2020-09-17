import React from 'react';
import { View, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMaps = () => {
    return (
        <View style={{flex:1}}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.container}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0
    }
});

export default GoogleMaps;