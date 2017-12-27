import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Carga from './src/componentes/Carga';
import Login from './src/componentes/Login';

class router extends Component {
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
  }
});

export default router;
