import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';

import NearstCoffees from '../NearstCoffees';
import EstablishmentsService from '../../services/Google/establishments.js';


import MapView, { Marker } from 'react-native-maps';
import Establishment from '../Establishment';

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
        try {
            const response = await EstablishmentsService.index(latitude, longitude);
            setLocations(response.data.results);
        } catch (error) {
            setLocations([]);
            console.log(error);
        }
    }

  return (
    <View style={styles.container}>
      <NearstCoffees latitude={latitude} longitude={longitude} />
      
      <Establishment establishment={selected} />

      <MapView
        style={styles.map}
        region={
          {
            latitude: (latitude != 0) ? latitude : 0,
            longitude: (longitude != 0) ? longitude : 0,
            latitudeDelta: 0.035,
            longitudeDelta: 0.0121,
          }
        }>
          
            {
                locations.map(item => {
                    return (
                      <Marker key={item.place_id}
                        coordinate={
                            {
                                latitude: item.geometry.location.lat, 
                                longitude: item.geometry.location.lng
                            }
                        }
                        title={item.name}
                        onPress={() => setSelected(item)}
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