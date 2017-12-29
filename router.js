import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Carga from './src/componentes/Carga';
import Login from './src/componentes/Login';
import Olvido1 from './src/componentes/Olvido1';
import Olvido2 from './src/componentes/Olvido2';

class Router extends Component {
    render() {
      return <NavegadorLogin />;
    }
}

const NavegadorLogin = StackNavigator({
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
  }
});

export default Router;
