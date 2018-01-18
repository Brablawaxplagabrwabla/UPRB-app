import React from 'react';
import { Image, Text, View } from 'react-native';
import { ContenedorLista } from './reusables';
import flecha from '../assets/flecha.png';

const Estudiante = ({ onPress, nombre }) => {
	return (
		<ContenedorLista onPress={onPress}>
			<View style={estilos.contenedorTexto}>
				<Text style={estilos.texto}>{nombre}</Text>
			</View>
			<View style={estilos.contenedorIcono}>
				<View style={estilos.contenedorIcono}>
					<Image
						style={estilos.icono}
						source={flecha}
						resizeMode={'contain'}
					/>
				</View>
			</View>
		</ContenedorLista>
	);
};

const estilos = {
	contenedorTexto: {
		flex: 4,
		justifyContent: 'center'
	},
	texto: {
		paddingLeft: '7%',
		fontFamily: 'Roboto',
		fontSize: 17,
		color: '#rgb(154, 157, 159)'
	},
	contenedorIcono: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icono: {
		height: 14,
		width: 18,
		alignSelf: 'center'
	},
};

export default Estudiante;
