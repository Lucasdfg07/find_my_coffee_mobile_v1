## Construção do projeto

### Criando o projeto

1 - Entre na pasta find-my-coffee, e digite o comando abaixo:

```
npx create-react-native-app mobile 
```

2 - Gere o "Default new app".

### Setando o google maps

1 - Instale o google maps com o seguinte comando:

```
npm install --save react-native-maps
```

2 - Agora vamos criar as pastas /src/components/GoogleMaps.

3 - Dentro do componente GoogleMaps, crie o arquivo 'index.js' e cole o seguinte código:

```
import React from 'react';
import { View, StyleSheet } from 'react-native';

const GoogleMaps = () => {

  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 5,
  },
});

export default GoogleMaps;
```

4 - Criado o nosso componente, crie a pasta /src/pages/Home.

5 - Dentro da page Home, crie o arquivo 'index.js' com o seguinte código:

```
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
```

6 - Agora vá ao arquivo /App.js e substitua pelo seguinte código:

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomePage from './src/pages/Home';

export default function App() {
  return (
    <View style={{flex:1}}>
      <HomePage />
    </View>
  );
}
```

7 - Agora vá ao componente /src/components/GoogleMaps e coloque o seguinte código:

```
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMaps = () => {

  return (
    <View style={styles.container}>
        <MapView style={styles.map}>
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
```

8 - Repare que nosso mapa foi carregado \o/

### Setando nossa localização atual

1 - No componente /src/components/GoogleMaps, substitua pelo seguinte código:

```
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        setCurrentLocation();
    }, []);

    async function setCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

  return (
    <View style={styles.container}>
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
```

2 - Perceba que adicionamos a função setCurrentLocation() e setamos as variáveis 'latitude' e 'longitude',
usando essa função no useEffect e adicionando o atributo "region" ao nosso MapView. Agora seu mapa será carregado na sua localização atual. \o/


### Adicionando Marcadores de cafeterias mais próximas

1 - Realize a instalação do axios com o comando abaixo:
```
npm install axios
```

2 - Crie a pasta /src/services/Google.

3 - Dentro desse service 'Google', crie os arquivos 'establishments.js' e 'google.js'.

4 - Cole o seguinte código no arquivo 'google.js':

```
import axios from 'axios';

const GoogleService = axios.create({baseURL: ""});

export default GoogleService;
```

5 - Agora cole o seguinte código no arquivo 'establishments.js'.

```
import GoogleService from './google';

const EstablishmentsService = {
  index: (latitude, longitude) => GoogleService.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=-${latitude},${longitude}&radius=5000&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`),
}

export default EstablishmentsService;
```

6 - Setados os nossos services, buscando da api do google, volte ao componente /src/components/GoogleMaps.

7 - Substitua o código do 'index.js' pelo seguinte código:

```
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import EstablishmentsService from '../../services/Google/establishments.js';

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [locations, setLocations] = useState([]);

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
```

8 - Visualize os marcadores nas cafeterias mais próximas \o/

### Criando a página do estabelecimento clicado

1 - Crie o arquivo /src/services/Google/establishment.js e cole o seguinte código nele:

```
import GoogleService from './google';

const EstablishmentService = {
  index: (place_id) => GoogleService.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyAriO9z5tX1tht7YomsgWyC9BNpWMT599w`),
}

export default EstablishmentService;
```

2 - Agora crie a pasta /src/components/Establishment.

3 - Dentro desse componente Establishment, crie o arquivo 'index.js' e cole o seguinte código nele:

```
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

const Establishment = (props) => {
    return (
        <ScrollView style={styles.container}>
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        zIndex: 10,
        flex: 1,
        height: height - 40,
    },
});  

export default Establishment;
```

4 - Essa é a estrutura básica do nosso componente. Vamos conectar ele com o nosso service substituindo o código atual pelo código abaixo:

```
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Dimensions } from 'react-native';

import EstablishmentPhotoService from '../../services/Google/establishment.js';

