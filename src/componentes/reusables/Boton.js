import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';

const Boton = ({ children, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={estilos.boton}>
			<Text style={estilos.texto}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

const estilos = {
	boton: {
		backgroundColor: '#rgb(165, 226, 121)',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#rgb(182, 231, 145)',
		marginLeft: 5,
		marginRight: 5,
		marginTop: 15,
		marginBottom: 5
	},
	texto: {
		color: '#fff',
		fontSize: 16,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		fontWeight: '400',
		alignSelf: 'center',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 25,
		paddingRight: 25
	}
};

export { Boton };
