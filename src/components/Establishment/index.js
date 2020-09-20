import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button } from 'react-native';

import ListRatings from './ListRatings';
import EstablishmentPhotoService from '../../services/Google/establishment.js';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';


const Separator = () => (
    <View style={styles.separator} />
);

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState(null);

    useEffect(() => {
        getEstablishmentInformations();
    }, [props]);

    async function getEstablishmentInformations() {
        const response = await EstablishmentPhotoService.index(props.establishment.place_id);
        setEstablishment(response.data.result);
    }

    return (
        <ScrollView style={styles.container}>
            {
                establishment != null &&
                <View style={styles.background}>
                    <View style={{alignItems: 'center'}}>

                        <View style={{alignSelf: 'flex-end'}}>
                            <Button title="X" color="black" onPress={() => setEstablishment(null)} />
                        </View>

                        {
                            (establishment.photos) ? 
                                <Image style={styles.photo} source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`}} alt="Store perfil"/> 
                            :  
                                <Image style={styles.photo} source={ProfilePhoto} alt="No perfil" />
                        }

                        <Text style={styles.title}>{props.establishment.name}</Text>
                    </View>


                    {
                        (establishment.opening_hours) ? 
                            <View>
                                { 
                                    (establishment.opening_hours.open_now === true) ? 
                                        <Text style={{color: 'white', fontWeight: 'bold', marginTop: 10}}>Aberto</Text> : 
                                        <Text style={{color: 'white', fontWeight: 'bold', marginTop: 10}}>Fechado</Text> 
                                } 

                                <Separator />

                                {
                                    establishment.opening_hours.weekday_text.map(schedule => {
                                        return (
                                            <Text key={schedule} style={{color: 'white'}}>{schedule}</Text>
                                        )
                                    })
                                }   
                            </View>
                        : 
                            <View>
                                <Separator />
                                
                                <Text style={{color: 'white'}}>Não há cadastros de horário de funcionamento.</Text>
                            </View>
                    }

                    <Separator />

                    <Text style={{color: 'white'}}>{establishment.formatted_address}</Text>

                    <Separator />

                    <ListRatings establishment={props.establishment} />
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        zIndex: 10,
        flex: 1,
        height: 500,
    },
    background: {
        backgroundColor: 'black',
        paddingTop: 20,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginHorizontal: 30,
    },
    photo: {
        height: 200,
        width: 200,
    },
    title: {
        color: '#F56D50',
        fontSize: 15,
        marginTop: 10,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});  

export default Establishment;