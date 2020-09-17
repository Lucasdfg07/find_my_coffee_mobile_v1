import React from 'react';
import { View } from 'react-native';
import GoogleMaps from '../../components/GoogleMaps';

const HomePage = () => {
    return (
        <View style={{flex:1}}>
            <GoogleMaps />
        </View>
    )
}

export default HomePage;