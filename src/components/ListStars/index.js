import React from 'react';
import { View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ListStars = (props) => {
    return(
        <View>
            {
                props.count > 0 &&
                <View style={{flexDirection: 'row'}}>
                    {
                        [...Array(props.average)].map((key, index) => {
                            return (
                                <FontAwesomeIcon icon={faStar} color="yellow" key={index} />
                            )
                        })
                    }

                    {
                        [...Array(5 - props.average)].map((key, index) => {
                            return (
                                <FontAwesomeIcon icon={faStar} color="gray" key={ 5 - index} />
                            )
                        })
                    }
                </View>
            }
        </View>
    )
}

export default ListStars;