var height = Dimensions.get('window').height; //full height

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState(null);

    useEffect(() => {
        getEstablishmentInformations();
    }, [props]);

    async function getEstablishmentInformations() {
        try {
            const response = await EstablishmentPhotoService.index(props.establishment.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            {
                establishment != null &&
                <View style={styles.background}>
                
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
        height: height - 40,
    },
    background: {
        backgroundColor: 'black',
        paddingTop: 20,
        borderRadius: 20,
    },
    photo: {
        height: 200,
        width: 200,
    },
    title: {
        color: '#F56D50',
        fontSize: 17,
        marginTop: 10,
    },
});  

export default Establishment;
```

5 - Agora vamos ao componente /src/components/GoogleMaps e vamos importar o component Establishment. Substitua o código do componente GoogleMaps pelo seguinte código:

```
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';

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
```

6 - Nossa API está conseguindo puxar as informações da cafeteria, mas ainda falta um pouco de estilo. Vamos adicionar um pouco mais de estilo. Substitua o código atual pelo código abaixo:

```
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Dimensions } from 'react-native';

import EstablishmentPhotoService from '../../services/Google/establishment.js';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';

var height = Dimensions.get('window').height; //full height
var width = Dimensions.get('window').width; //full width

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState(null);

    useEffect(() => {
        getEstablishmentInformations();
    }, [props]);

    async function getEstablishmentInformations() {
        try {
            const response = await EstablishmentPhotoService.index(props.establishment.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
                    {
                        establishment != null &&
                        <View style={styles.background}>
                            <View style={{paddingHorizontal: 30}}>
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
                            </View>
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
        height: height - 40,
    },
    background: {
        backgroundColor: 'black',
        paddingTop: 20,
        borderRadius: 20,
        width: width,
    },
    photo: {
        height: 200,
        width: 200,
    },
    title: {
        color: '#F56D50',
        fontSize: 17,
        marginTop: 10,
    },
});  

export default Establishment;
```

7 - Agora vamos setar o horário de funcionamento e endereço do nosso estabelecimento. Seu código ficará do seguinte jeito:

```
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Dimensions } from 'react-native';

import EstablishmentPhotoService from '../../services/Google/establishment.js';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';

var height = Dimensions.get('window').height; //full height
var width = Dimensions.get('window').width; //full width

