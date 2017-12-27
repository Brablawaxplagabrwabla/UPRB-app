import React, { Component } from 'react';
import { Image } from 'react-native';

class Login extends Component {
	render() {
		return <Image style={{ width: 200, height: 200 }} source={{ uri: this.props.navigation.state.params.ico_suscrito }} />;
	}
}

export default Login;
