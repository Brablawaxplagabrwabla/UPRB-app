import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { recargarClases, recargarAusencias } from '../acciones';
import Reload from '../assets/loading.png';

class Recarga extends Component {
	click() {
		if (this.props.boolean) {
			this.props.recargarClases();
		} else {
			this.props.recargarAusencias();
		}
	}

	render() {
		if (this.props.datos.data.profesor) {
			return <View />;
		}
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

const mapStateToProps = state => {
	return { datos: state };
};

export default connect(mapStateToProps, { recargarClases, recargarAusencias })(Recarga);
