import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ tamano }) => {
	return (
		<View style={estilos.estiloSpinner}>
			<ActivityIndicator size={tamano || 'large'} />
		</View>
	);
};

const estilos = {
	estiloSpinner: {
		flex: 1,
		marginTop: 27,
		alignItems: 'center'
	}
};

export { Spinner };
