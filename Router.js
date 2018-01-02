import React, { Component } from 'react';
import { Image, Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Carga from './src/componentes/Carga';
import Login from './src/componentes/Login';
import Olvido1 from './src/componentes/Olvido1';
import Olvido2 from './src/componentes/Olvido2';
import Departamentos from './src/componentes/Departamentos';
import ImagenHome from './src/assets/ico_home.png';
import ImagenClases from './src/assets/ico_clases.png';
import ImagenAusencias from './src/assets/ico_ausencias.png';

class Router extends Component {
    render() {
      return <Navegador />;
    }
}

/* Estructura de navegación:
  Stack:
    Carga
    Login
    Olvido1
    Olvido2
    Main:
      Tab:
        Home:
          Stack:
            Departamentos */

const Navegador = StackNavigator({
  Carga: {
    screen: Carga,
    navigationOptions: {
      header: null
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Olvido1: {
    screen: Olvido1,
    navigationOptions: {
      header: null
    }
  },
  Olvido2: {
    screen: Olvido2,
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen: TabNavigator({
      Clases: {
        screen: StackNavigator({
          Temporal1: {
            screen: Departamentos
          }
        }),
        navigationOptions: {
          tabBarLabel: 'Clases',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={ImagenClases}
              style={[estilos.iconoClases, { tintColor }]}
            />
          )
        }
      },
      Home: {
        screen: StackNavigator({
          Departamentos: {
            screen: Departamentos,
            navigationOptions: {
              headerTitle: 'Departamentos',
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: 'Roboto',
                fontWeight: '400',
                color: '#rgb(154, 157, 159)',
                alignSelf: 'center'
              },
              headerStyle: {
                marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
                backgroundColor: '#rgb(247, 247, 247)'
              }
            }
          }
        }),
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={ImagenHome}
              style={[estilos.iconoHome, { tintColor }]}
            />
          )
        }
      },
      Ausencias: {
        screen: StackNavigator({
          Temporal2: {
            screen: Departamentos
          }
        }),
        navigationOptions: {
          tabBarLabel: 'Ausencias',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={ImagenAusencias}
              style={[estilos.iconoAusencias, { tintColor }]}
              resizeMode={'contain'}
            />
          )
        }
      }
    }, {
      tabBarPosition: 'bottom',
      initialRouteName: 'Home', //Temporal
      tabBarOptions: {
        upperCaseLabel: false,
        activeTintColor: '#rgb(111, 209, 233)',
        inactiveTintColor: '#rgb(204, 204, 204)',
        showIcon: true,
        style: {
          backgroundColor: '#rgb(247, 247, 247)'
        },
        indicatorStyle: {
          borderBottomColor: '#rgb(111, 209, 233)',
          borderBottomWidth: 2
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto',
          fontWeight: '500'
        }
      }
    }),
    navigationOptions: {
      header: null // Este es el header del StackNavigator superior
    }
  }
});

const estilos = {
  iconoClases: {
    height: 20,
    width: 24
  },
  iconoHome: {
    height: 22,
    width: 22
  },
  iconoAusencias: {
    height: 22,
    width: 22
  }
};

export default Router;
