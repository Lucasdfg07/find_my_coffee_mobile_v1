import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import NearstCoffees from '../NearstCoffees';
import EstablishmentsService from '../../services/Google/establishments.js';


import MapView, {Marker} from 'react-native-maps';

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [locations, setLocations] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        setCurrentLocation();
        loadCoffeShops();
    }, []);

    async function setCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    // Load all coffee shops
    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }

  return (
    <View style={styles.container}>
      <NearstCoffees latitude={latitude} longitude={longitude} />

      <MapView
        style={styles.map}
        region={
          {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.035,
            longitudeDelta: 0.0121,
          }
        }>
          
            {
                locations.map(item => {
                    return (
                        <Marker key={item.name} 
                            coordinate={
                                {
                                    latitude: item.geometry.location.lat, 
                                    longitude: item.geometry.location.lng
                                }
                            }
                            title={item.name}
                            onClick={() => setSelected(item)}
                        />
                    )
                })
            }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 5,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export default GoogleMaps;