const Separator = () => (
    <View style={styles.separator} />
);

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState(null);

    useEffect(() => {
        getEstablishmentInformations();
    }, [props]);

    async function getEstablishmentInformations() {
        try {
            const response = await EstablishmentPhotoService.index(props.establishment.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
                    {
                        establishment != null &&
                        <View style={styles.background}>
                            <View style={{paddingHorizontal: 30}}>
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
                            </View>
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
        height: height - 40,
    },
    background: {
        backgroundColor: 'black',
        paddingTop: 20,
        borderRadius: 20,
        width: width,
    },
    photo: {
        height: 200,
        width: 200,
    },
    title: {
        color: '#F56D50',
        fontSize: 17,
        marginTop: 10,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});  

export default Establishment;
```

8 - Repare que no React Native não há <hr />. Para isso, foi necessário adicionar a classe <Separator />, que possui o mesmo comportamento.

9 - Agora vamos ao rodapé da página. Para isso, instale o Font Awesome Icons, com os comandos abaixo:

```
$ npm i --save react-native-svg # **
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/react-native-fontawesome
```

9 - Depois de instalado, vamos adicionar nosso rodapé com ícones do Font Awesome. Adicione o seguinte no seu código:

```
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

...

    <Separator />

    <Text style={{color: 'white'}}>{establishment.formatted_address}</Text>

    <Separator />

    ...

        <Separator />

        <Text style={{color: 'white'}}>{establishment.formatted_address}</Text>

        <Separator />
    </View>
    
    <View style={styles.rodape}>
        <FontAwesomeIcon icon={faMapMarker} color='white' />
        <Text style={{color: 'white', marginLeft: 10, fontSize: 11}}>Café selecionado</Text>
    </View>
</View>
```

### Puxando as avaliações, da nossa API

1 - Para isso, será necessário conectar com a API local. Rode a api com 'rails s -p 3001'.

2 - A configuração IOS tem uma restrição em captar APIs em localhost, portanto será necessário usarmos o ngrok para captarmos o https da nossa aplicação.

Baixe o ngrok aqui:
https://ngrok.com/download

3 - Baixado o instalado o Ngrok, execute o seguinte comando em seu terminal:

```
ngrok http 3001
```

Ele retornará algo como:

```
ngrok by @inconshreveable                                                                                                        (Ctrl+C to quit)
                                                                                                                                                 
Session Status                online                                                                                                             
Session Expires               6 hours, 42 minutes                                                                                                
Version                       2.3.35                                                                                                             
Region                        United States (us)                                                                                                 
Web Interface                 http://127.0.0.1:4040                                                                                              
Forwarding                    http://66ecce188f1f.ngrok.io -> http://localhost:3001                                                              
Forwarding                    https://66ecce188f1f.ngrok.io -> http://localhost:3001                                                             
                                                                                                                                                 
Connections                   ttl     opn     rt1     rt5     p50     p90                                                                        
                              4       0       0.00    0.00    23.57   28.58 
```

Copie o endereço https, pois usaremos ele em nosso service.


4 - Crie a pasta /src/services/Local.

5 - Dentro do service 'Local', crie os arquivos 'api.js' e o 'rating.js'.

6 - Dentro do arquivo 'api.js', cole o seguinte código:

```
import axios from 'axios';

const Api = axios.create({baseURL: 'SEU_ENDEREÇO_HTTPS/api/v1'});

export default Api;
```

7 - Agora no arquivo 'rating.js' e cole o seguinte código:

```
import Api from './api';

const RatingService = {
  show: (google_place_id) => Api.get(`/ratings/${google_place_id}`),
}

export default RatingService;
```

8 - Services criados!! Agora vá no componente /src/components/Establishment e crie a pasta 'ListRatings'.

9 - Dentro da pasta 'ListRatings', crie o arquivo 'index.js' e cole o seguinte código nele:

```
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListRatings = (props) => {
    return(
        <View>
            
        </View>
    )
}

export default ListRatings;
```

10 - Essa é a estrutura básica dele. Esse componente listará nossas avaliações pela API.

11 - Agora vamos puxar as informações de nossa API. Substitua o atual código pelo código abaixo:

```
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListRatingsService from '../../../services/Local/rating';

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        getEstablishmentRatings();
    }, [props]);

    async function getEstablishmentRatings() {
        try {
            const response = await ListRatingsService.show(props.establishment.place_id);
            setRatings(response.data);
        } catch (error) {
            setRatings([]);
            console.log(error);
        }
    }

    return(
        <View>
            <View style={{flexDirection: 'row'}}>

                <Text style={styles.opinions}>
                    { (ratings.ratings_count > 0) ? ratings.ratings_count : '0' } Opiniões
                </Text>
            </View>
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
});  

export default ListRatings;
```

12 - Agora, no arquivo /src/components/Establishment/index.js, coloque a seguinte importação e componente:

```
import ListRatings from './ListRatings';

...

    <Separator />

    <Text style={{color: 'white'}}>{establishment.formatted_address}</Text>

    <Separator />

    <ListRatings establishment={props.establishment} />
</View>
```

13 - Agora, para continuar, precisaremos listar as estrelas das avaliações nos nossos componentes. Para isso, vamos instalar o componente Ratings do Materialize. Execute os seguintes comandos no seu terminal:

```
npm install react-native-star-rating --save
```

14 - Pronto! Agora, no componente ListRatings, substitua o código atual pelo código abaixo:

```
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListRatingsService from '../../../services/Local/rating';

import StarRating from 'react-native-star-rating';

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        getEstablishmentRatings();
    }, [props]);

    async function getEstablishmentRatings() {
        try {
            const response = await ListRatingsService.show(props.establishment.place_id);
            setRatings(response.data);
        } catch (error) {
            setRatings([]);
            console.log(error);
        }
    }

    return(
        <View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.opinions}>
                    { (ratings.ratings_count > 0) ? ratings.ratings_count : '0' } Opiniões
                </Text>

                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={ratings.ratings_average}
                    fullStarColor="yellow"
                    starSize={15} 
                />
            </View>
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
});  

