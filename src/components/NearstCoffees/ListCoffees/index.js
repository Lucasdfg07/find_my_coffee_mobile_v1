import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import ListEstablishmentsService from '../../../services/store.js';

import StarRating from 'react-native-star-rating';

const Separator = () => (
    <View style={styles.separator} />
);

const ListCoffees = (props) => {
    const [stores, setStores] = useState([]);
    
    useEffect(() => {
        loadNearstStores();
    }, []);

    async function loadNearstStores() {
        try {
            const response = await ListEstablishmentsService.index(props.latitude, props.longitude);
            setStores(response.data);
        } catch (error) {
            setStores([]);
            console.log(error);
        }
    }

    return(
        <ScrollView style={styles.container}>
            {
                stores.map((store, index) => {
                    return (
                        <View style={{flex: 1}} key={index}>
                            <Text style={styles.store_name}>{store.name}</Text>

                            <Text style={styles.store_address}>
                                {store.address}
                            </Text>

                            <View style={{flexDirection: 'row'}}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={store.ratings_count}
                                    fullStarColor="yellow"
                                    starSize={15} 
                                />

                                <Text style={{color: 'white', marginLeft: 10, fontSize: 10}}>
                                    { store.ratings_count } Opiniões
                                </Text>
                            </View>

                            <Separator />
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
    },  
    store_name: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 10,
    },
    store_address: {
        color: 'white',
        fontSize: 9,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default ListCoffees;