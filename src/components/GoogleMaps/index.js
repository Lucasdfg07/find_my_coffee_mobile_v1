import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
    });

    return (
        <View style={{flex:1}}>
            <MapView
                provider={PROVIDER_GOOGLE}
                loadingEnabled={true}
                style={styles.container}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.025,
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