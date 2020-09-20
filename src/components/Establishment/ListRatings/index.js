import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListStars from '../../ListStars';
import ListRatingsService from '../../../services/Local/rating';


const Separator = () => (
    <View style={styles.separator} />
);

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        getEstablishmentRatings();
    }, [props]);

    async function getEstablishmentRatings() {
        const response = await ListRatingsService.show(props.establishment.place_id);
        setRatings(response.data);
    }

    return(
        <View>
            <View style={{flexDirection: 'row'}}>

                <Text style={styles.opinions}>
                    { (ratings.ratings_count > 0) ? ratings.ratings_count : '0' } Opiniões
                </Text>
                
                <ListStars count={ratings.ratings_count} average={ratings.ratings_average} />
            </View>

            {
                ratings.ratings_count > 0 &&
                ratings.ratings.map(rating => {
                    return (
                        <View>
                            <Separator />
                            
                            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                                <Text style={styles.user_name}>{ rating.user_name }</Text>
                                <ListStars count={rating.value} average={rating.value} />
                            </View>

                            <Text style={styles.text}>{ rating.opinion }</Text>

                            <Text style={styles.text}>{ rating.date }</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 30,
    },
    opinions: {
        color: 'white', 
        marginLeft: 10, 
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 20,
    },
    user_name: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 30,
    },
    text: {
        color: 'white',
        marginHorizontal: 20,
        fontSize: 10,
    },  
});  

export default ListRatings;