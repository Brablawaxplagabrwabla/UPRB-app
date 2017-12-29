import React from 'react';
import { View, Platform, StatusBar } from 'react-native';

const Contenedor = (props) => {
	return (
		<View style={estilos.contenedor}>
			{props.children}
		</View>
	);
};

const estilos = {
	contenedor: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20
	}
};

export { Contenedor };
