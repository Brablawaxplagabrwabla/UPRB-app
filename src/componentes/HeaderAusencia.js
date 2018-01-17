import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class HeaderAusencia extends Component {
	texto() {
		if (this.props.datos !== undefined) {
			if (this.props.datos.data.profesor) {
				return <Text style={estilos.texto}>Marcar Ausencia</Text>;
			}
			return <Text style={estilos.texto}>Ausencias</Text>;
		}
	}

	render() {
		return (
			<View style={{ alignSelf: 'center' }}>
				{this.texto()}
			</View>
		);
	}
}

const estilos = {
	texto: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)',
		alignSelf: 'center'
	}
};

const mapStateToProps = state => {
	return { datos: state };
};

export default connect(mapStateToProps)(HeaderAusencia);
