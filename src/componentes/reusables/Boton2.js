import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';

const Boton2 = ({ children, onPress, tamano }) => {
	let font;
	if (!tamano) {
		font = 12;
	} else {
		font = tamano;
	}
	return (
		<TouchableOpacity onPress={onPress} style={estilos.boton}>
			<Text style={estilos.textoBoton(font)}>{children}</Text>
		</TouchableOpacity>
	);
};

const estilos = {
	boton: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 5,
		borderColor: '#rgb(186, 188, 189)'
	},
	textoBoton: (tamano) => ({
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(186, 188, 189)',
		fontSize: tamano,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 8,
		paddingRight: 8
	}),
};

export { Boton2 };