export default ListRatings;
```

15 - Agora vamos listar nossas avaliações. Substitua o código do componente ListRatings pelo código abaixo:

```
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListRatingsService from '../../../services/Local/rating';

import StarRating from 'react-native-star-rating';

const Separator = () => (
    <View style={styles.separator} />
);

const ListRatings = (props) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        getEstablishmentRatings();
    }, [props]);

    async function getEstablishmentRatings() {
        try {
            const response = await ListRatingsService.show(props.establishment.place_id);
            setRatings(response.data);
        } catch (error) {
            setRatings([]);
            console.log(error);
        }
    }

    return(
        <View>
            <View style={{flexDirection: 'row'}}>

                <Text style={styles.opinions}>
                    { (ratings.ratings_count > 0) ? ratings.ratings_count : '0' } Opiniões
                </Text>

                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={ratings.ratings_average}
                    fullStarColor="yellow"
                    starSize={15} 
                />
            </View>

            {
                ratings.ratings_count > 0 &&
                ratings.ratings.map((rating, index) => {
                    return (
                        <View key={index}>
                            <Separator />
                            
                            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                                <Text style={styles.user_name}>{ rating.user_name }</Text>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={rating.value}
                                    fullStarColor="yellow"
                                    starSize={15} 
                                />
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
```

### Criando a aba de cafés mais próximos

1 - Primeiro, vamos criar nosso service. Acesse a pasta /src/services/Local e crie o arquivo 'store.js'.

2 - Nesse arquivo 'store.js', cole o código abaixo:

```
import Api from './api';

const StoreService = {
  index: (latitude, longitude) => Api.get('/stores', {params: {latitude: latitude, longitude: longitude}}),
}

export default StoreService;
```

3 - Agora crie o componente /src/components/NearstCoffees.

4 - Dentro do componente NearstCoffees, crie o arquivo 'index.js' e cole o código abaixo:

```
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import ListCoffees from './ListCoffees';

const Separator = () => (
    <View style={styles.separator} />
);


const NearstCoffees = (props) => {
    const [showDropdownButton, setShowDropdownButton] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} 
                              onPress={() => (showDropdownButton == false) ? 
                                              setShowDropdownButton(true) : 
                                              setShowDropdownButton(false)}>
                                                  
                    <Text style={styles.text}>Find my Coffee</Text>
                    <FontAwesomeIcon icon={faHeart} color='white' style={{marginRight: 5}} />
                    <FontAwesomeIcon icon={faAngleDown} color='white' /> 
            </TouchableOpacity>

            {
                showDropdownButton == true &&
                <View style={styles.nearstCoffees}>
                    <Text style={styles.title}>Cafés mais amados próximos a você</Text>

                    <Separator />

                    <ListCoffees latitude={props.latitude} longitude={props.longitude} />
                </View>
            }
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
    },
    nearstCoffees: {
        backgroundColor: 'black',
        width: 190,
        marginTop: 5,
        borderRadius: 5,
        padding: 10,
    },
    title: {
        color: '#F56D50',
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default NearstCoffees;
```

5 - Crie o componente /src/components/NearstCoffees/ListCoffees.

6 - Dentro do componente ListCoffees, crie o arquivo 'index.js' e cole o seguinte código abaixo:

```
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import ListEstablishmentsService from '../../../services/Local/store.js';

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
                stores.map(store => {
                    return (
                        <View style={{flex: 1}} key={store.name}>
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
```

7 - Agora vamos ao componente /src/components/GoogleMaps, no arquivo 'index.js' e adicione o seguinte código:

```
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
...

import NearstCoffees from '../NearstCoffees';

...

return (
    <View style={styles.container}>
      ...

      <NearstCoffees latitude={latitude} longitude={longitude} />

      ...
      
      <Establishment establishment={selected} />
```

8 - O código do arquivo /src/components/GoogleMaps ficará com o visual semelhante a esse:

```
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
```


E é isso!! Bons códigos \o/