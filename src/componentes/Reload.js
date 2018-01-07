import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { recargarClases } from '../acciones';
import Reload from '../assets/loading.png';

class Recarga extends Component {
	click() {
		this.props.recargarClases();
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={this.click.bind(this)}>
				<View style={estilos.contenedorReload}>
					<Image source={Reload} style={estilos.reload} />
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const estilos = {
	contenedorReload: {
		height: '100%',
		width: 45,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 15
	},
	reload: {
		height: 20,
		width: 20
	}
};

export default connect(null, { recargarClases })(Recarga);
