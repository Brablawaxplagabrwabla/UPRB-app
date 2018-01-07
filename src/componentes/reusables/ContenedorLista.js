import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const ContenedorLista = ({ children, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={estilos.contenedorPrincipal}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	);
};

const estilos = {
	contenedorPrincipal: {
		height: 60,
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		marginBottom: 2
	}
};

export { ContenedorLista };
