
![Logo of the project](https://github.com/OneBitCodeBlog/find-my-coffee-client/blob/master/src/assets/readme/logo-fmc-01.png)


## Find My Coffee Mobile
Find My Coffee Mobile é o mobile de um aplicativo FullStack. Ele te possibilita achar as cafeterias favoritas e as mais próximas de você para apreciar aquela bebida que nós tanto amamos <3


## Tecnologias 

* React Native
* Axios
* React Native Maps
* Font Awesome Icon

## Serviços Utilizados

* Github


## Iniciando

* Dependências
  - API (https://github.com/OneBitCodeBlog/find-my-coffee)
  - Git
  - Yarn
  - Ngrok

* Inicie a API na porta 3001.
  - rails s -p 3001
  
* Inicie o ngrok para ouvir a porta 3001.
  - ngrok http 3001
  
* Agora substitua o baseURL da api local (/src/services/Local/api.js) para o endereço HTTPS do ngrok (Isso é necessário pois o IOS do React Native não consegue responder a APIs sem prefixo HTTPS).
  - ngrok http 3001
  
* Inicie a aplicação mobile. 
  - yarn web

## Telas

### Página Inicial
<img src="https://github.com/OneBitCodeBlog/find-my-coffee-mobile-development/blob/master/src/assets/readme/home_page.jpeg" width="200">


<img src="https://github.com/OneBitCodeBlog/find-my-coffee-mobile-development/blob/master/src/assets/readme/establishment_1.jpeg" width="200">
<img src="https://github.com/OneBitCodeBlog/find-my-coffee-mobile-development/blob/master/src/assets/readme/establishment_2.jpeg" width="200">


<img src="https://github.com/OneBitCodeBlog/find-my-coffee-mobile-development/blob/master/src/assets/readme/nearst_coffees.jpeg" width="200">


## Features

As principais funções do app são:
 - Encontrar as cafeterias mais próximas de você.
 - Encontrar as cafeterias mais avaliadas, próximas a você.
 - Visualizar informações das cafeterias.


## Links
  - Repositório: https://github.com/OneBitCodeBlog/find-my-coffee-mobile-development
    - Em casos de vulnerabilidades de segurança, bugs ou qualquer tipo de alerta,
      entre em contato com a nossa equipe. Nós valorizamos qualquer atitude para melhora
      de segurança e qualidade de nosso repositório <3

  ## Versioning

  1.0.0.0


  Siga nosso Guithub e obrigado por estar com a gente!
  Bons códigos!
