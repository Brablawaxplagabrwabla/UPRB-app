import React from 'react';
import { View, Text } from 'react-native';

const DetallesAusencia = ({ fecha, hora }) => {
	return (
		<View style={estilos.contenedorPrincipal}>
			<View style={estilos.contenedorSec}>
				<Text style={estilos.texto}>Fecha:</Text>
				<Text style={estilos.texto}>Hora:</Text>
			</View>
			<View style={estilos.contenedorSec2}>
				<Text style={estilos.texto}>{fecha}</Text>
				<Text style={estilos.texto}>{hora}</Text>
			</View>
		</View>
	);
};

const estilos = {
	contenedorPrincipal: {
		width: '100%',
		backgroundColor: '#fff',
		height: 85,
		flexDirection: 'row',
		marginBottom: 4
	},
	contenedorSec: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: '8%'
	},
	contenedorSec2: {
		flex: 4,
		justifyContent: 'center'
	},
	texto: {
		fontSize: 18,
		fontFamily: 'Roboto',
		color: '#rgb(156, 159, 161)',
		paddingBottom: 5
	}
};

export default DetallesAusencia;
