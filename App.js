import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/commonColor';
import { Login } from '.src/Components/Login.js'

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Login />
      </StyleProvider>
    );
  }
}