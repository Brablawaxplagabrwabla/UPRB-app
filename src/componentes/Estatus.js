import React from 'react';
import {
	Text,
	View,
	Image,
	Platform
} from 'react-native';
import { ContenedorLista } from './reusables/';

const Estatus = ({
	docente, // boolean
	hora,
	dias,
	seccion,
	profesor,
	imagen,
	iconoTexto,
	onPress
}) => {
	function renderIcono() {
		if (!docente) {
			return (
				<View style={estilos.contenedorDer}>
					<View>
						<Image
							source={{ uri: imagen }}
							style={estilos.icono}
							resizeMode={'contain'}
						/>
					</View>
					<View style={estilos.contenedorTextoIcono}>
						<Text style={estilos.textoIcono}>
							{iconoTexto}
						</Text>
					</View>
				</View>
			);
		}
		return <View style={estilos.contenedorDer} />;
	}

	return (
		<ContenedorLista onPress={onPress}>
			<View style={estilos.contenedorIzq}>
				<View style={estilos.contenedorTextoSeccion}>
					<Text style={estilos.textoSeccion}>
						{seccion}
					</Text>
				</View>
				<View style={estilos.contenedorTextoProfesor}>
					<Text style={estilos.textoProfesor}>
						{`Profesor: ${profesor}`}
					</Text>
				</View>
			</View>
			<View style={estilos.contenedorCent}>
				<View style={estilos.contenedorHyD}>
					<View style={estilos.contenedorTextoHora}>
						<Text style={estilos.textoHora}>
							{hora}
						</Text>
					</View>
					<View style={estilos.contenedorTextoDias}>
						<Text style={estilos.textoDias}>
							{dias}
						</Text>
					</View>
				</View>
			</View>
			{renderIcono()}
		</ContenedorLista>
	);
};
// El contenedor derecho es renderizado por una función

const estilos = {
	contenedorIzq: {
		flex: 50,
		justifyContent: 'center'
	},
	contenedorCent: {
		flex: 25,
		justifyContent: 'center'
	},
	contenedorDer: {
		flex: 25,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	contenedorTextoSeccion: {
		paddingLeft: '5%'
	},
	contenedorTextoProfesor: {
		paddingLeft: '5%'
	},
	contenedorTextoDias: {
		paddingLeft: '3%',
		alignSelf: 'stretch',
		alignItems: 'center'
	},
	contenedorTextoHora: {
		paddingLeft: '3%',
		alignSelf: 'stretch',
		alignItems: 'center'
	},
	contenedorHyD: {
		width: '70%'
	},
	contenedorTextoIcono: {
		paddingBottom: 10
	},
	textoSeccion: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(165, 168, 169)',
		fontSize: 18
	},
	textoProfesor: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(165, 168, 169)',
		fontSize: 12,
		fontWeight: '400'
	},
	textoDias: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(165, 168, 169)',
		fontSize: 11,
		fontWeight: '200',
		alignSelf: 'center'
	},
	textoHora: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(165, 168, 169)',
		fontSize: 20,
		alignSelf: 'center'
	},
	textoIcono: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(165, 168, 169)',
		fontSize: 8,
		alignSelf: 'center',
		fontWeight: '300'
	},
	icono: {
		height: 24,
		width: 24
	}
};

export default Estatus;
