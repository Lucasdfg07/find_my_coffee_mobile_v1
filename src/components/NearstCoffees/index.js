import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons';


const NearstCoffees = () => {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Simple Button pressed')}>
                    <Text style={styles.text}>Find my Coffee</Text>
                    <FontAwesomeIcon icon={faHeart} color='white' style={{marginRight: 5}} />
                    <FontAwesomeIcon icon={faAngleDown} color='white' /> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 10,
        flex: 1,
        width: 370,
    },
    button: {
        height: 30,
        backgroundColor: 'black',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 20,
    }
});

export default NearstCoffees;