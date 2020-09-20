import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import ListEstablishmentsService from '../../../services/Local/store.js';

import StarYellow from '../../../assets/star_yellow.png';
import StarGray from '../../../assets/star.png';

const Separator = () => (
    <View style={styles.separator} />
);

const ListCoffees = (props) => {
    const [stores, setStores] = useState([]);
    
    useEffect(() => {
        loadNearstStores();
    }, []);

    async function loadNearstStores() {
        const response = await ListEstablishmentsService.index(props.latitude, props.longitude);
        setStores(response.data);
    }

    return(
        <ScrollView style={styles.container}>
            {
                stores.map(store => {
                    return (
                        <View style={{flex: 1}} key={store.name} className="list_establishment">
                            <Text style={styles.store_name}>{store.name}</Text>

                            <Text style={styles.store_address}>
                                {store.address}
                            </Text>

                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        [...Array(store.ratings_count)].map((key, index) => {
                                            return (
                                                <Image source={StarYellow} style={styles.image} key={index} alt="star yellow" />
                                            )
                                        })
                                    }

                                    {
                                        [...Array(5 - store.ratings_count)].map((key, index) => {
                                            return (
                                                <Image source={StarGray} style={styles.image} key={index} alt="star gray" />
                                            )
                                        })
                                    }
                                </View>

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
    image: {
        height: 10,
        width: 10,
    },
});

export default ListCoffees;