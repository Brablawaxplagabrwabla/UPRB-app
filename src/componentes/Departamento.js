import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';

const Departamento = ({ icono, titulo, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={estilos.contenedorExterno}>
				<View style={estilos.contenedorInterno}>
					<View style={estilos.contenedorImagen}>
						<Image
							style={estilos.imagen}
							source={{ uri: icono }}
							resizeMode={'contain'}
						/>
					</View>
					<View style={estilos.contenedorTexto}>
						<Text style={estilos.texto}>{titulo}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const estilos = {
	contenedorExterno: {
		width: '50%',
		height: 150,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contenedorInterno: {
		height: '85%',
		width: '85%',
		backgroundColor: '#fff'
	},
	contenedorImagen: {
		flex: 2,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	contenedorTexto: {
		flex: 1,
		justifyContent: 'center'
	},
	imagen: {
		width: 65,
		height: 65,
		marginBottom: 5
	},
	texto: {
		alignSelf: 'center',
		textAlign: 'center',
		color: '#rgb(181, 184, 185)',
		fontFamily: 'Roboto',
		fontSize: 12
	}
};

export default Departamento;
